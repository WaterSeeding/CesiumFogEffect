import * as Cesium from 'cesium';
import FogEffectGLSL from './glsl/shader3';

let FogEffectSource = FogEffectGLSL;

class FogEffect {
  viewer: Cesium.Viewer;
  fogStage: Cesium.PostProcessStage | undefined;
  constructor(
    viewer: Cesium.Viewer,
    options: { visibility?: number; color?: Cesium.Color },
  ) {
    this.viewer = viewer;
    let visibility = Cesium.defaultValue(options.visibility, 0.1);
    let color = Cesium.defaultValue(
      options.color,
      new Cesium.Color(0.8, 0.8, 0.8, 0.3),
    );
    this.init(visibility, color);
  }

  init(visibility: number, color: Cesium.Color) {
    this.fogStage = new Cesium.PostProcessStage({
      name: 'Cesium_FogEffect',
      fragmentShader: FogEffectSource,
      uniforms: {
        visibility: visibility,
        color: color,
      },
    });
    this.viewer.scene.postProcessStages.add(this.fogStage);
  }

  setEnabled(value: boolean) {
    this.fogStage!.enabled = value;
  }

  setVisibility(values: number) {
    this.fogStage!.uniforms.visibility = values;
  }

  setColor(colorV: number[]) {
    let color = new Cesium.Color(
      colorV[0] / 255,
      colorV[1] / 255,
      colorV[2] / 255,
      colorV[3],
    );
    this.fogStage!.uniforms.color = color;
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
