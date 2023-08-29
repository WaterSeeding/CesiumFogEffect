import * as Cesium from 'cesium';
import { ModelParamsInterface } from './index';
import { downloadJson } from './utils/downloadJson';
import { setGuiCheckbox } from './utils/setGuiCheckbox';
import { setGuiSlide } from './utils/setGuiSlide';

const reviseGui = (model: Cesium.Entity, guiParams: ModelParamsInterface) => {
  let modelGraphics = model.model;
  modelGraphics!.show = new Cesium.ConstantProperty(guiParams.show);
  modelGraphics!.scale = new Cesium.ConstantProperty(guiParams.scale);
  modelGraphics!.maximumScale = new Cesium.ConstantProperty(
    guiParams.maximumScale,
  );
  modelGraphics!.minimumPixelSize = new Cesium.ConstantProperty(
    guiParams.minimumPixelSize,
  );
  modelGraphics!.incrementallyLoadTextures = new Cesium.ConstantProperty(
    guiParams.incrementallyLoadTextures,
  );
  modelGraphics!.runAnimations = new Cesium.ConstantProperty(
    guiParams.runAnimations,
  );
  modelGraphics!.clampAnimations = new Cesium.ConstantProperty(
    guiParams.clampAnimations,
  );
  modelGraphics!.shadows = new Cesium.ConstantProperty(
    Number(guiParams.shadows),
  );
  modelGraphics!.silhouetteSize = new Cesium.ConstantProperty(
    guiParams.silhouetteSize,
  );
  modelGraphics!.silhouetteColor = new Cesium.ConstantProperty(
    Cesium.Color.fromCssColorString(guiParams.silhouetteColor),
  );
  modelGraphics!.color = new Cesium.ConstantProperty(
    Cesium.Color.fromCssColorString(guiParams.color),
  );
  modelGraphics!.colorBlendMode = new Cesium.ConstantProperty(
    Number(guiParams.colorBlendMode),
  );
  modelGraphics!.colorBlendAmount = new Cesium.ConstantProperty(
    guiParams.colorBlendAmount,
  );
};

const storeGui = (
  guiParams: ModelParamsInterface,
  storeCb: (data: any) => void,
) => {
  let newGuiParams = Object.assign({}, guiParams);
  let {
    show,
    scale,
    incrementallyLoadTextures,
    runAnimations,
    clampAnimations,
    shadows,
    silhouetteSize,
    silhouetteColor,
    color,
    colorBlendMode,
    colorBlendAmount,
  } = newGuiParams;
  storeCb({
    show,
    scale,
    incrementallyLoadTextures,
    runAnimations,
    clampAnimations,
    shadows,
    silhouetteSize,
    silhouetteColor,
    color,
    colorBlendMode,
    colorBlendAmount,
  });
};

export const setGui = (
  gui: dat.GUI,
  guiParams: ModelParamsInterface,
  model: Cesium.Entity,
  storeCb?: (data: any) => void,
): dat.GUI => {
  let model_folder = gui.addFolder('model');
  model_folder.close();

  let initGuiParams = Object.assign({}, guiParams);
  reviseGui(model, initGuiParams);
  let downloadGuiParams = Object.assign({}, guiParams);

  setGuiCheckbox(model_folder, guiParams, 'show', 'show', () => {
    reviseGui(model, guiParams);
  });

  setGuiSlide(
    model_folder,
    guiParams,
    'scale',
    'scale',
    {
      min: 1,
      max: guiParams.maximumScale,
      step: 1,
    },
    () => {
      reviseGui(model, guiParams);
    },
  );

  setGuiCheckbox(
    model_folder,
    guiParams,
    'incrementallyLoadTextures',
    'incrementallyLoadTextures',
    () => {
      reviseGui(model, guiParams);
    },
  );

  setGuiCheckbox(
    model_folder,
    guiParams,
    'runAnimations',
    'runAnimations',
    () => {
      reviseGui(model, guiParams);
    },
  );

  setGuiCheckbox(
    model_folder,
    guiParams,
    'clampAnimations',
    'clampAnimations',
    () => {
      reviseGui(model, guiParams);
    },
  );

  let listen_shadows = model_folder.add(guiParams, 'shadows', {
    'Cesium.ShadowMode.DISABLED': Cesium.ShadowMode.DISABLED,
    'Cesium.ShadowMode.ENABLED': Cesium.ShadowMode.ENABLED,
    'Cesium.ShadowMode.CAST_ONLY': Cesium.ShadowMode.CAST_ONLY,
    'Cesium.ShadowMode.RECEIVE_ONLY': Cesium.ShadowMode.RECEIVE_ONLY,
  });
  listen_shadows.onChange(() => {
    reviseGui(model, guiParams);
  });

  setGuiSlide(
    model_folder,
    guiParams,
    'silhouetteSize',
    'silhouetteSize',
    {
      min: 0,
      max: 10,
      step: 0.1,
    },
    () => {
      reviseGui(model, guiParams);
    },
  );

  let listen_silhouetteColor = model_folder.addColor(
    guiParams,
    'silhouetteColor',
  );
  listen_silhouetteColor.onChange(() => {
    reviseGui(model, guiParams);
  });

  let listen_color = model_folder.addColor(guiParams, 'color');
  listen_color.onChange(() => {
    reviseGui(model, guiParams);
  });

  let listen_colorBlendMode = model_folder.add(guiParams, 'colorBlendMode', {
    'Cesium.ColorBlendMode.HIGHLIGHT': Cesium.ColorBlendMode.HIGHLIGHT,
    'Cesium.ColorBlendMode.REPLACE': Cesium.ColorBlendMode.REPLACE,
    'Cesium.ColorBlendMode.MIX': Cesium.ColorBlendMode.MIX,
  });
  listen_colorBlendMode.onChange(() => {
    reviseGui(model, guiParams);
  });

  setGuiSlide(
    model_folder,
    guiParams,
    'colorBlendAmount',
    'colorBlendAmount',
    {
      min: 0,
      max: 10,
      step: 0.1,
    },
    () => {
      reviseGui(model, guiParams);
    },
  );

  let obj = {
    ensure: () => {
      storeGui(guiParams, storeCb!);
      downloadGuiParams = Object.assign({}, guiParams);
    },
    reset: () => {
      reviseGui(model, initGuiParams);
      storeGui(initGuiParams, storeCb!);
      model_folder.revert(model_folder);
      downloadGuiParams = Object.assign({}, initGuiParams);
    },
    download: () => {
      downloadJson('model.json', downloadGuiParams);
    },
  };

  model_folder.add(obj, 'ensure').name('确定参数');
  model_folder.add(obj, 'reset').name('重置参数');
  model_folder.add(obj, 'download').name('下载参数');

  return model_folder;
};
