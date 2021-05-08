import { ValueChartDataObject } from "../components/dashboard/chart/ValueChart";

let data: ValueChartDataObject[] = new Array(30);
const date = new Date(Date.now());

const initialTime = new Date(Date.now());

for (let i = 0; i < data.length; i++) {
  const group = "You";
  const newDate = date;
  newDate.setSeconds(date.getSeconds() + 20);

  const precision = 100;
  const value =
    Math.floor(
      Math.random() * (20000 * precision - 1 * precision) + 1 * precision
    ) /
      (1 * precision) +
    30000;

  data[i] = {
    group,
    date: newDate.toISOString(),
    value,
  };
}

export default data;
