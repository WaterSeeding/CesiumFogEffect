import * as Cesium from 'cesium';
import { modelTable } from './_db';
import { setGui } from './_gui';
import { setParams } from './_params';

export interface ModelParamsInterface {
  show: boolean;
  scale: number;
  maximumScale: number;
  minimumPixelSize: number;
  incrementallyLoadTextures: boolean;
  runAnimations: boolean;
  clampAnimations: boolean;
  shadows: number;
  silhouetteSize: number;
  silhouetteColor: string;
  color: string;
  colorBlendMode: number;
  colorBlendAmount: number;
}

class Model {
  viewer: Cesium.Viewer;
  model!: Cesium.Entity;
  modelInitParams!: ModelParamsInterface;

  constructor(
    viewer: Cesium.Viewer,
    gui: dat.GUI,
    url: string,
    position: Cesium.Cartesian3,
    modelParams?: ModelParamsInterface | undefined,
    hideGui?: boolean,
  ) {
    this.viewer = viewer;
    setParams(this.viewer, modelTable).then(
      (storeModelParams: ModelParamsInterface) => {
        this.modelInitParams = modelParams || storeModelParams;
        this.model = this.init(url, this.modelInitParams, position);
        let modelGui = setGui(
          gui,
          this.modelInitParams,
          this.model,
          (modelParams: ModelParamsInterface) => {
            modelTable.add(modelParams);
          },
        );
        if (hideGui) {
          modelGui.hide();
        }
      },
    );
  }

  private init(
    url: string,
    params: ModelParamsInterface,
    position: Cesium.Cartesian3,
  ) {
    const heading = Cesium.Math.toRadians(135);
    const pitch = 0;
    const roll = 0;
    const hpr = new Cesium.HeadingPitchRoll(heading, pitch, roll);
    const orientation = Cesium.Transforms.headingPitchRollQuaternion(
      position,
      hpr,
    );
    const orientationProperty = new Cesium.ConstantProperty(orientation);

    let modelEntity = this.viewer.entities.add({
      name: 'model',
      position: position,
      orientation: orientationProperty,
      model: {
        show: params.show,
        uri: url,
        scale: params.scale,
        maximumScale: params.maximumScale,
        minimumPixelSize: params.minimumPixelSize,
        incrementallyLoadTextures: params.incrementallyLoadTextures,
        runAnimations: params.runAnimations,
        clampAnimations: params.clampAnimations,
        shadows: new Cesium.ConstantProperty(Number(params.shadows)),
        silhouetteSize: params.silhouetteSize,
        silhouetteColor: new Cesium.ConstantProperty(
          Cesium.Color.fromCssColorString(params.silhouetteColor),
        ),
        color: new Cesium.ConstantProperty(
          Cesium.Color.fromCssColorString(params.color),
        ),
        colorBlendMode: new Cesium.ConstantProperty(
          Number(params.colorBlendMode),
        ),
        colorBlendAmount: params.colorBlendAmount,
      },
    });
    return modelEntity;
  }
}

export default Model;
