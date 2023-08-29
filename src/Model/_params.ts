import * as Cesium from 'cesium';
import { ModelParamsInterface } from './index';
import { modelTableInterface } from './_db';

const defaultParams: ModelParamsInterface = {
  show: true,
  scale: 1.0,
  maximumScale: 256,
  minimumPixelSize: 0.0,
  incrementallyLoadTextures: false,
  runAnimations: true,
  clampAnimations: true,
  shadows: Cesium.ShadowMode.ENABLED,
  silhouetteSize: 0.0,
  silhouetteColor: '#0000ff',
  color: '#ffffff',
  colorBlendMode: Cesium.ColorBlendMode.HIGHLIGHT,
  colorBlendAmount: 0.5,
};

export const setParams = async (
  model: Cesium.Viewer,
  modelTable: modelTableInterface,
): Promise<ModelParamsInterface> => {
  let res = await modelTable.toArray();
  let latestResValue = res[res.length - 1];
  return latestResValue || defaultParams;
};
