import {
  BarChart,
  LineChart,
  PieChart,
  Bar,
  Line,
  Pie,
  ReferenceLine,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Brush,
} from 'recharts';

export function CustomLineChart({ data, dataKeyX, dataKeyY, margin, tickAngle = 0 }) {
    return (
        <LineChart
            width={1000}
            height={400}
            data={data}
            margin={margin}
        >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={dataKeyX} angle={tickAngle} textAnchor="end" interval={0} padding="gap" tick={{ fontSize: 14 }} tickMargin={5} />
            <YAxis />
            <Tooltip />
            <ReferenceLine y={0} stroke="#000" />
            <Line dataKey={dataKeyY} type="monotone" stroke="#45556c" activeDot={{ r: 8 }} isAnimationActive={false} />
        </LineChart>
    );
  }