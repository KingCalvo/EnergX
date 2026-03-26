
import { BarChart } from '@mui/x-charts/BarChart';

function GraphicsBuilding() {
  return (
    <BarChart
      xAxis={[{ scaleType: 'band', data: ['A', 'B', 'C'] }]}
      series={[{ data: [4, 3, 5] }, { data: [1, 6, 3] }, { data: [2, 5, 6] }]}
      width={300}
      height={200}
    />
  )
}

export default GraphicsBuilding