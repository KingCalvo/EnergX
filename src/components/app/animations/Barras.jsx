import { axisClasses } from "@mui/x-charts/ChartsAxis";
import { BarChart } from "@mui/x-charts/BarChart";

const otherSetting = {
  height: 300,
  yAxis: [
    {
      label: "Semanas",
      scaleType: "linear",
      min: 0,
      max: 4,
      ticks: [1, 2, 3, 4],
    },
  ],
  grid: { horizontal: true },
  sx: {
    backgroundColor: "transparent",
    [`& .${axisClasses.left} .${axisClasses.label}`]: {
      transform: "translateX(-10px)",
    },
  },
};

const dataset = [
  { value: 1, month: "IT", color: "#FF5733" },
  { value: 2, month: "Marketing", color: "#33FF57" },
  { value: 3, month: "Operaciones", color: "#3357FF" },
  { value: 4, month: "Recursos H...", color: "#FF33A8" },
  { value: 1, month: "Ventas", color: "#FF9F33" },
  { value: 2, month: "Departamento...", color: "#8E33FF" },
  { value: 3, month: "Finanzas", color: "#33FFF1" },
];

export default function FormatterDemoNoSnap() {
  return (
    <BarChart
      dataset={dataset}
      xAxis={[
        {
          scaleType: "band",
          dataKey: "month",
        },
      ]}
      series={[
        {
          dataKey: "value",
          label: "Áreas",
          barStyle: (entry) => ({ fill: entry.color }),
        },
      ]}
      {...otherSetting}
    />
  );
}
