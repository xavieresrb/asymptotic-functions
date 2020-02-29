
import { Vector3, Color4 } from '@babylonjs/core';
import { Graph } from './types';
import FunctionGraph from './function-graph';

const YELLOW = new Color4(1, 1, 0.5, 1);
const DERIVATIVE_FOR_INFINITY = 1e+20;
const INFINITESIMAL_INCREASE = 1e-15;

export default class GraphGenerator {
  private funct;

  private functionGraph: FunctionGraph;

  private min: number;

  private max: number;

  // Precision is the number of points to generate a graph in an interval of size 1.
  // With a precision value of 10, between x = 0 and x = 1, we will have 10 calculations.
  private precision: number;

  private increase: number;

  private color: Color4;

  constructor(funct: Function, min: number, max: number, precision = 10) {
    this.funct = funct;
    this.min = min;
    this.max = max;
    this.precision = precision;
    this.functionGraph = new FunctionGraph();
    this.validate();
    this.increase = 1 / precision;
    this.color = YELLOW;
  }

  private validate(): void{
    if (!this.funct || !(this.funct instanceof Function)) {
      throw new Error('parameter funct must be a function');
    }
    if (this.precision < 1) {
      throw new Error('precision must be greater or equal than 1');
    }
  }

  private derivative(x: number): number {
    const a = x + INFINITESIMAL_INCREASE;

    return (this.funct(x) - this.funct(a)) / (x - a);
  }

  private isAsymptote(x: number): boolean {
    const d = this.derivative(x);
    return Math.abs(d) > DERIVATIVE_FOR_INFINITY;
  }

  // 1.- add an asymptotic infinity value for the left using x - (increase/100) as the
  // last point of current segment.
  // 3.- add an asymptote and start a new segment using x
  // 2.- add an asymptotic infinity value for the right using x + (increase/100)
  // as the first point of the new segment
  private manageAsymptote(x: number): void {
    const leftX = x - (this.increase / 100);
    const rigthX = x + (this.increase / 100);
    this.functionGraph.add(new Vector3(leftX, this.funct(leftX), 0), this.color);
    this.functionGraph.addAsymptote(new Vector3(x, 0, 0));
    this.functionGraph.startSegment();
    this.functionGraph.add(new Vector3(rigthX, this.funct(rigthX), 0), this.color);
  }

  generateGraph(): Graph {
    let x = this.min;

    while (x < this.max) {
      if (this.isAsymptote(x)) {
        this.manageAsymptote(x);
      } else {
        this.functionGraph.add(new Vector3(x, this.funct(x), 0), this.color);
      }
      x += this.increase;
    }
    return this.functionGraph;
  }
}
