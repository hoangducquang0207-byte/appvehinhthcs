/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GeometryTemplate } from "./types";

export const GEOMETRY_TEMPLATES: GeometryTemplate[] = [
  {
    id: "general_triangle",
    name: "1. Tam giác thường",
    grade: "7",
    topic: "Quan hệ giữa các yếu tố trong tam giác",
    type: "triangle",
    description: "Vẽ tam giác ABC nhọn, AB = 5 cm, AC = 6 cm, góc A bằng 60 độ.",
    defaultData: {
      shapeType: "general_triangle",
      points: { A: { x: 1, y: 3.5 }, B: { x: 0, y: 0 }, C: { x: 4.5, y: 0 } },
      segments: [["A", "B"], ["B", "C"], ["C", "A"]],
      labels: { A: "top", B: "bottom-left", C: "bottom-right" }
    },
    learningGoals: ["Nhận diện tam giác nhọn", "Xác định góc và cạnh"],
    sampleExercise: "Tính chu vi tam giác ABC.",
    keywords: ["tam giác", "tam giác nhọn", "abc", "bằng 60 độ", "nhọn"]
  },
  {
    id: "right_triangle",
    name: "2. Tam giác vuông",
    grade: "7",
    topic: "Định lý Pythagore",
    type: "triangle",
    description: "Vẽ tam giác ABC vuông tại A, có AB = 3 cm, AC = 4 cm.",
    defaultData: {
      shapeType: "right_triangle",
      points: { A: { x: 0, y: 0 }, B: { x: 0, y: 4 }, C: { x: 3, y: 0 } },
      segments: [["A", "B"], ["B", "C"], ["C", "A"]],
      rightAngles: [["B", "A", "C"]],
      labels: { A: "bottom-left", B: "top", C: "bottom-right" }
    },
    learningGoals: ["Nhận diện tam giác vuông", "Tính độ dài cạnh huyền bằng Pythagore"],
    sampleExercise: "Tìm độ dài BC.",
    keywords: ["vuông", "vuông tại a", "pythagore", "cạnh huyền"]
  },
  {
    id: "right_triangle_altitude",
    name: "3. Tam giác vuông có đường cao AH",
    grade: "9",
    topic: "Hệ thức lượng trong tam giác vuông",
    type: "triangle",
    description: "Vẽ tam giác ABC vuông tại A, AB = 4 cm, AC = 3 cm. Kẻ đường cao AH xuống BC.",
    defaultData: {
      shapeType: "right_triangle_altitude",
      points: { A: { x: 0, y: 0 }, B: { x: 0, y: 4 }, C: { x: 3, y: 0 }, H: { x: 1.92, y: 1.44 } },
      segments: [["A", "B"], ["B", "C"], ["C", "A"], ["A", "H"]],
      rightAngles: [["B", "A", "C"], ["A", "H", "C"]],
      labels: { A: "bottom-left", B: "top", C: "bottom-right", H: "top-right" }
    },
    learningGoals: ["Sử dụng hệ thức lượng", "Tính chất đường cao tam giác vuông"],
    sampleExercise: "Tính độ dài các đoạn thẳng BC, AH, HB, HC.",
    keywords: ["đường cao ah", "đường cao", "ah", "hệ thức lượng", "chiếu"]
  },
  {
    id: "isosceles_triangle",
    name: "4. Tam giác cân",
    grade: "7",
    topic: "Tam giác cân - Tính chất góc ở đáy",
    type: "triangle",
    description: "Vẽ tam giác ABC cân tại A, đường cao AH.",
    defaultData: {
      shapeType: "isosceles_triangle",
      points: { A: { x: 2, y: 4.5 }, B: { x: 0, y: 0 }, C: { x: 4, y: 0 }, H: { x: 2, y: 0 } },
      segments: [["A", "B"], ["B", "C"], ["C", "A"], ["A", "H"]],
      rightAngles: [["A", "H", "C"]],
      equalSegments: [["A", "B"], ["A", "C"]],
      labels: { A: "top", B: "bottom-left", C: "bottom-right", H: "bottom" }
    },
    learningGoals: ["Hiểu tính chất tam giác cân", "Chứng minh trung điểm"],
    sampleExercise: "Chứng minh H là trung điểm của BC.",
    keywords: ["cân", "cân tại a", "đường cao ah", "isosceles"]
  },
  {
    id: "equilateral_triangle",
    name: "5. Tam giác đều",
    grade: "6",
    topic: "Tam giác đều - Các hình phẳng trong thực tiễn",
    type: "triangle",
    description: "Vẽ tam giác đều ABC cạnh bằng 4 cm.",
    defaultData: {
      shapeType: "equilateral_triangle",
      points: { A: { x: 2, y: 3.46 }, B: { x: 0, y: 0 }, C: { x: 4, y: 0 } },
      segments: [["A", "B"], ["B", "C"], ["C", "A"]],
      equalSegments: [["A", "B"], ["B", "C"], ["C", "A"]],
      labels: { A: "top", B: "bottom-left", C: "bottom-right" }
    },
    learningGoals: ["Nhận diện tam giác đều", "Tính chất góc 60 độ"],
    sampleExercise: "Tính số đo các góc của tam giác ABC.",
    keywords: ["đều", "tam giác đều", "cạnh 4", "equilateral"]
  },
  {
    id: "triangle_median",
    name: "6. Tam giác có trung tuyến AM",
    grade: "7",
    topic: "Các đường đồng quy trong tam giác",
    type: "triangle",
    description: "Vẽ tam giác ABC có M là trung điểm của BC. Vẽ trung tuyến AM.",
    defaultData: {
      shapeType: "triangle_median",
      points: { A: { x: 1.5, y: 3.5 }, B: { x: 0, y: 0 }, C: { x: 4, y: 0 }, M: { x: 2, y: 0 } },
      segments: [["A", "B"], ["B", "C"], ["C", "A"], ["A", "M"]],
      labels: { A: "top", B: "bottom-left", C: "bottom-right", M: "bottom" }
    },
    learningGoals: ["Khái niệm đường trung tuyến", "Trọng tâm tam giác"],
    sampleExercise: "Tính độ dài đoạn thẳng MB và MC biết BC = 6 cm.",
    keywords: ["trung tuyến", "trung tuyến am", "am", "trung điểm m"]
  },
  {
    id: "triangle_bisector",
    name: "7. Tam giác có đường phân giác AD",
    grade: "8",
    topic: "Tính chất đường phân giác trong tam giác",
    type: "triangle",
    description: "Vẽ tam giác ABC, AD là tia phân giác của góc BAC (D thuộc BC).",
    defaultData: {
      shapeType: "triangle_bisector",
      points: { A: { x: 1.5, y: 4 }, B: { x: 0, y: 0 }, C: { x: 5, y: 0 }, D: { x: 2.24, y: 0 } },
      segments: [["A", "B"], ["B", "C"], ["C", "A"], ["A", "D"]],
      labels: { A: "top", B: "bottom-left", C: "bottom-right", D: "bottom" }
    },
    learningGoals: ["Vận dụng tỉ lệ phân giác", "Tính độ dài cạnh liên quan"],
    sampleExercise: "Cho AB = 4, AC = 6, BD = 2. Tính DC.",
    keywords: ["phân giác", "phân giác ad", "ad", "tia phân giác"]
  },
  {
    id: "triangle_perpendicular_bisector",
    name: "8. Tam giác có đường trung trực",
    grade: "7",
    topic: "Đường trung trực của tam giác",
    type: "triangle",
    description: "Vẽ tam giác ABC và đường trung trực d của cạnh BC cắt BC tại M.",
    defaultData: {
      shapeType: "triangle_perpendicular_bisector",
      points: { A: { x: 1, y: 3 }, B: { x: 0, y: 0 }, C: { x: 4, y: 0 }, M: { x: 2, y: 0 }, D: { x: 2, y: 4.5 } },
      segments: [["A", "B"], ["B", "C"], ["C", "A"]],
      auxSegments: [["M", "D"]],
      rightAngles: [["D", "M", "C"]],
      labels: { A: "top", B: "bottom-left", C: "bottom-right", M: "bottom", D: "top" }
    },
    learningGoals: ["Nhận diện đường trung trực", "Khoảng cách đến các đỉnh"],
    sampleExercise: "Chứng minh điểm thuộc trung trực d cách đều B và C.",
    keywords: ["trung trực", "đường trung trực", "trung trực d"]
  },
  {
    id: "parallel_lines_cut",
    name: "9. Hai đường thẳng song song bị cắt",
    grade: "7",
    topic: "Góc tạo bởi một đường thẳng cắt hai đường thẳng song song",
    type: "lines",
    description: "Vẽ hai đường thẳng song song a và b. Đường thẳng c cắt a, b lần lượt tại A, B.",
    defaultData: {
      shapeType: "parallel_lines_cut",
      points: { A_start: { x: 0, y: 3.5 }, A_end: { x: 6, y: 3.5 }, B_start: { x: 0, y: 1 }, B_end: { x: 6, y: 1 }, A: { x: 2.5, y: 3.5 }, B: { x: 1.5, y: 1 }, C_start: { x: 1, y: 0 }, C_end: { x: 3, y: 4.5 } },
      segments: [["A_start", "A_end"], ["B_start", "B_end"], ["C_start", "C_end"]],
      labels: { A: "top-right", B: "bottom-left" }
    },
    learningGoals: ["Góc so le trong bằng nhau", "Góc đồng vị"],
    sampleExercise: "Biết một góc tại A là 60 độ. Tìm số đo góc so le trong tại B.",
    keywords: ["song song", "cắt nhau", "so le trong", "đồng vị"]
  },
  {
    id: "angle_bisector_simple",
    name: "10. Góc và tia phân giác",
    grade: "6",
    topic: "Góc và tia phân giác",
    type: "angle",
    description: "Vẽ góc xOy có số đo bằng 60 độ và tia phân giác Ot.",
    defaultData: {
      shapeType: "angle_bisector_simple",
      points: { O: { x: 0, y: 0 }, X: { x: 4.5, y: 0 }, Y: { x: 3, y: 3.5 }, T: { x: 4, y: 1.8 } },
      segments: [["O", "X"], ["O", "Y"], ["O", "T"]],
      labels: { O: "bottom-left", X: "bottom", Y: "top", T: "right" }
    },
    learningGoals: ["Vẽ tia phân giác góc nhọn", "Khái niệm góc bằng nhau"],
    sampleExercise: "Tính góc xOt và tOy nếu góc xOy bằng 80 độ.",
    keywords: ["xoy", "tia phân giác ot", "góc nhọn"]
  },
  {
    id: "rectangle",
    name: "11. Hình chữ nhật",
    grade: "8",
    topic: "Tứ giác - Hình chữ nhật",
    type: "polygon",
    description: "Vẽ hình chữ nhật ABCD có AB = 6 cm, AD = 4 cm.",
    defaultData: {
      shapeType: "rectangle",
      points: { A: { x: 0, y: 3 }, B: { x: 5, y: 3 }, C: { x: 5, y: 0 }, D: { x: 0, y: 0 } },
      segments: [["A", "B"], ["B", "C"], ["C", "D"], ["D", "A"]],
      rightAngles: [["D", "A", "B"], ["A", "B", "C"], ["B", "C", "D"]],
      labels: { A: "top-left", B: "top-right", C: "bottom-right", D: "bottom-left" }
    },
    learningGoals: ["Tính chất hình chữ nhật", "Tính đường chéo"],
    sampleExercise: "Tính độ dài đường chéo AC của hình chữ nhật ABCD.",
    keywords: ["hình chữ nhật", "abcd", "rectangular"]
  },
  {
    id: "square",
    name: "12. Hình vuông",
    grade: "8",
    topic: "Tứ giác - Hình vuông",
    type: "polygon",
    description: "Vẽ hình vuông ABCD có hai đường chéo AC và BD cắt nhau tại O.",
    defaultData: {
      shapeType: "square",
      points: { A: { x: 0, y: 4 }, B: { x: 4, y: 4 }, C: { x: 4, y: 0 }, D: { x: 0, y: 0 }, O: { x: 2, y: 2 } },
      segments: [["A", "B"], ["B", "C"], ["C", "D"], ["D", "A"]],
      auxSegments: [["A", "C"], ["B", "D"]],
      rightAngles: [["D", "A", "B"], ["A", "O", "B"]],
      labels: { A: "top-left", B: "top-right", C: "bottom-right", D: "bottom-left", O: "top" }
    },
    learningGoals: ["Đặc điểm hình vuông", "Hai đường chéo vuông góc"],
    sampleExercise: "Tính góc AOB.",
    keywords: ["hình vuông", "đường chéo cắt nhau", "ở o", "square"]
  },
  {
    id: "parallelogram",
    name: "13. Hình bình hành",
    grade: "8",
    topic: "Tứ giác - Hình bình hành",
    type: "polygon",
    description: "Vẽ hình bình hành ABCD có AB = 5 cm, BC = 3 cm.",
    defaultData: {
      shapeType: "parallelogram",
      points: { A: { x: 1.5, y: 3 }, B: { x: 5.5, y: 3 }, C: { x: 4, y: 0 }, D: { x: 0, y: 0 } },
      segments: [["A", "B"], ["B", "C"], ["C", "D"], ["D", "A"]],
      labels: { A: "top-left", B: "top-right", C: "bottom-right", D: "bottom-left" }
    },
    learningGoals: ["Tính chất cạnh đối diện", "Góc đối diện bằng nhau"],
    sampleExercise: "Chứng minh AB song song CD và AB = CD.",
    keywords: ["hình bình hành", "bình hành", "parallelogram"]
  },
  {
    id: "rhombus",
    name: "14. Hình thoi",
    grade: "8",
    topic: "Tứ giác - Hình thoi",
    type: "polygon",
    description: "Vẽ hình thoi ABCD có hai đường chéo cắt nhau tại O.",
    defaultData: {
      shapeType: "rhombus",
      points: { A: { x: 2, y: 3.5 }, B: { x: 4, y: 1.75 }, C: { x: 2, y: 0 }, D: { x: 0, y: 1.75 }, O: { x: 2, y: 1.75 } },
      segments: [["A", "B"], ["B", "C"], ["C", "D"], ["D", "A"]],
      auxSegments: [["A", "C"], ["B", "D"]],
      rightAngles: [["A", "O", "B"]],
      labels: { A: "top", B: "right", C: "bottom", D: "left", O: "bottom-left" }
    },
    learningGoals: ["Cạnh hình thoi bằng nhau", "Đường chéo vuông góc"],
    sampleExercise: "Chứng minh tam giác AOB vuông.",
    keywords: ["hình thoi", "thoi", "rhombus"]
  },
  {
    id: "trapezoid",
    name: "15. Hình thang",
    grade: "8",
    topic: "Tứ giác - Hình thang",
    type: "polygon",
    description: "Vẽ hình thang ABCD có đáy AB song song CD.",
    defaultData: {
      shapeType: "trapezoid",
      points: { A: { x: 1.5, y: 3 }, B: { x: 3.5, y: 3 }, C: { x: 5, y: 0 }, D: { x: 0, y: 0 } },
      segments: [["A", "B"], ["B", "C"], ["C", "D"], ["D", "A"]],
      labels: { A: "top-left", B: "top-right", C: "bottom-right", D: "bottom-left" }
    },
    learningGoals: ["Định nghĩa hình thang", "Cạnh đáy song song"],
    sampleExercise: "Tính góc D và C biết góc A = 120 độ và góc B = 110 độ.",
    keywords: ["hình thang", "thang", "trapezoid"]
  },
  {
    id: "isosceles_trapezoid",
    name: "16. Hình thang cân",
    grade: "8",
    topic: "Tứ giác - Hình thang cân",
    type: "polygon",
    description: "Vẽ hình thang cân ABCD (AB song song CD) có AD = BC.",
    defaultData: {
      shapeType: "isosceles_trapezoid",
      points: { A: { x: 1.2, y: 3 }, B: { x: 2.8, y: 3 }, C: { x: 4, y: 0 }, D: { x: 0, y: 0 } },
      segments: [["A", "B"], ["B", "C"], ["C", "D"], ["D", "A"]],
      equalSegments: [["A", "D"], ["B", "C"]],
      labels: { A: "top-left", B: "top-right", C: "bottom-right", D: "bottom-left" }
    },
    learningGoals: ["Góc kề một đáy bằng nhau", "Đường chéo bằng nhau"],
    sampleExercise: "Chứng minh góc ADC bằng góc BCD.",
    keywords: ["hình thang cân", "thang cân", "isosceles trapezoid"]
  },
  {
    id: "triangle_midsegment",
    name: "17. Đường trung bình của tam giác",
    grade: "8",
    topic: "Đường trung bình của tam giác",
    type: "triangle",
    description: "Vẽ tam giác ABC, gọi M, N lần lượt là trung điểm của AB và AC.",
    defaultData: {
      shapeType: "triangle_midsegment",
      points: { A: { x: 2, y: 4 }, B: { x: 0, y: 0 }, C: { x: 5, y: 0 }, M: { x: 1, y: 2 }, N: { x: 3.5, y: 2 } },
      segments: [["A", "B"], ["B", "C"], ["C", "A"], ["M", "N"]],
      labels: { A: "top", B: "bottom-left", C: "bottom-right", M: "left", N: "right" }
    },
    learningGoals: ["Tính chất song song và bằng 1/2 cạnh đáy", "Ứng dụng đường trung bình"],
    sampleExercise: "Chứng minh MN // BC và MN = BC / 2.",
    keywords: ["đường trung bình", "trung bình", "m, n là trung điểm", "trung điểm"]
  },
  {
    id: "thales_theorem",
    name: "18. Định lý Thalès trong tam giác",
    grade: "8",
    topic: "Định lí Thalès trong tam giác",
    type: "triangle",
    description: "Vẽ tam giác ABC, đường thẳng song song BC cắt AB, AC tại B', C'.",
    defaultData: {
      shapeType: "thales_theorem",
      points: { A: { x: 2, y: 4 }, B: { x: 0, y: 0 }, C: { x: 5, y: 0 }, B_prime: { x: 0.67, y: 1.33 }, C_prime: { x: 4.0, y: 1.33 } },
      segments: [["A", "B"], ["B", "C"], ["C", "A"], ["B_prime", "C_prime"]],
      labels: { A: "top", B: "bottom-left", C: "bottom-right", B_prime: "left", C_prime: "right" }
    },
    learningGoals: ["Vận dụng hệ quả Thalès", "Lập tỉ lệ thức cạnh tương ứng"],
    sampleExercise: "Cho AB' = 2, B'B = 4, AC' = 3. Tính C'C.",
    keywords: ["thalès", "thales", "định lí thalès", "tỉ lệ thức"]
  },
  {
    id: "similar_triangles",
    name: "19. Hai tam giác đồng dạng",
    grade: "8",
    topic: "Hai tam giác đồng dạng",
    type: "polygon",
    description: "Vẽ tam giác ABC đồng dạng với tam giác A'B'C' theo tỉ số k = 1.5.",
    defaultData: {
      shapeType: "similar_triangles",
      points: { A: { x: 1, y: 3 }, B: { x: 0, y: 0 }, C: { x: 3, y: 0 }, A_prime: { x: 5.5, y: 2 }, B_prime: { x: 4.8, y: 0 }, C_prime: { x: 6.8, y: 0 } },
      segments: [["A", "B"], ["B", "C"], ["C", "A"], ["A_prime", "B_prime"], ["B_prime", "C_prime"], ["C_prime", "A_prime"]],
      labels: { A: "top", B: "bottom-left", C: "bottom-right", A_prime: "top", B_prime: "bottom-left", C_prime: "bottom-right" }
    },
    learningGoals: ["Tỉ số đồng dạng", "Góc tương ứng bằng nhau"],
    sampleExercise: "Tính độ dài các cạnh A'B' và B'C' theo tỉ lệ k.",
    keywords: ["đồng dạng", "tỉ số đồng dạng", "k = 1.5", "similar"]
  },
  {
    id: "circle_basic",
    name: "20. Đường tròn tâm O bán kính R",
    grade: "9",
    topic: "Đường tròn - Sự xác định đường tròn",
    type: "circle",
    description: "Vẽ đường tròn tâm O, bán kính R = 3 cm.",
    defaultData: {
      shapeType: "circle_basic",
      points: { O: { x: 0, y: 0 }, A: { x: 2.5, y: 0 } },
      segments: [["O", "A"]],
      circles: [{ center: "O", point: "A", r: 2.5 }],
      labels: { O: "bottom-left", A: "right" }
    },
    learningGoals: ["Định nghĩa đường tròn", "Điểm nằm trong và ngoài đường tròn"],
    sampleExercise: "Cho OM = 4. Hãy so sánh vị trí M với đường tròn (O; 3) cm.",
    keywords: ["đường tròn", "tâm o", "bán kính", "circle"]
  },
  {
    id: "circle_tangent",
    name: "21. Đường tròn có tiếp tuyến",
    grade: "9",
    topic: "Tiếp tuyến của đường tròn",
    type: "circle",
    description: "Vẽ đường tròn tâm O. Từ điểm A trên đường tròn vẽ tiếp tuyến d vuông góc OA.",
    defaultData: {
      shapeType: "circle_tangent",
      points: { O: { x: 0, y: 0 }, A: { x: 2.5, y: 0 }, T_start: { x: 2.5, y: -2.5 }, T_end: { x: 2.5, y: 2.5 } },
      segments: [["O", "A"], ["T_start", "T_end"]],
      circles: [{ center: "O", point: "A", r: 2.5 }],
      rightAngles: [["O", "A", "T_end"]],
      labels: { O: "bottom-left", A: "left" }
    },
    learningGoals: ["Tính chất tiếp tuyến", "Khoảng cách từ tâm đến tiếp tuyến bằng R"],
    sampleExercise: "Chứng minh bán kính OA vuông góc với tiếp tuyến d tại tiếp điểm A.",
    keywords: ["tiếp tuyến", "đường tròn tiếp tuyến", "tiếp điểm"]
  },
  {
    id: "inscribed_angle",
    name: "22. Góc nội tiếp đường tròn",
    grade: "9",
    topic: "Góc với đường tròn - Góc nội tiếp",
    type: "circle",
    description: "Vẽ đường tròn tâm O và góc nội tiếp BAC.",
    defaultData: {
      shapeType: "inscribed_angle",
      points: { O: { x: 0, y: 0 }, A: { x: 0, y: 2.5 }, B: { x: -2.16, y: -1.25 }, C: { x: 2.16, y: -1.25 } },
      segments: [["A", "B"], ["A", "C"]],
      circles: [{ center: "O", point: "A", r: 2.5 }],
      labels: { O: "bottom-left", A: "top", B: "bottom-left", C: "bottom-right" }
    },
    learningGoals: ["Góc nội tiếp chắn nửa đường tròn", "Mối quan hệ góc nội tiếp và góc ở tâm"],
    sampleExercise: "Nếu số đo cung BC là 60 độ. Tìm số đo góc BAC.",
    keywords: ["góc nội tiếp", "bac", "nội tiếp đường tròn"]
  },
  {
    id: "triangle_inscribed",
    name: "23. Tam giác nội tiếp đường tròn",
    grade: "9",
    topic: "Đường tròn nội tiếp - Ngoại tiếp đa giác",
    type: "circle",
    description: "Vẽ tam giác đều ABC nội tiếp đường tròn tâm O.",
    defaultData: {
      shapeType: "triangle_inscribed",
      points: { O: { x: 0, y: 0 }, A: { x: 0, y: 2.5 }, B: { x: -2.16, y: -1.25 }, C: { x: 2.16, y: -1.25 } },
      segments: [["A", "B"], ["B", "C"], ["C", "A"]],
      circles: [{ center: "O", point: "A", r: 2.5 }],
      labels: { O: "bottom-left", A: "top", B: "bottom-left", C: "bottom-right" }
    },
    learningGoals: ["Tâm đường tròn ngoại tiếp tam giác", "Khoảng cách từ tâm đến các đỉnh"],
    sampleExercise: "Tính các góc của tam giác ABC.",
    keywords: ["tam giác nội tiếp", "nội tiếp", "ngoại tiếp"]
  },
  {
    id: "oxy_coordinate",
    name: "24. Hệ trục tọa độ Oxy",
    grade: "9",
    topic: "Hệ tọa độ - Hàm số bậc nhất và bậc hai",
    type: "coordinate",
    description: "Vẽ hệ trục tọa độ Oxy với hai điểm A(2; 3) và B(-3; 1).",
    defaultData: {
      shapeType: "oxy_coordinate",
      points: { O: { x: 0, y: 0 }, A: { x: 2, y: 3 }, B: { x: -3, y: 1 } },
      segments: [],
      labels: { O: "bottom-left", A: "top-right", B: "top-left" }
    },
    learningGoals: ["Cách biểu diễn điểm trên Oxy", "Vẽ đồ thị hàm số"],
    sampleExercise: "Xác định tọa độ của điểm trung điểm M của đoạn AB.",
    keywords: ["tọa độ", "oxy", "hệ trục", "trục tọa độ"]
  },
  {
    id: "rectangular_prism",
    name: "25. Hình hộp chữ nhật (3D)",
    grade: "8",
    topic: "Hình học không gian - Hình hộp chữ nhật",
    type: "3d",
    description: "Vẽ hình hộp chữ nhật ABCD.A'B'C'D'.",
    defaultData: {
      shapeType: "rectangular_prism",
      points: {
        D: { x: 0, y: 0, z: 0 }, C: { x: 4, y: 0, z: 0 }, B: { x: 4, y: 3, z: 0 }, A: { x: 0, y: 3, z: 0 },
        D_prime: { x: 1.5, y: 1.2, z: 3.5 }, C_prime: { x: 5.5, y: 1.2, z: 3.5 }, B_prime: { x: 5.5, y: 4.2, z: 3.5 }, A_prime: { x: 1.5, y: 4.2, z: 3.5 }
      },
      edges3d: [
        { from: "D", to: "C", dashed: false }, { from: "C", to: "B", dashed: false }, { from: "B", to: "A", dashed: false }, { from: "A", to: "D", dashed: true },
        { from: "D_prime", to: "C_prime", dashed: false }, { from: "C_prime", to: "B_prime", dashed: false }, { from: "B_prime", to: "A_prime", dashed: false }, { from: "A_prime", to: "D_prime", dashed: false },
        { from: "D", to: "D_prime", dashed: true }, { from: "C", to: "C_prime", dashed: false }, { from: "B", to: "B_prime", dashed: false }, { from: "A", to: "A_prime", dashed: true }
      ],
      labels: { D: "bottom-left", C: "bottom-right", B: "top-right", A: "top-left", D_prime: "left", C_prime: "right", B_prime: "top", A_prime: "top" }
    },
    learningGoals: ["Phối cảnh không gian 3D", "Cạnh khuất, cạnh nhìn thấy"],
    sampleExercise: "Tính thể tích hình hộp chữ nhật có ba kích thước: 4 cm, 3 cm, 5 cm.",
    keywords: ["hình hộp chữ nhật", "hộp chữ nhật", "3d", "không gian", "prism"]
  },
  {
    id: "cube",
    name: "26. Hình lập phương (3D)",
    grade: "8",
    topic: "Hình học không gian - Hình lập phương",
    type: "3d",
    description: "Vẽ hình lập phương ABCD.A'B'C'D' cạnh bằng 3 cm.",
    defaultData: {
      shapeType: "cube",
      points: {
        D: { x: 0, y: 0, z: 0 }, C: { x: 3, y: 0, z: 0 }, B: { x: 3, y: 3, z: 0 }, A: { x: 0, y: 3, z: 0 },
        D_prime: { x: 1.2, y: 1.2, z: 3 }, C_prime: { x: 4.2, y: 1.2, z: 3 }, B_prime: { x: 4.2, y: 4.2, z: 3 }, A_prime: { x: 1.2, y: 4.2, z: 3 }
      },
      edges3d: [
        { from: "D", to: "C", dashed: false }, { from: "C", to: "B", dashed: false }, { from: "B", to: "A", dashed: false }, { from: "A", to: "D", dashed: true },
        { from: "D_prime", to: "C_prime", dashed: false }, { from: "C_prime", to: "B_prime", dashed: false }, { from: "B_prime", to: "A_prime", dashed: false }, { from: "A_prime", to: "D_prime", dashed: false },
        { from: "D", to: "D_prime", dashed: true }, { from: "C", to: "C_prime", dashed: false }, { from: "B", to: "B_prime", dashed: false }, { from: "A", to: "A_prime", dashed: true }
      ],
      labels: { D: "bottom-left", C: "bottom-right", B: "top-right", A: "top-left", D_prime: "left", C_prime: "right", B_prime: "top", A_prime: "top" }
    },
    learningGoals: ["Diện tích xung quanh hình lập phương", "Tính chất góc các mặt bên"],
    sampleExercise: "Tính diện tích toàn phần hình lập phương cạnh 3 cm.",
    keywords: ["hình lập phương", "lập phương", "cube"]
  },
  {
    id: "triangular_pyramid",
    name: "27. Hình chóp tam giác đều (3D)",
    grade: "8",
    topic: "Hình học không gian - Hình chóp tam giác đều",
    type: "3d",
    description: "Vẽ hình chóp tam giác đều S.ABC, đáy ABC là tam giác đều.",
    defaultData: {
      shapeType: "triangular_pyramid",
      points: {
        A: { x: 0, y: 0, z: 0 }, B: { x: 4, y: -0.5, z: 0 }, C: { x: 1.5, y: -1.2, z: 0 },
        O: { x: 1.83, y: -0.57, z: 0 }, S: { x: 1.83, y: -0.57, z: 4 }
      },
      edges3d: [
        { from: "A", to: "B", dashed: false }, { from: "B", to: "C", dashed: false }, { from: "C", to: "A", dashed: true },
        { from: "S", to: "A", dashed: false }, { from: "S", to: "B", dashed: false }, { from: "S", to: "C", dashed: false },
        { from: "S", to: "O", dashed: true }
      ],
      labels: { A: "left", B: "right", C: "bottom", O: "bottom-left", S: "top" }
    },
    learningGoals: ["Đáy tam giác đều", "Chiều cao SO", "Tính thể tích hình chóp"],
    sampleExercise: "Tính thể tích hình chóp tam giác đều có diện tích đáy 10 cm vuông, chiều cao 6 cm.",
    keywords: ["hình chóp tam giác đều", "chóp tam giác", "s.abc"]
  },
  {
    id: "quadrangular_pyramid",
    name: "28. Hình chóp tứ giác đều (3D)",
    grade: "8",
    topic: "Hình học không gian - Hình chóp tứ giác đều",
    type: "3d",
    description: "Vẽ hình chóp tứ giác đều S.ABCD, đáy ABCD là hình vuông.",
    defaultData: {
      shapeType: "quadrangular_pyramid",
      points: {
        D: { x: 0, y: 0, z: 0 }, C: { x: 4, y: 0, z: 0 }, B: { x: 5, y: 1.5, z: 0 }, A: { x: 1, y: 1.5, z: 0 },
        O: { x: 2.5, y: 0.75, z: 0 }, S: { x: 2.5, y: 0.75, z: 4 }
      },
      edges3d: [
        { from: "D", to: "C", dashed: false }, { from: "C", to: "B", dashed: false }, { from: "B", to: "A", dashed: true }, { from: "A", to: "D", dashed: true },
        { from: "S", to: "D", dashed: false }, { from: "S", to: "C", dashed: false }, { from: "S", to: "B", dashed: false }, { from: "S", to: "A", dashed: true },
        { from: "S", to: "O", dashed: true }, { from: "A", to: "C", dashed: true }, { from: "B", to: "D", dashed: true }
      ],
      labels: { D: "bottom-left", C: "bottom-right", B: "right", A: "top-left", O: "bottom", S: "top" }
    },
    learningGoals: ["Hình chóp tứ giác đều phối cảnh", "Độ dài đường cao SO"],
    sampleExercise: "Tính thể tích hình chóp S.ABCD biết cạnh đáy bằng 4 cm, chiều cao SO = 6 cm.",
    keywords: ["hình chóp tứ giác đều", "chóp tứ giác", "s.abcd"]
  }
];
