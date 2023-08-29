import * as Cesium from 'cesium';
import { DirectionalLightParamsInterface } from './index';
import { directionalLightTableInterface } from './_db';

const defaultParams: any = {
  direction: {},
  color: [255, 255, 255, 1],
  intensity: 2,
};

export const setParams = async (
  light: Cesium.DirectionalLight,
  directionalLightTable: directionalLightTableInterface,
): Promise<DirectionalLightParamsInterface> => {
  let lightDirection = light.direction;
  let defaultDirectionCartographic = Cesium.Cartographic.fromCartesian(
    lightDirection,
    Cesium.Ellipsoid.WGS84,
  );
  let longitude = Cesium.Math.toDegrees(defaultDirectionCartographic.longitude);
  let latitude = Cesium.Math.toDegrees(defaultDirectionCartographic.latitude);
  let height = defaultDirectionCartographic.height;
  let defaultDirection = {
    longitude: longitude,
    latitude: latitude,
    height: height || 0,
  };
  defaultParams.direction = defaultDirection;

  let res = await directionalLightTable.toArray();
  let latestResValue = res[res.length - 1];
  return latestResValue || defaultParams;
};
