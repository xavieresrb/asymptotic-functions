import { Curve3 } from '@babylonjs/core/Maths/math';
import { Mesh } from '@babylonjs/core/Meshes/mesh';
import { MeshBuilder } from '@babylonjs/core/Meshes/meshBuilder';
import { Scene } from '@babylonjs/core/scene';
import { Graph } from './types';

export default class CurveGenerator {
  scene: Scene;

  root: Mesh;

  graph: Graph;

  constructor(scene: Scene, root: Mesh, graph: Graph) {
    this.scene = scene;
    this.graph = graph;
    this.root = root;

    this.generate();
  }


  private generate(): void {
    this.graph.segments.forEach((segment) => {
      const curve = new Curve3(segment.points);
      const mesh = MeshBuilder.CreateLines('closed', { points: curve.getPoints(), colors: segment.colors });
      mesh.parent = this.root;
    });
  }
}
