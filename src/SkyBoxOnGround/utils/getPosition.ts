import * as Cesium from "cesium";

export const getPosition = (position: Cesium.Cartesian3) => {
  let positionCartographic = Cesium.Cartographic.fromCartesian(
    position,
    Cesium.Ellipsoid.WGS84
  );

  let longitude = Cesium.Math.toDegrees(positionCartographic.longitude);
  let latitude = Cesium.Math.toDegrees(positionCartographic.latitude);
  let height = positionCartographic.height;
  let defaultPosition = {
    longitude: longitude,
    latitude: latitude,
    height: height || 0,
  };

  return defaultPosition;
};
