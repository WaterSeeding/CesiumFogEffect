import * as Cesium from 'cesium'
import { CameraParamsInterface } from './index';
import { cameraTableInterface } from './_db';

const defaultParams = {
  direction: {
    height: -6373460.407714644,
    longitude: -76.0446209963375,
    latitude: -27.977613191730875,
  },
  position: {
    height: 26887007.08254164,
    longitude: 103.95537900366243,
    latitude: 27.66741874243775,
  },
  headingPitchRoll: {
    heading: 360,
    pitch: -89.97713228469502,
    roll: 0,
  },
};

export const setParams = async (
  camera: Cesium.Camera,
  cameraTable: cameraTableInterface,
): Promise<CameraParamsInterface> => {
  let res = await cameraTable.toArray();
  let latestResValue = res[res.length - 1];
  return latestResValue || defaultParams;
};
