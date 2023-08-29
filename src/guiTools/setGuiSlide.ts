import * as dat from 'dat.gui';

export const setGuiSlide = (
  folder: dat.GUI,
  params: {
    [key: string]: any;
  },
  key: string,
  name: string,
  limit: {
    min: number;
    max: number;
    step: number;
  },
  cb: (v: any) => void,
) => {
  let listen_value = folder
    .add(params, key)
    .name(name)
    .min(limit.min)
    .max(limit.max)
    .step(limit.step);
  listen_value.onChange((v) => {
    cb(v);
  });
};
