export const downloadJson = (fileName: string, json: any) => {
  const jsonStr = json instanceof Object ? JSON.stringify(json) : json;
  const url = window.URL || window.webkitURL;
  const blob = new Blob([jsonStr]);
  const saveLink = document.createElement('a');
  saveLink.href = url.createObjectURL(blob);
  saveLink.download = fileName;
  saveLink.click();
};
