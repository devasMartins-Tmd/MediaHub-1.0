/**
 * @desc Utilities function
 */

function getText(index: number, flag: string) {
  let days = ['Mon', 'Teu', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'];
  let months = ['Jan', 'Feb', 'Mar', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
  return flag === 'd' ? days[index] : months[index];
}

function divide(now: Date, before: Date, divisor: number) {
  return parseInt((Math.round(now.getTime() - before.getTime()) / divisor).toFixed(0));
}

export const uiTime = function (date: Date) {
  if (date instanceof Date) {
    let now = new Date();
    let [sec, min, hr, day] = [
      divide(now, date, 1000),
      divide(now, date, 1000 * 60),
      divide(now, date, 1000 * 60 * 60),
      divide(now, date, 1000 * 3600 * 24),
    ];
    let when = ``;
    if (day > 7)
      when += `${getText(date.getDay(), 'd')}, ${getText(
        date.getMonth(),
        'm'
      )} ${date.getFullYear()}`;
    else if (day > 0)
      when +=
        day >= 2 ? `${Math.round(day).toFixed(0)}days ago` : `${Math.round(day).toFixed(0)}day ago`;
    else if (hr > 0)
      when +=
        hr >= 2 ? `${Math.round(hr).toFixed(0)}hrs ago` : `${Math.round(hr).toFixed(0)}hr ago`;
    else if (min > 0)
      when += when +=
        min >= 2 ? `${Math.round(min).toFixed(0)}mins ago` : `${Math.round(min).toFixed(0)}min ago`;
    else if (sec > 0)
      when +=
        sec >= 2 ? `${Math.round(sec).toFixed(0)}secs ago` : `${Math.round(sec).toFixed(0)}sec ago`;
    return when;
  }
};
//let [createdMinute, createdHour, createdSecond, createdTime] = [
//   date.getMinutes(),
//   date.getHours(),
//   date.getSeconds(),
//   date.toUTCString(),
// ];
