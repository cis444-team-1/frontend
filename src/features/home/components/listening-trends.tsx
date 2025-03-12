import { LineChart, Line, XAxis, Tooltip, ResponsiveContainer } from "recharts";
import styles from "../styles/graph.module.css";

const data = [
  {
    name: "Mon",
    amount: 123,
  },
  {
    name: "Tue",
    amount: 321,
  },
  {
    name: "Wed",
    amount: 12,
  },
  {
    name: "Thu",
    amount: 302,
  },
  {
    name: "Fri",
    amount: 203,
  },
  {
    name: "Sat",
    amount: 50,
  },
  {
    name: "Sun",
    amount: 72,
  },
];

export const ListeningTrends = () => {
  return (
    <div className={styles.container}>
      <p>
        {new Date().toDateString()} - {new Date().toDateString()}
      </p>

      <div className={styles.divider} />
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 20,
            right: 20,
            left: 20,
            bottom: 5,
          }}
        >
          <XAxis dataKey="name" />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="amount"
            stroke="#a9c9ff"
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
