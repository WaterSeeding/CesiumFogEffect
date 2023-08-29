import Camera from '@/components/Cesium/Camera/index';
import * as Cesium from 'cesium';

const setScene = (viewer: Cesium.Viewer, gui: dat.GUI) => {
  let camera = new Camera(
    viewer,
    gui,
    {
      position: {
        longitude: 114.093278,
        latitude: 22.497575,
        height: 1648,
      },
      headingPitchRoll: {
        heading: 319.296644,
        pitch: -7.66627,
        roll: 0.012352,
      },
    },
    false,
  );
};

export default setScene;
