/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Point2D, ShapeData, AppOptions } from "./types";
import { GEOMETRY_TEMPLATES } from "./templates";

// --- 1. GRAPHICAL GEOMETRY COMPUTATION ENGINE ---
export const GeometryEngine = {
  /**
   * Normalizes arbitrary coordinates to center neatly inside an SVG viewport (500x380 px) with padding.
   * Handles 3D coordinates via Oblique Cavalier Projection.
   */
  normalizeCoordinates: function(
    pointsObj: Record<string, any>,
    is3D: boolean = false,
    zoomScale: number = 1.0
  ): Record<string, Point2D> {
    const screenPoints: Record<string, Point2D> = {};
    const padding = 65;
    const canvasW = 500;
    const canvasH = 380;
    const projected: Record<string, Point2D> = {};

    if (is3D) {
      // Classic axonometric oblique projection
      for (const key in pointsObj) {
        const pt = pointsObj[key];
        const px = pt.x || 0;
        const py = pt.y || 0;
        const pz = pt.z || 0;
        projected[key] = {
          x: px - py * 0.45,
          y: pz - py * 0.42 // Project Z on Y with positive direction going vertically upwards
        };
      }
    } else {
      for (const key in pointsObj) {
        projected[key] = { x: pointsObj[key].x, y: pointsObj[key].y };
      }
    }

    // Find bounding box limits
    let minX = Infinity;
    let maxX = -Infinity;
    let minY = Infinity;
    let maxY = -Infinity;

    for (const k in projected) {
      const p = projected[k];
      if (p.x < minX) minX = p.x;
      if (p.x > maxX) maxX = p.x;
      if (p.y < minY) minY = p.y;
      if (p.y > maxY) maxY = p.y;
    }

    let dx = maxX - minX;
    let dy = maxY - minY;
    if (dx === 0) dx = 1;
    if (dy === 0) dy = 1;

    const scaleX = (canvasW - 2 * padding) / dx;
    const scaleY = (canvasH - 2 * padding) / dy;
    const scale = Math.min(scaleX, scaleY) * zoomScale;

    // Bounding Box Center coordinates
    const cx = (minX + maxX) / 2;
    const cy = (minY + maxY) / 2;

    for (const k in projected) {
      const p = projected[k];
      screenPoints[k] = {
        x: canvasW / 2 + (p.x - cx) * scale,
        y: canvasH / 2 - (p.y - cy) * scale // Geometry Y coordinates increase upwards, SVG Y decreases upwards
      };
    }

    return screenPoints;
  },

  /**
   * Generates beautiful Right Angle square mark in SVG coordinate space
   */
  getRightAngleMarkerPath: function(
    pRight: Point2D,
    p1: Point2D,
    p2: Point2D,
    size: number = 14
  ): string {
    const v1 = { x: p1.x - pRight.x, y: p1.y - pRight.y };
    const v2 = { x: p2.x - pRight.x, y: p2.y - pRight.y };

    const len1 = Math.sqrt(v1.x * v1.x + v1.y * v1.y);
    const len2 = Math.sqrt(v2.x * v2.x + v2.y * v2.y);

    if (len1 === 0 || len2 === 0) return "";

    // Normalized unit direction vectors
    const u1 = { x: v1.x / len1, y: v1.y / len1 };
    const u2 = { x: v2.x / len2, y: v2.y / len2 };

    const pt1 = { x: pRight.x + u1.x * size, y: pRight.y + u1.y * size };
    const pt2 = { x: pRight.x + u2.x * size, y: pRight.y + u2.y * size };
    const ptCorner = { x: pt1.x + u2.x * size, y: pt1.y + u2.y * size };

    return `M ${pt1.x} ${pt1.y} L ${ptCorner.x} ${ptCorner.y} L ${pt2.x} ${pt2.y}`;
  },

  /**
   * Offsets text labels properly from points so everything is readable
   */
  getSmartLabelOffset: function(posName: string): { dx: number; dy: number } {
    let dx = 0;
    let dy = 0;
    switch (posName) {
      case "top":
        dx = 0;
        dy = -15;
        break;
      case "bottom":
        dx = 0;
        dy = 18;
        break;
      case "left":
        dx = -16;
        dy = 4;
        break;
      case "right":
        dx = 16;
        dy = 4;
        break;
      case "top-left":
        dx = -13;
        dy = -11;
        break;
      case "top-right":
        dx = 13;
        dy = -11;
        break;
      case "bottom-left":
        dx = -13;
        dy = 14;
        break;
      case "bottom-right":
        dx = 13;
        dy = 14;
        break;
      default:
        dx = 12;
        dy = -12;
    }
    return { dx, dy };
  }
};

// --- 2. JAVASCRIPT GEOMETRY NATURAL LANGUAGE PARSER ---
export const VietnameseGeometryParser = {
  parse: function(descriptionText: string) {
    if (!descriptionText || descriptionText.trim() === "") {
      return { error: "empty", msg: "Vui lòng nhập mô tả hoặc chọn hình vẽ mẫu từ thư viện." };
    }

    const cleanText = descriptionText.toLowerCase().trim();
    let matchedTemplate = null;
    let highestScore = -1;

    for (const temp of GEOMETRY_TEMPLATES) {
      let score = 0;
      
      // Keyword matching
      if (temp.keywords) {
        for (const kw of temp.keywords) {
          if (cleanText.includes(kw)) {
            score += 2;
          }
        }
      }

      // Context checks
      if (temp.id === "right_triangle_altitude" && (cleanText.includes("đường cao ah") || cleanText.includes("đường cao"))) {
        score += 5;
      }
      if (temp.id === "triangle_midsegment" && (cleanText.includes("đường trung bình") || cleanText.includes("trung điểm of"))) {
        score += 5;
      }
      if (temp.id === "rectangular_prism" && (cleanText.includes("hộp chữ nhật") || cleanText.includes("hộp chữ nhật abcd"))) {
        score += 5;
      }
      if (temp.id === "quadrangular_pyramid" && (cleanText.includes("hình chóp tứ giác") || cleanText.includes("chóp tứ giác đều"))) {
        score += 5;
      }

      if (score > highestScore && score > 0) {
        highestScore = score;
        matchedTemplate = temp;
      }
    }

    // Direct fallbacks if no strong match scores
    if (!matchedTemplate || highestScore < 2) {
      if (cleanText.includes("tam giác")) {
        if (cleanText.includes("vuông")) {
          if (cleanText.includes("đường cao") || cleanText.includes("ah")) {
            matchedTemplate = GEOMETRY_TEMPLATES.find(t => t.id === "right_triangle_altitude");
          } else {
            matchedTemplate = GEOMETRY_TEMPLATES.find(t => t.id === "right_triangle");
          }
        } else if (cleanText.includes("cân")) {
          matchedTemplate = GEOMETRY_TEMPLATES.find(t => t.id === "isosceles_triangle");
        } else if (cleanText.includes("đều")) {
          matchedTemplate = GEOMETRY_TEMPLATES.find(t => t.id === "equilateral_triangle");
        } else if (cleanText.includes("trung tuyến")) {
          matchedTemplate = GEOMETRY_TEMPLATES.find(t => t.id === "triangle_median");
        } else if (cleanText.includes("phân giác")) {
          matchedTemplate = GEOMETRY_TEMPLATES.find(t => t.id === "triangle_bisector");
        } else if (cleanText.includes("trung bình")) {
          matchedTemplate = GEOMETRY_TEMPLATES.find(t => t.id === "triangle_midsegment");
        } else {
          matchedTemplate = GEOMETRY_TEMPLATES.find(t => t.id === "general_triangle");
        }
      } else if (cleanText.includes("hình vuông") || cleanText.includes("vuông abcd")) {
        matchedTemplate = GEOMETRY_TEMPLATES.find(t => t.id === "square");
      } else if (cleanText.includes("chữ nhật") || cleanText.includes("hình chữ nhật")) {
        matchedTemplate = GEOMETRY_TEMPLATES.find(t => t.id === "rectangle");
      } else if (cleanText.includes("bình hành")) {
        matchedTemplate = GEOMETRY_TEMPLATES.find(t => t.id === "parallelogram");
      } else if (cleanText.includes("hình thoi")) {
        matchedTemplate = GEOMETRY_TEMPLATES.find(t => t.id === "rhombus");
      } else if (cleanText.includes("hình thang")) {
        if (cleanText.includes("thang cân")) {
          matchedTemplate = GEOMETRY_TEMPLATES.find(t => t.id === "isosceles_trapezoid");
        } else {
          matchedTemplate = GEOMETRY_TEMPLATES.find(t => t.id === "trapezoid");
        }
      } else if (cleanText.includes("đường tròn") || cleanText.includes("bán kính")) {
        if (cleanText.includes("tiếp tuyến")) {
          matchedTemplate = GEOMETRY_TEMPLATES.find(t => t.id === "circle_tangent");
        } else if (cleanText.includes("nội tiếp")) {
          matchedTemplate = GEOMETRY_TEMPLATES.find(t => t.id === "triangle_inscribed");
        } else {
          matchedTemplate = GEOMETRY_TEMPLATES.find(t => t.id === "circle_basic");
        }
      } else if (cleanText.includes("hình chóp")) {
        if (cleanText.includes("tứ giác")) {
          matchedTemplate = GEOMETRY_TEMPLATES.find(t => t.id === "quadrangular_pyramid");
        } else {
          matchedTemplate = GEOMETRY_TEMPLATES.find(t => t.id === "triangular_pyramid");
        }
      } else if (cleanText.includes("lập phương")) {
        matchedTemplate = GEOMETRY_TEMPLATES.find(t => t.id === "cube");
      } else if (cleanText.includes("hộp chữ nhật") || cleanText.includes("rectangular prism")) {
        matchedTemplate = GEOMETRY_TEMPLATES.find(t => t.id === "rectangular_prism");
      } else if (cleanText.includes("tọa độ") || cleanText.includes("oxy")) {
        matchedTemplate = GEOMETRY_TEMPLATES.find(t => t.id === "oxy_coordinate");
      }
    }

    if (!matchedTemplate) {
      // absolute fallback: Standard ABC General Triangle
      matchedTemplate = GEOMETRY_TEMPLATES[0];
      return {
        error: "partial",
        msg: "Dữ dữ liệu tự do chưa được cấu trúc tối đa. Hệ thống tự động thiết kế hình vẽ chuẩn minh họa lý tưởng nhất!",
        template: matchedTemplate
      };
    }

    return {
      error: null,
      msg: "Đã phân tích cú pháp thành công! Đang dựng bản vẽ hình học và sinh đề bài tập.",
      template: matchedTemplate
    };
  }
};

// --- 3. GEOGEBRA COMPUTER-AIDED DESIGN SCRIPT EXPORTER ---
export const GeoGebraExporter = {
  generate: function(shapeData: ShapeData): string {
    const codeLines: string[] = [];
    codeLines.push("// =================================================");
    codeLines.push("//  MÃ GEOGEBRA INPUT BAR (TRỰC QUAN SƯ PHẠM)");
    codeLines.push("//  Dán tất cả các dòng lệnh dưới vào GeoGebra");
    codeLines.push("// =================================================");

    // 1. Declare Coordinate Points
    for (const key in shapeData.points) {
      if (key.includes("_start") || key.includes("_end")) continue;
      const pt = shapeData.points[key];
      if (pt.z !== undefined) {
        codeLines.push(`${key} = (${pt.x}, ${pt.y}, ${pt.z})`);
      } else {
        codeLines.push(`${key} = (${pt.x}, ${pt.y})`);
      }
    }

    // 2. Circles
    if (shapeData.circles) {
      shapeData.circles.forEach((c) => {
        codeLines.push(`c_{${c.center}} = Circle(${c.center}, ${c.point})`);
      });
    }

    // 3. Line segments
    if (shapeData.segments) {
      shapeData.segments.forEach((seg) => {
        if (seg[0].includes("_start") || seg[1].includes("_start")) return;
        codeLines.push(`Segment(${seg[0]}, ${seg[1]})`);
      });
    }

    // 4. Auxiliary dotted lines
    if (shapeData.auxSegments) {
      shapeData.auxSegments.forEach((seg) => {
        codeLines.push(`Segment(${seg[0]}, ${seg[1]})`);
      });
    }

    // 5. 3D line edges representation
    if (shapeData.edges3d) {
      shapeData.edges3d.forEach((edge) => {
        codeLines.push(`Segment(${edge.from}, ${edge.to})`);
      });
    }

    // 6. Right Angle Helpers
    if (shapeData.rightAngles) {
      shapeData.rightAngles.forEach((ra) => {
        codeLines.push(`Angle(${ra[0]}, ${ra[1]}, ${ra[2]})`);
      });
    }

    return codeLines.join("\n");
  }
};

// --- 4. PEDAGOGICAL MATH SHEET EXERCISE GENERATOR ---
export const ExerciseGenerator = {
  generate: function(shapeData: ShapeData, grade: string): { questionHtml: string; solutionHtml: string } {
    const name = shapeData.shapeType;
    let questionHtml = "";
    let solutionHtml = "";

    if (name === "right_triangle_altitude") {
      questionHtml = `
        <div class="space-y-4">
          <div class="flex items-center gap-2">
            <span class="px-2.5 py-0.5 bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300 text-xs font-bold rounded-full">Chủ đề</span>
            <span class="text-xs font-semibold text-slate-500 dark:text-slate-400">Hệ thức lượng trong tam giác vuông (Lớp 9)</span>
          </div>

          <div class="p-4 bg-slate-50 dark:bg-slate-900/40 rounded-xl border border-slate-100 dark:border-slate-700/50">
            <p class="font-bold text-slate-800 dark:text-slate-200 mb-2">ĐỀ BÀI KIỂM TRA ĐỊNH KỲ</p>
            <p class="text-slate-700 dark:text-slate-300 text-sm">
              Cho tam giác <strong>ABC</strong> vuông tại <strong>A</strong>, đường cao <strong>AH</strong> hạ xuống cạnh huyền <strong>BC</strong>. Biết độ dài cạnh góc vuông <strong>AB = 4 cm</strong> và <strong>AC = 3 cm</strong>.
            </p>
          </div>

          <!-- Section 1 -->
          <div>
            <p class="font-bold text-sm text-slate-800 dark:text-slate-100 mb-2">Phần I: Trắc nghiệm khách quan (4 lựa chọn)</p>
            <div class="p-3.5 bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 space-y-3">
              <p class="text-slate-700 dark:text-slate-300 text-sm font-medium">Câu 1. Độ dài cạnh huyền BC của tam giác ABC là:</p>
              <div class="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
                <div class="p-2 border border-slate-100 dark:border-slate-700 rounded-lg bg-slate-50/50 dark:bg-slate-900/20 font-semibold text-slate-700 dark:text-slate-300">A. 5 cm</div>
                <div class="p-2 border border-slate-100 dark:border-slate-700 rounded-lg bg-slate-50/50 dark:bg-slate-900/20 font-semibold text-slate-700 dark:text-slate-300">B. 7 cm</div>
                <div class="p-2 border border-slate-100 dark:border-slate-700 rounded-lg bg-slate-50/50 dark:bg-slate-900/20 font-semibold text-slate-700 dark:text-slate-300">C. 12 cm</div>
                <div class="p-2 border border-slate-100 dark:border-slate-700 rounded-lg bg-slate-50/50 dark:bg-slate-900/20 font-semibold text-slate-700 dark:text-slate-300">D. 2.4 cm</div>
              </div>
            </div>
          </div>

          <!-- Section 2 -->
          <div>
            <p class="font-bold text-sm text-slate-800 dark:text-slate-100 mb-2">Phần II: Câu hỏi Trắc nghiệm Đúng - Sai đa ý</p>
            <div class="p-3.5 bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700">
              <p class="text-slate-700 dark:text-slate-300 text-sm mb-3">Câu 2. Các khẳng định về hệ thức lượng dưới đây đúng hay sai:</p>
              <div class="space-y-2 text-xs text-slate-600 dark:text-slate-300">
                <div class="flex items-center justify-between p-2 bg-slate-50 dark:bg-slate-900/40 rounded-lg">
                  <span>a) Diện tích tam giác ABC được tính bằng công thức: S = 1/2 . AB . AC</span>
                  <span class="px-2 py-0.5 bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 font-bold rounded">Đúng</span>
                </div>
                <div class="flex items-center justify-between p-2 bg-slate-50 dark:bg-slate-900/40 rounded-lg">
                  <span>b) Hệ thức lượng giữa đường cao và hình chiếu là: AH² = HB . HC</span>
                  <span class="px-2 py-0.5 bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 font-bold rounded">Đúng</span>
                </div>
                <div class="flex items-center justify-between p-2 bg-slate-50 dark:bg-slate-900/40 rounded-lg">
                  <span>c) Trực quan độ dài đường cao AH đo được bằng 2.4 cm</span>
                  <span class="px-2 py-0.5 bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 font-bold rounded">Đúng</span>
                </div>
                <div class="flex items-center justify-between p-2 bg-slate-50 dark:bg-slate-900/40 rounded-lg">
                  <span>d) Tỉ số hai cạnh góc vuông: (AB/AC)² bằng HB/HC</span>
                  <span class="px-2 py-0.5 bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 font-bold rounded">Đúng</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Section 3 -->
          <div>
            <p class="font-bold text-sm text-slate-800 dark:text-slate-100 mb-2">Phần III: Câu hỏi tự luận giải trực quan</p>
            <div class="p-3.5 bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 space-y-2">
              <p class="text-slate-700 dark:text-slate-300 text-sm">
                Tính chính xác các đại lượng sau của bản thiết kế:
              </p>
              <ul class="list-decimal pl-5 text-xs text-slate-600 dark:text-slate-400 space-y-1 font-mono">
                <li>Độ dài đường cao AH</li>
                <li>Độ dài hình chiếu HB của AB lên BC</li>
                <li>Độ dài hình chiếu HC của AC lên BC</li>
              </ul>
            </div>
          </div>
        </div>
      `;

      solutionHtml = `
        <div class="space-y-4 text-sm leading-relaxed">
          <div class="border-b border-emerald-100 dark:border-emerald-900/40 pb-2">
            <h3 class="font-bold text-emerald-800 dark:text-emerald-400 text-base">HƯỚNG DẪN GIẢI CHI TIẾT THEO CHUẨN SƯ PHẠM</h3>
            <p class="text-xs text-slate-500 mt-0.5">Trình bày chặt chẽ, tối ưu hóa điểm số thi tuyển sinh vào 10</p>
          </div>

          <div class="space-y-3">
            <!-- Part 1 -->
            <div class="bg-emerald-50/40 dark:bg-emerald-950/10 p-3 rounded-xl border border-emerald-100/50 dark:border-emerald-900/25">
              <p class="font-bold text-slate-800 dark:text-slate-200 text-xs mb-1">Bước 1: Tính chiều dài cạnh huyền BC</p>
              <p class="text-slate-600 dark:text-slate-300 text-xs">
                Xét tam giác <span class="font-semibold">ABC</span> vuông tại <span class="font-semibold">A</span>. Áp dụng Định lý Pythagore:
              </p>
              <div class="bg-white dark:bg-slate-900 p-2 rounded-lg font-mono text-xs text-indigo-600 dark:text-indigo-400 mt-2">
                BC² = AB² + AC² = 4² + 3² = 16 + 9 = 25<br>
                ⇒ BC = &radic;25 = 5 (cm)
              </div>
            </div>

            <!-- Part 2 -->
            <div class="bg-emerald-50/40 dark:bg-emerald-950/10 p-3 rounded-xl border border-emerald-100/50 dark:border-emerald-900/25">
              <p class="font-bold text-slate-800 dark:text-slate-200 text-xs mb-1">Bước 2: Tính đường cao AH</p>
              <p class="text-slate-600 dark:text-slate-300 text-xs">
                Sử dụng hệ thức lượng liên hệ giữa ba cạnh và đường cao (S_ABC = 1/2 . AH . BC = 1/2 . AB . AC):
              </p>
              <div class="bg-white dark:bg-slate-900 p-2 rounded-lg font-mono text-xs text-indigo-600 dark:text-indigo-400 mt-2">
                AH . BC = AB . AC<br>
                ⇒ AH = (AB . AC) / BC = (4 . 3) / 5 = 12 / 5 = 2.4 (cm)
              </div>
            </div>

            <!-- Part 3 -->
            <div class="bg-emerald-50/40 dark:bg-emerald-950/10 p-3 rounded-xl border border-emerald-100/50 dark:border-emerald-900/25">
              <p class="font-bold text-slate-800 dark:text-slate-200 text-xs mb-1">Bước 3: Tính độ dài hai hình chiếu HB và HC</p>
              <p class="text-slate-600 dark:text-slate-300 text-xs">
                Áp dụng hệ thức liên hệ cạnh góc vuông và hình chiếu tương ứng:
              </p>
              <div class="bg-white dark:bg-slate-900 p-2 rounded-lg font-mono text-xs text-indigo-600 dark:text-indigo-400 mt-2">
                AB² = HB . BC ⇒ HB = AB² / BC = 4² / 5 = 16 / 5 = 3.2 (cm)<br>
                HC = BC - HB = 5 - 3.2 = 1.8 (cm)<br>
                <span class="text-slate-400">// Hoặc tính bằng: AC² = HC . BC ⇒ HC = AC² / BC = 9 / 5 = 1.8 (cm)</span>
              </div>
            </div>
          </div>

          <div class="p-3 bg-blue-50/50 dark:bg-slate-900/60 text-xs text-blue-800 dark:text-blue-300 rounded-lg">
            <strong>Danh mục ghi nhớ kiến thức:</strong> Hệ thức lượng hình chiếu của tam giác vuông, Định lý Pythagore thuận lớp 7 & 9 THCS.
          </div>
        </div>
      `;
    } else if (shapeData.shapeType === "rectangular_prism" || shapeData.shapeType === "cube" || shapeData.shapeType === "triangular_pyramid" || shapeData.shapeType === "quadrangular_pyramid") {
      questionHtml = `
        <div class="space-y-4">
          <div class="flex items-center gap-2">
            <span class="px-2.5 py-0.5 bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300 text-xs font-bold rounded-full">Chủ đề</span>
            <span class="text-xs font-semibold text-slate-500 dark:text-slate-400">Hình học trực quan không gian (Lớp 8)</span>
          </div>

          <div class="p-4 bg-slate-50 dark:bg-slate-900/40 rounded-xl border border-slate-100 dark:border-slate-700/50">
            <p class="font-bold text-slate-800 dark:text-slate-200 mb-1">BÀI TOÁN KHÔNG GIAN BÊN BẢN VẼ</p>
            <p class="text-slate-700 dark:text-slate-300 text-sm">
              Xem xét mô hình vẽ 3D trực quan bên cạnh. Cho hình vẽ thể tích không gian với kích thước lý thuyết: Diện tích của mặt đáy là <strong>16 cm²</strong> và chiều cao của đường cao chính trực của hình là <strong>6 cm</strong>.
            </p>
          </div>

          <div>
            <p class="font-bold text-sm text-slate-800 dark:text-slate-100 mb-2">Câu hỏi 1 (Tùy luận tính thể tích):</p>
            <div class="p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700">
              <p class="text-slate-700 dark:text-slate-300 text-sm">
                Áp dụng công thức tính thể tích dưới đây, hãy tìm thể tích thực tế bao hàm của mô hình hình học không gian 3D trên:
              </p>
              <div class="bg-amber-50/30 dark:bg-slate-950/40 p-2 rounded font-mono text-xs text-amber-800 dark:text-amber-400 mt-2">
                1. Trường hợp hình chóp: V = 1/3 . S_{đáy} . h<br>
                2. Trường hợp hình lăng trụ / hình lập phương: V = S_{đáy} . h
              </div>
            </div>
          </div>
        </div>
      `;

      solutionHtml = `
        <div class="space-y-3 text-sm">
          <h3 class="font-bold text-emerald-800 dark:text-emerald-400 text-sm border-b border-slate-150 pb-2">ĐÁP ÁN PHÂN TÍCH KHÔNG GIAN 3D</h3>
          <p class="text-slate-600 dark:text-slate-300">
            Dựa trên mô hình biểu thị bản vẽ 3D hiện hành:
          </p>

          <div class="bg-slate-50 dark:bg-slate-900 p-3 rounded-lg space-y-2">
            <p class="font-semibold text-slate-800 dark:text-slate-200 text-xs">Áp dụng công thức:</p>
            <p class="text-xs text-slate-600 dark:text-slate-300">
              Nếu đây là hình chóp (tam giác đều hoặc tứ giác đều) theo nét khuất nét liền:
            </p>
            <div class="font-mono text-xs text-indigo-600 dark:text-indigo-400">
              V = 1/3 . S_đáy . h = 1/3 . 16 . 6 = 32 (cm³)
            </div>
            <p class="text-xs text-slate-600 dark:text-slate-300">
              Nếu đây là hình lập phương / hộp chữ nhật có ba kích thước:
            </p>
            <div class="font-mono text-xs text-indigo-600 dark:text-indigo-400">
              V = S_đáy . h = 16 . 6 = 96 (cm³)
            </div>
          </div>

          <div class="p-2.5 bg-blue-50/50 dark:bg-slate-900 text-xs text-blue-700 dark:text-blue-300 rounded">
            <strong>Ghi chú giáo viên:</strong> Hướng dẫn học sinh phân biệt nét đứt (cạnh khuất) và nét liền (cạnh nhìn thấy) trong không gian 3D.
          </div>
        </div>
      `;
    } else {
      // General backup
      questionHtml = `
        <div class="space-y-4">
          <div class="flex items-center gap-2">
            <span class="px-2.5 py-0.5 bg-teal-100 text-teal-700 dark:bg-teal-900/40 dark:text-teal-300 text-xs font-bold rounded-full">Chương trình</span>
            <span class="text-xs font-semibold text-slate-500 dark:text-slate-400">Hình học THCS (Lớp ${grade})</span>
          </div>

          <div class="p-4 bg-slate-50 dark:bg-slate-900/40 rounded-xl border border-slate-100 dark:border-slate-700/50">
            <p class="font-bold text-slate-800 dark:text-slate-200 mb-1">Mục tiêu củng cố: ${shapeData.shapeType}</p>
            <p class="text-slate-700 dark:text-slate-300 text-sm">
              Quan sát trực diện hình vẽ sinh động từ bản vẽ chuẩn. Lập các luận cứ chứng minh và giải hệ bài tập sau:
            </p>
          </div>

          <div class="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-100 dark:border-slate-700">
            <p class="font-bold text-sm text-slate-800 dark:text-slate-100 mb-2">Đề bài tự chọn:</p>
            <p class="text-slate-600 dark:text-slate-300 text-sm italic">
              Cho các điểm có tọa độ bố trí như trên sơ đồ trực quan. Hãy chứng minh quan hệ hình học song song, vuông góc hoặc bằng nhau biểu đạt trong hình.
            </p>
          </div>
        </div>
      `;

      solutionHtml = `
        <div class="space-y-3 text-sm">
          <h3 class="font-bold text-emerald-800 dark:text-emerald-400">HƯỚNG DẪN KIẾN THỨC NỀN TẢNG (MA TRẬN LỚP ${grade})</h3>
          <p class="text-slate-600 dark:text-slate-300 font-medium">Hệ thống bài giảng tập trung vào các năng lực:</p>
          <ul class="list-disc pl-5 text-xs text-slate-600 dark:text-slate-400 space-y-1">
            <li>Nhận diện tính chất và cấu hình đặc trưng của hình phẳng lớp ${grade}.</li>
            <li>Chứng minh quan hệ ba điểm thẳng hàng, đường song song, tia phân góc và đường chéo của đa giác lồi.</li>
          </ul>
        </div>
      `;
    }

    return { questionHtml, solutionHtml };
  }
};
