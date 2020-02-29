import { Scene } from '@babylonjs/core/scene';
import { Mesh } from '@babylonjs/core/Meshes/mesh';
import { Vector3, Color3 } from '@babylonjs/core/Maths/math';
import { StandardMaterial } from '@babylonjs/core/Materials/standardMaterial';
import { DynamicTexture } from '@babylonjs/core';
import { Axis } from './types';

function makeTextPlane(scene, root, text, color, size): Mesh {
  const dynamicTexture = new DynamicTexture('DynamicTexture', 50, scene, true);
  dynamicTexture.hasAlpha = true;
  dynamicTexture.drawText(text, 5, 40, 'bold 36px Arial', color, 'transparent', true);

  const plane = Mesh.CreatePlane('TextPlane', size, scene, true);
  const material = new StandardMaterial('TextPlaneMaterial', scene);
  plane.material = material;
  material.backFaceCulling = false;
  material.specularColor = new Color3(0, 0, 0);
  material.diffuseTexture = dynamicTexture;
  plane.parent = root;
  return plane;
}

export default class Axis2d implements Axis {
  scene: Scene;

  root: Mesh;

  size: number;

  constructor(scene: Scene, root: Mesh, size: number) {
    this.scene = scene;
    this.root = root;
    this.size = size;

    this.build();
  }

  build(): void {
    const axisX = Mesh.CreateLines(
      'axisX',
      [
        Vector3.Zero(),
        new Vector3(this.size, 0, 0),
        new Vector3(this.size * 0.95, 0.05 * this.size, 0),
        new Vector3(this.size, 0, 0),
        new Vector3(this.size * 0.95, -0.05 * this.size, 0)
      ],
      this.scene
    );
    axisX.color = new Color3(1, 0, 0);
    axisX.parent = this.root;
    const xChar = makeTextPlane(this.scene, this.root, 'X', 'red', this.size / 10);
    xChar.position = new Vector3(0.9 * this.size, -0.05 * this.size, 0);
    const axisY = Mesh.CreateLines(
      'axisY',
      [
        Vector3.Zero(),
        new Vector3(0, this.size, 0),
        new Vector3(-0.05 * this.size, this.size * 0.95, 0),
        new Vector3(0, this.size, 0),
        new Vector3(0.05 * this.size, this.size * 0.95, 0)
      ],
      this.scene
    );
    axisY.color = new Color3(0, 1, 0);
    axisY.parent = this.root;
    const yChar = makeTextPlane(this.scene, this.root, 'Y', 'green', this.size / 10);
    yChar.position = new Vector3(0, 0.9 * this.size, -0.05 * this.size);
  }
}
