import * as Cesium from "cesium";

export const createModel = (
  viewer: Cesium.Viewer,
  url: string,
  position: Cesium.Cartesian3
) => {
  const heading = Cesium.Math.toRadians(135);
  const pitch = 0;
  const roll = 0;
  const hpr = new Cesium.HeadingPitchRoll(heading, pitch, roll);
  const orientation = Cesium.Transforms.headingPitchRollQuaternion(
    position,
    hpr
  );
  const orientationProperty = new Cesium.ConstantProperty(orientation);

  viewer.entities.add({
    name: url,
    position: position,
    orientation: orientationProperty,
    model: {
      show: true,
      uri: url,
      scale: 7.0,
      shadows: Cesium.ShadowMode.CAST_ONLY,
    },
  });
};
