import * as Cesium from "cesium";
import { SkyBoxFS, SkyBoxVS } from "./_shader";
import DrawCommand from "./DrawCommand";

function SkyBoxOnGround(options) {
  this.sources = options.sources;
  this._sources = undefined;
  /**
   * Determines if the sky box will be shown.
   *
   * @type {Boolean}
   * @default true
   */
  this.show = Cesium.defaultValue(options.show, true);

  this._command = new DrawCommand({
    modelMatrix: Cesium.Matrix4.clone(Cesium.Matrix4.IDENTITY),
    owner: this,
  });

  this._cubeMap = undefined;

  this._attributeLocations = undefined;
  this._useHdr = undefined;
}

SkyBoxOnGround.prototype.update = function (frameState, useHdr) {
  let that = this;

  if (!this.show) {
    return undefined;
  }

  if (
    frameState.mode !== Cesium.SceneMode.SCENE3D &&
    frameState.mode !== Cesium.SceneMode.MORPHING
  ) {
    return undefined;
  }

  if (!frameState.passes.render) {
    return undefined;
  }

  let context = frameState.context;

  if (this._sources !== this.sources) {
    this._sources = this.sources;
    let sources = this.sources;

    if (
      !Cesium.defined(sources.positiveX) ||
      !Cesium.defined(sources.negativeX) ||
      !Cesium.defined(sources.positiveY) ||
      !Cesium.defined(sources.negativeY) ||
      !Cesium.defined(sources.positiveZ) ||
      !Cesium.defined(sources.negativeZ)
    ) {
      throw new Cesium.DeveloperError(
        "this.sources is required and must have positiveX, negativeX, positiveY, negativeY, positiveZ, and negativeZ properties."
      );
    }

    if (
      typeof sources.positiveX !== typeof sources.negativeX ||
      typeof sources.positiveX !== typeof sources.positiveY ||
      typeof sources.positiveX !== typeof sources.negativeY ||
      typeof sources.positiveX !== typeof sources.positiveZ ||
      typeof sources.positiveX !== typeof sources.negativeZ
    ) {
      throw new Cesium.DeveloperError(
        "this.sources properties must all be the same type."
      );
    }

    if (typeof sources.positiveX === "string") {
      // Given urls for cube-map images.  Load them.
      Cesium.loadCubeMap(context, this._sources).then(function (cubeMap) {
        that._cubeMap = that._cubeMap && that._cubeMap.destroy();
        that._cubeMap = cubeMap;
      });
    } else {
      this._cubeMap = this._cubeMap && this._cubeMap.destroy();
      this._cubeMap = new Cesium.CubeMap({
        context: context,
        source: sources,
      });
    }
  }

  let command = this._command;

  command.modelMatrix = Cesium.Transforms.eastNorthUpToFixedFrame(
    frameState.camera._positionWC
  );

  if (!Cesium.defined(command.vertexArray)) {
    let resultMatrix3 = new Cesium.Matrix3();

    command.uniformMap = {
      u_cubeMap: function () {
        return that._cubeMap;
      },
      u_rotateMatrix: function () {
        if (!Cesium.defined(Cesium.Matrix4.getRotation)) {
          return Cesium.Matrix4.getMatrix3(command.modelMatrix, resultMatrix3);
        }
        return Cesium.Matrix4.getRotation(command.modelMatrix, resultMatrix3);
      },
    };

    let geometry = Cesium.BoxGeometry.createGeometry(
      Cesium.BoxGeometry.fromDimensions({
        dimensions: new Cesium.Cartesian3(2.0, 2.0, 2.0),
        vertexFormat: Cesium.VertexFormat.POSITION_ONLY,
      })
    );
    let attributeLocations = (this._attributeLocations =
      Cesium.GeometryPipeline.createAttributeLocations(geometry));

    command.vertexArray = Cesium.VertexArray.fromGeometry({
      context: context,
      geometry: geometry,
      attributeLocations: attributeLocations,
      bufferUsage: Cesium.BufferUsage._DRAW,
    });

    command.renderState = Cesium.RenderState.fromCache({
      blending: Cesium.BlendingState.ALPHA_BLEND,
    });
  }

  if (!Cesium.defined(command.shaderProgram) || this._useHdr !== useHdr) {
    let fs = new Cesium.ShaderSource({
      defines: [useHdr ? "HDR" : ""],
      sources: [SkyBoxFS],
    });
    command.shaderProgram = Cesium.ShaderProgram.fromCache({
      context: context,
      vertexShaderSource: SkyBoxVS,
      fragmentShaderSource: fs,
      attributeLocations: this._attributeLocations,
    });
    this._useHdr = useHdr;
  }

  if (!Cesium.defined(this._cubeMap)) {
    return undefined;
  }

  return command;
};

SkyBoxOnGround.prototype.isDestroyed = function () {
  return false;
};

SkyBoxOnGround.prototype.destroy = function () {
  let command = this._command;
  command.vertexArray = command.vertexArray && command.vertexArray.destroy();
  command.shaderProgram =
    command.shaderProgram && command.shaderProgram.destroy();
  this._cubeMap = this._cubeMap && this._cubeMap.destroy();
  return Cesium.destroyObject(this);
};

export default SkyBoxOnGround;
