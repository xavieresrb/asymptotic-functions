import { Vector3, Color4 } from '@babylonjs/core/Maths/math';
import { Segment } from './types';

export default class FunctionSegment implements Segment {
  points: Vector3[];

  colors: Color4[];

  constructor(points: Vector3[] = [], colors: Color4[] = []) {
    this.points = points;
    this.colors = colors;
  }

  addPoint(point: Vector3): void {
    this.points.push(point);
  }

  addColor(color: Color4): void {
    this.colors.push(color);
  }

  add(point: Vector3, color: Color4): void{
    this.addPoint(point);
    this.addColor(color);
  }
}
