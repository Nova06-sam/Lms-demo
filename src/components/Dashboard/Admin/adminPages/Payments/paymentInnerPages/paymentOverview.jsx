import React from 'react'
import { RiMoneyDollarBoxLine } from "react-icons/ri";
import { FiTarget } from "react-icons/fi";
import { GoArrowDownRight } from "react-icons/go";
import { MdErrorOutline } from "react-icons/md";
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    PieChart, Pie, Cell, Legend
} from "recharts";


export default function PaymentOverview() {


    // Revenue Trends Data
    const revenueData = [
        { month: "Jan", value: 72000 },
        { month: "Feb", value: 82000 },
        { month: "Mar", value: 90000 },
        { month: "Apr", value: 95000 },
        { month: "May", value: 110000 },
        { month: "Jun", value: 115000 },
        { month: "Jul", value: 118000 },
        { month: "Aug", value: 117000 },
        { month: "Sep", value: 125000 },
        { month: "Oct", value: 122000 },
        { month: "Nov", value: 130000 },
        { month: "Dec", value: 140000 },
    ];

    // Payment Methods Data
    const paymentData = [
        { name: "Credit Card", value: 65, dollar: "$580,351" },
        { name: "PayPal", value: 20, dollar: "$178,508" },
        { name: "Bank Transfer", value: 10, dollar: "$89,254" },
        { name: "Digital Wallet", value: 5, dollar: "$44,627" },
    ];

    const colors = ["#3b82f6", "#10b981", "#f59e0b", "#6366f1"];
    const color = ["bg-blue-500", "bg-green-500", "bg-yellow-500", "bg-violet-500"];


    //   Rating Cards 
    const card = [
        {
            id: 1,
            title: "Total Transactions",
            icon: <RiMoneyDollarBoxLine />,
            Currency: "15,420",
            text: "This month"
        },
        {
            id: 2,
            title: "Avg Transaction",
            icon: <FiTarget />,
            Currency: "$57.89",
            text: "+5% from last month"
        },
        {
            id: 3,
            title: "Refund Rate",
            icon: <GoArrowDownRight />,
            Currency: "3.2%",
            text: "-0.5% from last month"
        },
        {
            id: 4,
            title: "Chargeback Rate",
            icon: <MdErrorOutline />,
            Currency: "0.8%",
            text: "Within normal range"
        },

    ];

    return (
        <div >
            {/* graph-Analytics */}
            <div className="p-6  grid grid-cols-2 gap-5">
                {/* --- Revenue Chart --- */}
                <div className="bg-white rounded-xl p-6 shadow-sm  w-[130%]">
                    <h2 className="text-xl font-semibold mb-4">Revenue Trends</h2>
                    <p className='pb-10'>Monthly revenue and transaction volume</p>

                    <ResponsiveContainer height={300}>
                        <AreaChart data={revenueData}>
                            <defs>
                                <linearGradient id="colorRevenue" x1="2" y1="0" x2="3" y2="0">
                                    <stop offset="5%" stopColor="#2377ffff" stopOpacity={0.7} />
                                </linearGradient>
                            </defs>

                            <CartesianGrid strokeDasharray="3 3" opacity={1} />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Area
                                type="monotone"
                                dataKey="value"
                                stroke="#3b82f6"
                                fill="url(#colorRevenue)"
                                strokeWidth={1}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>

                {/* --- Payment Methods Pie Chart --- */}
                <div className="bg-white rounded-xl p-6 shadow-sm w-[70%] ml-50">
                    <h2 className="text-xl font-semibold mb-4">Payment Methods</h2>
                    <p>Distribution by payment type</p>

                    <ResponsiveContainer height={300}>
                        <PieChart>
                            <Pie
                                data={paymentData}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                outerRadius={110}
                                // innerRadius={50}
                                dataKey="value"
                            >
                                {paymentData.map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={colors[index % colors.length]}
                                    />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>

                    {/* paymentData */}
                    {paymentData.map((data, index) => (
                        <div key={index} className='flex justify-between pb-1'>
                            <div className='flex gap-2'>
                                <div className={`h-4 w-4 rounded-full mt-1 ${color[index]}`} />
                                <p>{data.name}</p>
                            </div>

                            <div>
                                <p className='ml-8'>{data.value}%</p>
                                <p className='text-gray-500'>{data.dollar}</p>
                            </div>
                        </div>
                    ))}

                </div>
            </div>

            {/* Rating Cards */}
            <div className="main-card grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-10">
                {card.map((item, index) => (
                    <div key={item.id} className="border border-gray-200 shadow-md bg-white p-5 rounded-xl h-40 hover:shadow-lg transition">
                        <div className="flex justify-between items-center">
                            <p className="text-lg font-medium">{item.title}</p>
                            <span className="text-2xl text-gray-400">{item.icon}</span>
                        </div>
                        <h1 className="text-xl mt-10 font-semibold">{item.Currency}</h1>
                        <p className={`text-sm ${index > 0 ? "text-green-600" : "text-gray-400"} `}>{item.text}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}
