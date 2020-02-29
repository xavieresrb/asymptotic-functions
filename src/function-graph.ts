import { Vector3, Color4 } from '@babylonjs/core/Maths/math';
import { Graph, Segment } from './types';
import FunctionSegment from './function-segment';


export default class FunctionGraph implements Graph {
  segments: Segment[];

  current: Segment;

  asymptotes: Vector3[];

  constructor() {
    this.segments = [];
    this.asymptotes = [];
    this.startSegment();
  }

  startSegment(): void {
    this.current = new FunctionSegment();
    this.segments.push(this.current);
  }

  add(point: Vector3, color: Color4): void {
    this.current.add(point, color);
  }

  addAsymptote(asymptote: Vector3): void {
    this.asymptotes.push(asymptote);
  }
}
