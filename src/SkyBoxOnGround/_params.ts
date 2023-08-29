import * as Cesium from "cesium";
import lodash from "lodash";
import { SkyBoxParamsInterface } from "./index";
import { skyBoxTableInterface } from "./_db";

let defaultParams: SkyBoxParamsInterface = {
  show: true,
  sourcesType: "default",
};

export const setParams = async (
  skyBox: Cesium.SkyBox,
  skyBoxTable: skyBoxTableInterface
): Promise<SkyBoxParamsInterface> => {
  let defaultSources = lodash.cloneDeep(skyBox.sources);
  let sourcesList = [
    {
      name: "default",
      sources: defaultSources,
    },
  ];
  defaultParams.sourcesList = sourcesList;
  let res = await skyBoxTable.toArray();
  let latestResValue = res[res.length - 1];
  if (latestResValue) {
    defaultParams = Object.assign(defaultParams, latestResValue);
  }
  return defaultParams;
};
