import * as Cesium from 'cesium';

export const seTtileset = (
  viewer: Cesium.Viewer,
  url: string,
  cb?: Function,
): void => {
  const tileset = new Cesium.Cesium3DTileset({
    url: url,
    skipLevelOfDetail: true,
    preferLeaves: true,
    maximumMemoryUsage: 2048,
    preloadFlightDestinations: true,
    baseScreenSpaceError: 2048,
    maximumScreenSpaceError: 128,
    skipScreenSpaceErrorFactor: 32,
    backFaceCulling: true,
    immediatelyLoadDesiredLevelOfDetail: true,
    preloadWhenHidden: true,
    loadSiblings: true,
    cullWithChildrenBounds: false,
    cullRequestsWhileMoving: false,
    cullRequestsWhileMovingMultiplier: 600,

    progressiveResolutionHeightFraction: 0.01,

    dynamicScreenSpaceError: true,
    dynamicScreenSpaceErrorDensity: 1,
    dynamicScreenSpaceErrorFactor: 4,
    dynamicScreenSpaceErrorHeightFalloff: 1,

    foveatedScreenSpaceError: true,
    foveatedTimeDelay: 0.6,
  });
  tileset.readyPromise
    .then(function (tileset) {
      viewer.scene.primitives.add(tileset); // primitives是获取primitives的集合
      cb && cb(tileset);
    })
    .catch(function (error) {
      console.log(error);
    });
};
