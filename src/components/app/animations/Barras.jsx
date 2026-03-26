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
    [`& .${axisClasses.left} .${axisClasses.label}`]: {
      transform: "translateX(-10px)",
    },
  },
};

const dataset = [
  { value: 1, month: "IT", color: "#FF5733" }, // IT
  { value: 2, month: "Marketing", color: "#33FF57" }, // Marketing
  { value: 3, month: "Operaciones", color: "#3357FF" }, // Operaciones
  { value: 4, month: "Recursos Humanos", color: "#FF33A8" }, // Recursos Humanos
  { value: 1, month: "Ventas", color: "#FF9F33" }, // Ventas
  { value: 2, month: "Departamento de Cómputo", color: "#8E33FF" }, // Departamento de Cómputo
  { value: 3, month: "Finanzas", color: "#33FFF1" }, // Finanzas
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
