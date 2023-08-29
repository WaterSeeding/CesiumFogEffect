import Dexie, { Table } from 'dexie';
import { ModelParamsInterface } from './index';

export const db = new Dexie('CesiumModelDB');

db.version(1).stores({
  model:
    '++id, show, scale, maximumScale, minimumPixelSize, incrementallyLoadTextures, runAnimations, clampAnimations, shadows, silhouetteSize, silhouetteColor, color, colorBlendMode, colorBlendAmount',
});

export type modelTableInterface = Table<ModelParamsInterface>;

export const modelTable: modelTableInterface = db.table('model');
