import { LineChart, Line, ReferenceLine, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

interface LineChartProp {
  data: Record<string, any>[];
  margin: { left: number; right: number; top: number; bottom: number };
  dataKeyX: string;
  dataKeyY1: string;
  dataKeyY2?: string | null;
  tickAngle?: number;
}

interface SlidingLineChartProps extends LineChartProp {
  setData: React.Dispatch<React.SetStateAction<Record<string, any>[]>>;
}

export function CustomLineChart({
  data,
  margin,
  dataKeyX,
  dataKeyY1,
  dataKeyY2 = null,
  tickAngle = 0,
}: LineChartProp) {
  return (
    <LineChart width={1000} height={400} data={data} margin={margin}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis
        dataKey={dataKeyX}
        angle={tickAngle}
        textAnchor="end"
        interval={0}
        padding="gap"
        tick={{ fontSize: 14 }}
        tickMargin={5}
      />
      <YAxis />
      <Tooltip />
      <ReferenceLine y={0} stroke="#000" />
      <Line
        dataKey={dataKeyY1}
        type="monotone"
        stroke="#45556c"
        activeDot={{ r: 8 }}
        isAnimationActive={false}
      />
      {dataKeyY2 ? (
        <Line
          dataKey={dataKeyY2}
          type="monotone"
          stroke="#ff8904"
          activeDot={{ r: 8 }}
          isAnimationActive={false}
        />
      ) : null}
    </LineChart>
  );
}

export function SlidingLineChart({
  data,
  setData,
  margin,
  dataKeyX,
  dataKeyY1,
  dataKeyY2 = null,
  tickAngle = 0,
}: SlidingLineChartProps) {
  return (
    <div className="justify-items-center mb-2">
      <div className="flex mb-4">
        <SlideButton content="&larr;" move="left" data={data} setData={setData} />
        <SlideButton content="&rarr;" move="right" data={data} setData={setData} />
      </div>
      <CustomLineChart
        data={data}
        dataKeyX={dataKeyX}
        dataKeyY1={dataKeyY1}
        dataKeyY2={dataKeyY2}
        margin={margin}
        tickAngle={tickAngle}
      />
    </div>
  );
}

function SlideButton({
  content,
  move,
  data,
  setData,
}: {
  content: string;
  move: string;
  data: Record<string, any>[];
  setData: React.Dispatch<React.SetStateAction<Record<string, any>[]>>;
}) {
  function handleClick() {
    let newData;
    if (move === "right") {
      const last = data[data.length - 1];
      newData = [last, ...data.slice(0, -1)];
    } else {
      const [first, ...rest] = data;
      newData = [...rest, first];
    }
    setData(newData);
  }
  return (
    <button
      className="bg-slate-300 text-2xl px-8 py-1 mx-8 rounded-3xl 
        hover:scale-110 active:bg-slate-400 transition"
      onClick={handleClick}>
      {content}
    </button>
  );
}
