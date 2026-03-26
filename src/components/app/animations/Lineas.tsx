import { LineChart } from "@mui/x-charts/LineChart";

export default function DifferentLength() {
  const legendItems = [
    { color: "#FF5733", label: "Semana 1" },
    { color: "#8a2be2", label: "Semana 2" },
    { color: "#008080", label: "Semana 3" },
    { color: "#0000FF", label: "Semana 4" },
  ];

  return (
    <div className="flex flex-col items-center">
      <LineChart
        xAxis={[
          {
            data: [1, 2, 3, 4, 5, 6, 7],
            label: "Días de la semana",
            labelStyle: { fontSize: 14 },
          },
        ]}
        yAxis={[
          {
            data: [0, 0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2],
            label: "Potencia (KW)",
            labelStyle: { fontSize: 14 },
          },
        ]}
        series={[
          {
            data: [0.2, 0.4, 0.5, 1.4, 0.6, 0.5, 0.4], // Semana 1
            color: "#FF5733",
          },
          {
            data: [0.35, 0.5, 0.7, 1.8, 0.8, 0.75, 0.55], // Semana 2 (evento)
            color: "#8a2be2",
          },
          {
            data: [0.25, 1.2, 0.35, 0.5, 0.45, 1.7, 0.3], // Semana 3 (menos actividad)
            color: "#008080",
          },
          {
            data: [0.4, 1.2, 1.9, 0.7, 0.85, 0.8, 0.6], // Semana 4 (uso especial)
            color: "#0000FF",
          },
        ]}
        height={300}
        margin={{ top: 20, bottom: 60 }}
      />

      <div className="flex flex-wrap justify-center mt-6">
        {legendItems.map((item, index) => (
          <div key={index} className="flex items-center mx-4">
            <div
              className="w-2 h-2"
              style={{ backgroundColor: item.color }}
            ></div>
            <span className="ml-2">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
