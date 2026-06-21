import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

// Increase request size limits for base64 image uploads
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// Server API Route for advanced geometry description and image analysis
app.post("/api/gemini/analyze", async (req, res) => {
  try {
    const { text, image, mimeType } = req.body;
    
    // Dynamically retrieve the latest API key to support runtime configuration updates
    const current_api_key = process.env.GEMINI_API_KEY;
    if (!current_api_key) {
      return res.status(200).json({
        success: false,
        error: "GEMINI_API_KEY_MISSING",
        message: "Chưa cấu hình GEMINI_API_KEY trên máy chủ. Thầy cô vui lòng cấu hình API Key trong mục Settings > Secrets.",
      });
    }

    // Lazy initialize Gemini client with the fresh API key
    const ai = new GoogleGenAI({
      apiKey: current_api_key,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });

    const contents: any[] = [];
    
    let prompt = "Hãy phân tích hình vẽ hình học hoặc mô tả bài toán hình học sau đây và trả về định dạng JSON phù hợp.";
    if (image) {
      prompt += "\nẢnh này mô tả một bài tập hình học hoặc sơ đồ hình họa. Cực kỳ quan trọng: Bạn hãy tự đọc (OCR) toàn văn đề bài, chữ viết và ký hiệu từ ảnh, hiểu quan hệ giữa các điểm, và tự động tính toán tọa độ phù hợp.";
    }
    if (text) {
      prompt += `\nMô tả hình học từ người dùng (chứa công thức toán):\n${text}`;
    }
    
    const systemInstruction = `Bạn là một giáo sư toán học cấp trung học cơ sở và trung học phổ thông, đồng thời là một chuyên viên đồ họa hình học hàng đầu Việt Nam.
Nhiệm vụ của bạn là phân tích văn bản mô tả hình học hoặc ảnh chụp đề bài hình học (được tải lên hoặc chụp từ camera/vở bài tập), tự động phát hiện tất cả công thức toán học và dựng nên cấu trúc hình học tương ứng.

Yêu cầu cụ thể:
1. "problemDescription": Hãy chuẩn hóa và viết lại đề bài hình học bằng tiếng Việt trôi chảy, rõ ràng, định dạng đẹp đẽ. KHUYẾN KHÍCH sử dụng ký hiệu toán học đẹp (Unicode hoặc ký hiệu quen thuộc như \xB0, \u2225 (song song), \u22A5 (vuông góc), \u0394 (tam giác), v.v.) để thầy cô học sinh dễ dàng đọc được các loại công thức.
2. "exercise": Đề toán hay chứa câu hỏi rèn luyện liên quan mật thiết đến cấu trúc hình vẽ (ví dụ: tính độ dài, góc, chứng minh).
3. "solution": Trình bày lời giải sư phạm từng bước minh bạch, có lý luận chặt chẽ và công thức toán học rõ chữ.
4. "geometryData": Xác định bộ dữ liệu ShapeData chứa các tọa độ điểm hợp lý, các cạnh nối, đường phụ trợ, ký hiệu góc vuông hay ký hiệu đoạn thẳng bằng nhau và đường tròn phát hiện được để chúng tôi dựng hình SVG trực tiếp.

Hướng dẫn thiết kế tọa độ đỉnh hình học (ShapeData.points):
A. Cho hình phẳng (2D):
  - Thiết kế tọa độ (x, y) đại số chính xác, giá trị nằm cân xứng trong khoảng [0.0, 8.0] để hình vẽ hiển thị tuyệt đẹp.
  - Ví dụ tam giác vuông ABC tại A có AB=3, AC=4: Ta thiết kế đỉnh A(1, 1), C(5, 1), B(1, 4).
  - Ví dụ hình chữ nhật ABCD: A(1, 4), B(5, 4), C(5, 1), D(1, 1).
  - Tự động giải phương trình hình học cơ bản để tính tọa độ chính xác của trung điểm, chân đường cao, giao điểm hai đường thẳng, tiếp điểm, v.v.
B. Cho hình không gian (3D):
  - Thiết kế tọa độ (x, y, z) 3 chiều. Trục z hướng lên trên.
  - Ví dụ hình lập phương cạnh 3: A(1,1,0), B(4,1,0), C(4,4,0), D(1,4,0), A'(1,1,3), B'(4,1,3), C'(4,4,3), D'(1,4,3).
  - Ví dụ hình chóp S.ABCD đáy hình vuông: Đáy nằm trên z=0: A(1,4,0), B(4,4,0), C(4,1,0), D(1,1,0). Đỉnh S vươn lên S(1,4,4) hoặc chân đường cao nằm ở tâm đáy O(2.5, 2.5, 4).
  - Định nghĩa "edges3d" là danh mục nối các cạnh 3D { from: "S", to: "A", dashed: false }. BẮT BUỘC đặt dashed: true cho các cạnh khuất (ví dụ AD, AB, SD nếu bị che khuất) để hiển thị nét đứt mảnh chuẩn toán học.

C. Đối với Đường tròn (circles):
  - Khi đề bài yêu cầu vẽ đường tròn tâm O bán kính R, đường tròn đường kính AB, hoặc đường tròn ngoại tiếp, nội tiếp:
    + Bạn BẮT BUỘC phải định nghĩa cả tâm (ví dụ "O") và các điểm mốc (ví dụ "A", "B") vào trong cấu trúc "points".
    + Ví dụ: "đường tròn (O) đường kính AB": Bạn chọn tâm O là trung điểm của AB. Bạn hãy thiết lập tọa độ các điểm cân xứng ở khoảng [0, 8]. Ví dụ: Đặt O(4.0, 4.0), A(2.0, 4.0), B(6.0, 4.0).
    + Bạn phải thêm phần tử vào mảng "circles" với dạng { "center": "tên_điểm_tâm", "point": "tên_điểm_trên_đường_tròn", "r": 0 }. Ví dụ: "circles": [{ "center": "O", "point": "A", "r": 0 }]. Điều này sẽ vẽ một đường tròn tâm O đi qua A. Do O là trung điểm AB nên đường tròn này cũng tự động đi qua B, tạo nên một đường tròn đường kính AB cực kỳ hoàn hảo.
    + Thêm đoạn thẳng đường kính vào mảng "segments": [["A", "B"]] để làm nổi bật đường kính.

Bạn BẮT BUỘC phải trả về kết quả là một đối tượng JSON thô đơn thuần, không chèn ký tự hay lời giải thích nào khác ngoài JSON sau đây:
{
  "name": "Tên hình chi tiết (ví dụ: Hình lăng trụ đứng tam giác ABC.A'B'C')",
  "problemDescription": "Mô tả đề bài có các công thức toán toán học rõ ràng phong cách giáo sư",
  "exercise": "Yêu cầu rèn luyện trắc nghiệm hoặc bài tập toán học tiêu chuẩn",
  "solution": "Lời giải sư phạm từng bước chi tiết, sắc sảo, công thức hiển thị rất chuyên nghiệp",
  "geometryData": {
    "shapeType": "custom",
    "points": {
      "A": { "x": 1.0, "y": 1.0 },
      "B": { "x": 1.0, "y": 4.0 },
      "C": { "x": 5.0, "y": 1.0 }
    },
    "segments": [["A", "B"], ["B", "C"], ["C", "A"]],
    "auxSegments": [],
    "rightAngles": [["B", "A", "C"]],
    "equalSegments": [],
    "circles": [],
    "edges3d": [],
    "labels": {
      "A": "bottom-left",
      "B": "top",
      "C": "bottom-right"
    }
  }
}`;

    if (image) {
      contents.push({
        inlineData: {
          mimeType: mimeType || "image/jpeg",
          data: image,
        },
      });
      contents.push({ text: prompt });
    } else {
      contents.push({ text: prompt });
    }

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: contents,
      config: {
        systemInstruction: systemInstruction,
        responseMimeType: "application/json",
        temperature: 0.15,
      },
    });

    const reply = response.text;
    if (!reply) {
      throw new Error("Không thể trích xuất dữ liệu hình học tự động từ mô hình AI.");
    }

    let cleanReply = reply.trim();
    // Strip markdown code blocks if the response is wrapped
    if (cleanReply.includes("```")) {
      const matches = cleanReply.match(/```(?:json)?\n?([\s\S]*?)\n?```/);
      if (matches && matches[1]) {
        cleanReply = matches[1].trim();
      }
    }

    // Capture everything between the first '{' and the last '}' to prune extra chatty prefixes/suffixes
    const firstBrace = cleanReply.indexOf("{");
    const lastBrace = cleanReply.lastIndexOf("}");
    if (firstBrace !== -1 && lastBrace !== -1) {
      cleanReply = cleanReply.substring(firstBrace, lastBrace + 1);
    }

    let parsedJson: any;
    try {
      parsedJson = JSON.parse(cleanReply);
    } catch (parseErr: any) {
      console.error("Lỗi parse JSON gốc phản hồi từ Gemini:", reply);
      throw new Error(`Độ dài hoặc định dạng chuỗi JSON phản hồi không hợp lệ: ${parseErr.message}`);
    }

    res.json({
      success: true,
      data: parsedJson,
    });
  } catch (error: any) {
    console.error("Lỗi phân tích hình học bằng Gemini:", error);
    res.status(500).json({
      success: false,
      error: "AI_PROCESSING_ERROR",
      message: error.message || "Đã xảy ra lỗi khi trao đổi thông tin toán học với robot AI.",
    });
  }
});

// Setup Vite Development engine or Production Static deployment
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[FULLSTACK] Server running smoothly at http://localhost:${PORT}`);
  });
}

startServer();
