import * as dat from 'dat.gui';

export const setGuiCheckbox = (
  folder: dat.GUI,
  params: {
    [key: string]: any;
  },
  key: string,
  name: string,
  cb: (data: any) => void,
) => {
  let listen_value = folder.add(params, key).name(name);
  listen_value.onChange((v) => {
    cb(v);
  });
};
