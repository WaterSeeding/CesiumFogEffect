import Dexie, { Table } from 'dexie';
import { DirectionalLightParamsInterface } from './index';

export const db = new Dexie('CesiumDirectionalLightDB');

db.version(1).stores({
  directionallighting: '++id, intensity, *color, *direction',
});

export type directionalLightTableInterface =
  Table<DirectionalLightParamsInterface>;

export const directionalLightTable: directionalLightTableInterface = db.table(
  'directionallighting',
);
