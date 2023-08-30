export const showTime = (date: Date) => {
  let year = date.getFullYear(); //获取当前年份
  let mon = date.getMonth() + 1; //获取当前月份
  let da = date.getDate(); //获取当前日
  let h = date.getHours(); //获取小时
  let m = date.getMinutes(); //获取分钟
  let s = date.getSeconds(); //获取秒
  let time = `${year}-${mon}-${da} ${h}:${m}:${s}`;
  return time;
};
