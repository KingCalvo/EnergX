import { BarChart } from "@mui/x-charts/BarChart";

function GraphicsBuilding() {
  return (
    <div className="w-full h-[50vh] md:h-[60vh] lg:h-[70vh] flex items-center justify-center">
      <BarChart
        xAxis={[
          {
            scaleType: "band",
            data: [
              "Recursos humanos",
              "Departamento de desarrollo",
              "Departamento de cómputo",
            ],
          },
        ]}
        series={[{ data: [0, 0, 0] }, { data: [3, 2, 1] }, { data: [0, 0, 0] }]}
        width={900}
        height={450}
      />
    </div>
  );
}

export default GraphicsBuilding;
