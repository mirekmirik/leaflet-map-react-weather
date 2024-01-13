import moment from 'moment'

export const toFixedTemp = (temp: number) => {
  const fixedTemp = Number(temp.toFixed(0));
  return `${fixedTemp} °C`;
};

export const toFahrenheitTemp = (temp: number) => {
  return (temp * 9.0) / 5.0 + 32.0;
};

export const toFormatDateByMoment = (date: string) => {
  return moment(date).format('dddd')
}