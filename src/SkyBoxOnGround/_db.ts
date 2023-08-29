import Dexie, { Table } from "dexie";
import { SkyBoxParamsInterface } from "./index";

export const db = new Dexie("CesiumSkyBoxOnGroundDB");

db.version(1).stores({
  skyBoxOnGround: "++id, show",
});

export type skyBoxTableInterface = Table<SkyBoxParamsInterface>;

export const skyBoxTable: skyBoxTableInterface = db.table("skyBoxOnGround");
