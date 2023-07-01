/* eslint-disable react/prop-types */
import { Line, LineChart, ResponsiveContainer, Tooltip, YAxis } from "recharts";

const LineCharts = ({ data, color, yAxis = false }) => {
  const dataSample = data?.map((sparkline) => ({
    price:
      Number(sparkline.toFixed(20)) > 1
        ? Math.round(sparkline * 1e2) / 1e2
        : parseFloat(sparkline.toFixed(10)),
  }));
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        width={300}
        height={100}
        data={dataSample && dataSample}
        margin={{
          top: 20,
          right: 20,
          left: yAxis ? -20 : -50,
          bottom: 20,
        }}
      >
        <YAxis
          type="number"
          tick={false}
          axisLine={false}
          domain={["dataMin", "dataMax"]}
        />
        {yAxis && <Tooltip />}

        <Line
          type="monotone"
          dataKey="price"
          stroke={color}
          strokeWidth={yAxis ? 2 : 1}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default LineCharts;
