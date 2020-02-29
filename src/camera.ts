import { Vector3 } from '@babylonjs/core/Maths/math';
import { ArcRotateCamera } from '@babylonjs/core/Cameras/arcRotateCamera';
import { Camera } from '@babylonjs/core/Cameras/camera';

export default function configureCamera(scene, canvas): Camera {
  const camera = new ArcRotateCamera('Camera', 0, 0, 0, new Vector3(0, 0, 0), scene);

  // target the camera to scene origin
  camera.setTarget(new Vector3(0, 0, 0));

  // attach the camera to the canvas
  camera.attachControl(canvas, true);

  // with this we get zoom but no camera panning
  camera.inputs.remove(camera.inputs.attached.pointers);
  camera.inputs.remove(camera.inputs.attached.keyboard);

  camera.position = new Vector3(0, 0, -180);

  return camera;
}
