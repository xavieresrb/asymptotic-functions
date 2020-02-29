import { Scene } from '@babylonjs/core/scene';
import { Mesh } from '@babylonjs/core/Meshes/mesh';
import { Vector3, Color4 } from '@babylonjs/core/Maths/math';

export interface Axis {
  scene: Scene;
  root: Mesh;
  size: number;
}

export interface Segment {
  points: Vector3[];
  colors: Color4[];
  add(point: Vector3, color: Color4): void;
}

export interface Graph {
  segments: Segment[];
  asymptotes: Vector3[];
}
