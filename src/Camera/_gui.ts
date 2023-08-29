import * as dat from 'dat.gui';
import Camera, { CameraParamsInterface } from './index';
import { setGuiSlide } from './utils/setGuiSlide';

export const setGui = (
  gui: dat.GUI,
  guiParams: CameraParamsInterface,
  camera: Camera,
  storeCb: (data: CameraParamsInterface) => void,
): dat.GUI => {
  let camera_folder = gui.addFolder('Camera');
  camera_folder.open();

  setGuiSlide(
    camera_folder,
    guiParams.position!,
    'longitude',
    'longitude [经度]',
    {
      min: -360,
      max: 360,
      step: 0.000001,
    },
    () => {
      camera.setView(guiParams);
    },
  );

  setGuiSlide(
    camera_folder,
    guiParams.position!,
    'latitude',
    'latitude [纬度]',
    {
      min: -360,
      max: 360,
      step: 0.000001,
    },
    () => {
      camera.setView(guiParams);
    },
  );

  setGuiSlide(
    camera_folder,
    guiParams.position!,
    'height',
    'height [高度]',
    {
      min: 0,
      max: 10000000,
      step: 1,
    },
    () => {
      camera.setView(guiParams);
    },
  );

  setGuiSlide(
    camera_folder,
    guiParams.headingPitchRoll!,
    'heading',
    'heading [朝向度]',
    {
      min: -360,
      max: 360,
      step: 0.000001,
    },
    () => {
      camera.setView(guiParams);
    },
  );

  setGuiSlide(
    camera_folder,
    guiParams.headingPitchRoll!,
    'pitch',
    'pitch [倾斜度]',
    {
      min: -360,
      max: 360,
      step: 0.000001,
    },
    () => {
      camera.setView(guiParams);
    },
  );

  setGuiSlide(
    camera_folder,
    guiParams.headingPitchRoll!,
    'roll',
    'roll [翻转度]',
    {
      min: -360,
      max: 360,
      step: 0.000001,
    },
    () => {
      camera.setView(guiParams);
    },
  );

  let obj = {
    getInfo: () => {
      let info = camera.getInfo();
      // downloadJson("Camera.json", info);
      storeCb(info);
    },
    updateInfo: () => {
      let info = camera.getInfo();
      // position
      if (guiParams.position) {
        guiParams.position.longitude = info.position.longitude;
        guiParams.position.latitude = info.position.latitude;
        guiParams.position.height = info.position.height;
      }
      // direction
      if (guiParams.direction) {
        guiParams.direction.height = info.direction.height;
        guiParams.direction.longitude = info.direction.longitude;
        guiParams.direction.latitude = info.direction.latitude;
      }
      // headingPitchRoll
      if (guiParams.headingPitchRoll) {
        guiParams.headingPitchRoll.heading = info.headingPitchRoll.heading;
        guiParams.headingPitchRoll.pitch = info.headingPitchRoll.pitch;
        guiParams.headingPitchRoll.roll = info.headingPitchRoll.roll;
      }
      camera_folder.updateDisplay();
    },
    flyInfo: () => {
      // position
      if (guiParams.position) {
        guiParams.position.longitude = 114.06057134183644;
        guiParams.position.latitude = 22.45757959460653;
        guiParams.position.height = 1951.2090716533955;
      }
      // headingPitchRoll
      if (guiParams.headingPitchRoll) {
        guiParams.headingPitchRoll.heading = 348.85781136545046;
        guiParams.headingPitchRoll.pitch = -17.278714430479283;
        guiParams.headingPitchRoll.roll = 0.011235222869580546;
      }
      camera.setFly(guiParams, () => {
        console.log('定位到目标');
      });
    },
  };

  camera_folder.add(obj, 'getInfo').name('相机参数确定');
  camera_folder.add(obj, 'updateInfo').name('相机参数更新');
  camera_folder.add(obj, 'flyInfo').name('相机飞行目标');

  return camera_folder;
};
