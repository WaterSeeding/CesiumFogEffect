import * as Cesium from 'cesium';
import FogEffectGLSL from './glsl/shader3.glsl';

let FogEffectSource = FogEffectGLSL.replace(/#define GLSLIFY 1/g, '');

class FogEffect {
  viewer: Cesium.Viewer;
  visibility: number;
  color: Cesium.Color;
  fogStage: Cesium.PostProcessStage | undefined;
  constructor(
    viewer: Cesium.Viewer,
    options: { visibility?: number; color?: Cesium.Color },
  ) {
    this.viewer = viewer;
    this.visibility = Cesium.defaultValue(options.visibility, 0.1);
    this.color = Cesium.defaultValue(
      options.color,
      new Cesium.Color(0.8, 0.8, 0.8, 0.5),
    );
    this.init();
  }

  init() {
    this.fogStage = new Cesium.PostProcessStage({
      name: 'Cesium_FogEffect',
      fragmentShader: FogEffectSource,
      uniforms: {
        visibility: () => {
          return this.visibility;
        },
        fogColor: () => {
          return this.color;
        },
      },
    });
    this.viewer.scene.postProcessStages.add(this.fogStage);
  }

  setEnabled(value: boolean) {
    this.fogStage!.enabled = value;
  }

  destroy() {
    this.viewer.scene.postProcessStages.remove(this.fogStage!);
    let isDestroyed = this.fogStage!.isDestroyed();
    if (!isDestroyed) {
      this.fogStage!.destroy();
    }
  }
}

export default FogEffect;
