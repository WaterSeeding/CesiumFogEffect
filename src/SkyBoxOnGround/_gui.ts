import * as dat from "dat.gui";
import SkyBox from "./index";
import { SkyBoxParamsInterface } from "./index";
import { setGuiCheckbox } from "./utils/setGuiCheckbox";
import { downloadJson } from "./utils/downloadJson";

const reviseGui = (skyBox: SkyBox, guiParams: SkyBoxParamsInterface) => {
  skyBox.setShow(guiParams.show);
};

const storeGui = (guiParams: SkyBoxParamsInterface, storeCb: Function) => {
  storeCb({
    show: guiParams.show,
  });
};

export const setGui = (
  gui: dat.GUI,
  guiParams: SkyBoxParamsInterface,
  skyBox: SkyBox,
  storeCb: Function
) => {
  let skyBox_folder = gui.addFolder("skyBoxOnGround");
  skyBox_folder.open();

  let initGuiParams = Object.assign({}, guiParams);
  reviseGui(skyBox, initGuiParams);

  if (guiParams?.sourcesType && guiParams?.sourcesType !== "default") {
    let sourcesInfo = guiParams.sourcesList.find(
      (sourcesItem) => sourcesItem.name === guiParams.sourcesType
    );
    skyBox.setSources(sourcesInfo.sources);
  }
  let downloadGuiParams = Object.assign({}, guiParams);

  setGuiCheckbox(skyBox_folder, guiParams, "show", "show", () => {
    reviseGui(skyBox, guiParams);
  });

  let sourcesListName = guiParams.sourcesList.map(
    (sourcesItem) => sourcesItem.name
  );
  skyBox_folder.add(guiParams, "sourcesType", sourcesListName).onChange((v) => {
    let sourcesInfo = guiParams.sourcesList.find(
      (sourcesItem) => sourcesItem.name === v
    );
    skyBox.setSources(sourcesInfo.sources);
  });

  let obj = {
    ensure: () => {
      storeGui(guiParams, storeCb);
      downloadGuiParams = Object.assign({}, guiParams);
    },
    reset: () => {
      reviseGui(skyBox, initGuiParams);
      storeGui(initGuiParams, storeCb);
      skyBox_folder.revert(skyBox_folder);
      downloadGuiParams = Object.assign({}, initGuiParams);
    },
    download: () => {
      downloadJson("skyBox.json", downloadGuiParams);
    },
  };

  skyBox_folder.add(obj, "ensure").name("确定参数");
  skyBox_folder.add(obj, "reset").name("重置参数");
  skyBox_folder.add(obj, "download").name("下载参数");

  return skyBox_folder;
};
