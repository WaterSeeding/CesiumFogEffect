import * as dat from 'dat.gui';
import * as Cesium from 'cesium'
import { getPosition } from './utils/getPosition';
import { cameraTable } from './_db';
import { setGui } from './_gui';
import { setParams } from './_params';

export interface CameraParamsInterface {
  // degrees
  direction?: {
    longitude?: number;
    latitude?: number;
    height?: number;
  };
  // degrees
  position?: {
    longitude?: number;
    latitude?: number;
    height?: number;
  };
  // degrees
  headingPitchRoll?: {
    heading?: number;
    pitch?: number;
    roll?: number;
  };
}

export default class Camera {
  viewer: Cesium.Viewer;
  camera: Cesium.Camera;
  cameraParams: CameraParamsInterface | undefined;
  constructor(
    viewer: Cesium.Viewer,
    gui: dat.GUI,
    cameraParams?: CameraParamsInterface,
    hideGui?: boolean,
  ) {
    this.viewer = viewer;
    this.camera = viewer.scene.camera;
    this.setInit(gui, cameraParams, hideGui);
  }

  setInit(
    gui: dat.GUI,
    cameraParams?: CameraParamsInterface,
    hideGui?: boolean,
  ) {
    setParams(this.camera, cameraTable).then(
      (storeCameraParams: CameraParamsInterface) => {
        this.cameraParams = cameraParams || storeCameraParams;
        this.setView(this.cameraParams);
        let cameraGui = setGui(
          gui,
          this.cameraParams,
          this,
          (data: CameraParamsInterface) => {
            cameraTable.add(data);
          },
        );
        if (hideGui) {
          cameraGui.hide();
        }
      },
    );
  }

  setFly(cameraParams: CameraParamsInterface, completeCb: () => void) {
    this.camera.flyTo({
      destination: Cesium.Cartesian3.fromDegrees(
        cameraParams.position!.longitude,
        cameraParams.position!.latitude,
        cameraParams.position!.height,
        Cesium.Ellipsoid.WGS84,
      ),
      orientation: {
        heading: Cesium.Math.toRadians(cameraParams.headingPitchRoll!.heading),
        pitch: Cesium.Math.toRadians(cameraParams.headingPitchRoll!.pitch),
        roll: Cesium.Math.toRadians(cameraParams.headingPitchRoll!.roll),
      },
      complete: () => {
        completeCb?.();
      },
    });
  }

  setFlyBoundingSphere(
    boundingSphere: Cesium.BoundingSphere,
    cameraParams: CameraParamsInterface,
    completeCb: () => void,
  ) {
    this.camera.flyToBoundingSphere(boundingSphere, {
      duration: 1.5,
      offset: new Cesium.HeadingPitchRange(
        cameraParams.headingPitchRoll!.heading,
        cameraParams.headingPitchRoll!.pitch,
        cameraParams.position!.height,
      ),
      complete: () => {
        completeCb?.();
      },
    });
  }

  setView(cameraParams: CameraParamsInterface) {
    this.camera.setView({
      destination: Cesium.Cartesian3.fromDegrees(
        cameraParams.position!.longitude,
        cameraParams.position!.latitude,
        cameraParams.position!.height,
        Cesium.Ellipsoid.WGS84,
      ),
      orientation: {
        heading: Cesium.Math.toRadians(cameraParams.headingPitchRoll!.heading),
        pitch: Cesium.Math.toRadians(cameraParams.headingPitchRoll!.pitch),
        roll: Cesium.Math.toRadians(cameraParams.headingPitchRoll!.roll),
      },
    });
  }

  getInfo() {
    let head = this.camera.heading;
    let pitch = this.camera.pitch;
    let roll = this.camera.roll;
    let headingPitchRoll = {
      heading: Cesium.Math.toDegrees(head),
      pitch: Cesium.Math.toDegrees(pitch),
      roll: Cesium.Math.toDegrees(roll),
    };
    let position = getPosition(this.camera.position);
    let direction = getPosition(this.camera.direction);
    return {
      position: position,
      direction: direction,
      headingPitchRoll: headingPitchRoll,
    };
  }
}
