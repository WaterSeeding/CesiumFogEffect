import "./app.css";
import * as Cesium from "cesium";
import * as dat from "dat.gui";
import { viewer } from "./main";
import Model from "./Model/index";
import DirectionalLight from "./DirectionalLight/index";
import SkyBoxOnGround from "./SkyBoxOnGround/index";
import Camera from "./Camera/index";
import FogEffect from "./FogEffect/main/index";
import { setGuiCheckbox } from './guiTools/setGuiCheckbox'

viewer.scene.skyAtmosphere.show = false;

const gui = new dat.GUI({
  name: "Cesium GUI",
  width: 450,
  autoPlace: true,
  closed: false,
});
gui.domElement.id = "gui";
gui.show();

const camera = new Camera(
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
  true
);

const model = new Model(
  viewer,
  gui,
  "./static/CesiumBalloon.glb",
  Cesium.Cartesian3.fromDegrees(114.05104099176157, 22.509032825095247, 50),
  {
    show: true,
    scale: 7.0,
    maximumScale: 256,
    minimumPixelSize: 0.0,
    incrementallyLoadTextures: false,
    runAnimations: true,
    clampAnimations: true,
    shadows: Cesium.ShadowMode.ENABLED,
    silhouetteSize: 0.0,
    silhouetteColor: "#0000ff",
    color: "#ffffff",
    colorBlendMode: Cesium.ColorBlendMode.HIGHLIGHT,
    colorBlendAmount: 0.5,
  },
  true
);

const directionalLight = new DirectionalLight(viewer, gui, {
  direction: {
    longitude: -67,
    latitude: -8.4,
  },
  color: [255, 223, 223, 1],
  intensity: 6.2,
}, true);

const skyBox = new SkyBoxOnGround(
  viewer,
  gui,
  {
    show: true,
    sourcesType: "day",
    sourcesList: [
      {
        name: "day",
        sources: {
          positiveX: "./static/skybox/skys/SunSetRight.png",
          negativeX: "./static/skybox/skys/SunSetLeft.png",
          positiveY: "./static/skybox/skys/SunSetFront.png",
          negativeY: "./static/skybox/skys/SunSetBack.png",
          positiveZ: "./static/skybox/skys/SunSetUp.png",
          negativeZ: "./static/skybox/skys/SunSetDown.png",
        },
      },
    ],
  },
  true
);

const fogEffect = new FogEffect(viewer, {
  visibility: 0.2,
  color: new Cesium.Color(0.8, 0.8, 0.8, 0.3),
});

let folder = gui.addFolder("FogEffect");
folder.open();

setGuiCheckbox(folder, { show: true }, "show", "显示", (v: boolean) => {
  fogEffect.setEnabled(v);
});
