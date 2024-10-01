export function calculateTime(data: number) {
  const hour = Math.ceil(data / 3600);
  const min = Math.ceil((data % 3600) / 60);
  const second = data % 60;
  const remainHour = hour > 9 ? hour : '0' + hour;
  const remainMin = min > 9 ? min : '0' + min;
  const remainSecond = second > 9 ? second : '0' + second;
  return `${
    remainHour.toString() +
    ':' +
    remainMin.toString() +
    ':' +
    remainSecond.toString()
  }`;
}

export function getDate(timeStamp: string) {
  const year = new Date(Number(timeStamp)).getFullYear();
  const month = new Date(Number(timeStamp)).getMonth();
  const day = new Date(Number(timeStamp)).getDate();

  return `${year}-${month > 10 ? month : '0' + month}-${
    day > 10 ? day : '0' + day
  }`;
}
