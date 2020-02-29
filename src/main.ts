import { Engine } from '@babylonjs/core/Engines/engine';
import { Scene } from '@babylonjs/core/scene';
import { HemisphericLight } from '@babylonjs/core/Lights/hemisphericLight';
import { Vector3, Color3, Color4 } from '@babylonjs/core/Maths/math';
import { MeshBuilder } from '@babylonjs/core/Meshes/meshBuilder';
// This is critical due to backwards compatibility: https://doc.babylonjs.com/features/es6_support#side-effects
import '@babylonjs/core/Materials/standardMaterial';

import configureCamera from './camera';
import CurveGenerator from './curve-generator';
import Axis2d from './axis-2d';
import GraphGenerator from './graph-generator';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const canvas: any = document.getElementById('renderCanvas');

// load the 3D engine
const engine: Engine = new Engine(canvas);

// createScene function that creates and return the scene
function createScene(): Scene {
  // create a basic BJS Scene object
  const scene: Scene = new Scene(engine);

  // set the default color of the entire scene
  scene.clearColor = (new Color4(0.05, 0.05, 0.05, 1));

  // Light direction is up and left
  const light = new HemisphericLight('hemiLight', new Vector3(-1, 1, 0), scene);
  light.diffuse = new Color3(1, 1, 1);
  light.specular = new Color3(1, 1, 1);
  light.groundColor = new Color3(1, 1, 1);

  // Used to rotate the entire scene
  const root = MeshBuilder.CreateSphere('root', { segments: 0, diameter: 0.0000001 }, scene);

  root.position = new Vector3(0, 0, 0);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const axis2d = new Axis2d(scene, root, 60);

  const funct = (x: number): number => Math.exp(x) / x;

  const graphGenerator = new GraphGenerator(funct, -100, 100, 10);

  const graph = graphGenerator.generateGraph();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const curveGenerator = new CurveGenerator(scene, root, graph);

  return scene;
}

const scene = createScene();

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const camera = configureCamera(scene, canvas);

// run the render loop
engine.runRenderLoop(() => {
  scene.render();
});

// the canvas/window resize event handler
window.addEventListener('resize', () => {
  engine.resize();
});
