import * as Cesium from 'cesium';
import { directionalLightTable } from './_db';
import { setGui } from './_gui';
import { setParams } from './_params';

export interface DirectionalLightParamsInterface {
  direction: {
    longitude: number;
    latitude: number;
    height?: number;
  };
  color: number[];
  intensity: number;
}

class DirectionalLight {
  viewer: Cesium.Viewer;
  light: Cesium.DirectionalLight;
  lightInitParams!: DirectionalLightParamsInterface;

  constructor(
    viewer: Cesium.Viewer,
    gui: dat.GUI,
    directionalLightParams?: DirectionalLightParamsInterface,
    hideGui?: boolean,
  ) {
    this.viewer = viewer;
    this.light = new Cesium.DirectionalLight({
      direction: viewer.scene.camera.directionWC,
    });
    this.viewer.scene.light = this.light;
    this.viewer.scene.globe.dynamicAtmosphereLighting = true;
    this.viewer.scene.globe.dynamicAtmosphereLightingFromSun = false;

    setParams(this.light, directionalLightTable).then(
      (lightParams: DirectionalLightParamsInterface) => {
        if (directionalLightParams) {
          if (!directionalLightParams.direction?.height) {
            directionalLightParams.direction!.height =
              lightParams.direction?.height;
          }
          this.lightInitParams = directionalLightParams;
        } else {
          this.lightInitParams = lightParams;
        }
        let lightGui = setGui(
          gui,
          this.lightInitParams,
          this.light,
          (data: DirectionalLightParamsInterface) => {
            directionalLightTable.add(data);
          },
        );
        if (hideGui) {
          lightGui.hide();
        }
      },
    );
  }
}

export default DirectionalLight;
