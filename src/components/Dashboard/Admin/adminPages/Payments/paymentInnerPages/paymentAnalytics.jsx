import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line
} from "recharts";

export default function PaymentAnalytics() {
  const transactionData = [
    { month: "Jan", value: 1200 },
    { month: "Feb", value: 1350 },
    { month: "Mar", value: 1450 },
    { month: "Apr", value: 1520 },
    { month: "May", value: 1680 },
    { month: "Jun", value: 1750 },
    { month: "Jul", value: 1820 },
    { month: "Aug", value: 1800 },
    { month: "Sep", value: 1920 },
    { month: "Oct", value: 2050 },
    { month: "Nov", value: 1980 },
    { month: "Dec", value: 2100 },
  ];

  const feeData = [
    { month: "Jan", value: 7000 },
    { month: "Feb", value: 8200 },
    { month: "Mar", value: 9000 },
    { month: "Apr", value: 9600 },
    { month: "May", value: 11000 },
    { month: "Jun", value: 12000 },
    { month: "Jul", value: 11800 },
    { month: "Aug", value: 12500 },
    { month: "Sep", value: 14000 },
    { month: "Oct", value: 13500 },
    { month: "Nov", value: 14200 },
    { month: "Dec", value: 14800 },
  ];

  return (
    <div className="p-6  grid grid-cols-2 gap-5">

      {/* Transaction Volume */}
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <h2 className="text-xl font-semibold mb-1">Transaction Volume</h2>
        <p className="text-gray-500 text-sm mb-4">Monthly transaction counts</p>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={transactionData}>
            <CartesianGrid strokeDasharray="3 3" opacity={3} />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#3b82f6" radius={[5, 5, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Platform Fees */}
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <h2 className="text-xl font-semibold mb-1">Platform Fees</h2>
        <p className="text-gray-500 text-sm mb-4">Monthly fee collection</p>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={feeData}>
            <CartesianGrid strokeDasharray="3 3" opacity={3} />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />

            <Line
              type="monotone"
              dataKey="value"
              stroke="#10b981"
              strokeWidth={3}
              dot={{ r: 4, fill: "#10b981" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}
