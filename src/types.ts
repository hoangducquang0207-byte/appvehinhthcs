/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Point2D {
  x: number;
  y: number;
  z?: number; // Optional for 3D oblique representation
}

export interface Point3D {
  x: number;
  y: number;
  z: number;
}

export interface CircleDefinition {
  center: string;
  point: string;
  r: number;
}

export interface Edge3D {
  from: string;
  to: string;
  dashed: boolean;
}

export interface TextAnnotation {
  id: string;
  text: string;
  x: number;
  y: number;
  fontSize?: number;
  color?: string;
  bold?: boolean;
  italic?: boolean;
}

export interface ShapeData {
  shapeType: string;
  points: Record<string, Point2D | Point3D>;
  segments?: [string, string][];
  auxSegments?: [string, string][];
  rightAngles?: [string, string, string][]; // e.g. ["B", "A", "C"] means angle BAC is 90 deg
  equalSegments?: [string, string][];
  circles?: CircleDefinition[];
  edges3d?: Edge3D[];
  labels?: Record<string, string>; // Point label position instructions: "top", "bottom-left", etc.
  fixedPoints?: string[]; // List of point names that are fixed (cannot be dragged, stable)
  texts?: TextAnnotation[];
}

export interface GeometryTemplate {
  id: string;
  name: string;
  grade: string;
  topic: string;
  type: "triangle" | "polygon" | "angle" | "circle" | "coordinate" | "3d" | "lines";
  description: string;
  defaultData: ShapeData;
  learningGoals: string[];
  sampleExercise: string;
  keywords?: string[];
}

export interface SavedFigure {
  id: string;
  name: string;
  description: string;
  data: ShapeData;
  grade: string;
  savedAt: string;
}

export interface AppOptions {
  showLabels: boolean;
  showLengths: boolean;
  showRightAngles: boolean;
  showAuxLines: boolean;
  showHiddenLines: boolean;
  showCoordinates: boolean;
  colorMode: "bw" | "color";
  enableAudio?: boolean;
  audioVolume?: number;
}
