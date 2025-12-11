import React, { useState } from 'react';
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import { LuPiggyBank, LuWallet } from "react-icons/lu";
import { BsCurrencyDollar } from "react-icons/bs";
import { GoClock } from "react-icons/go";
import PaymentOverview from './paymentInnerPages/paymentOverview';
import PaymentTransactions from './paymentInnerPages/paymentTransactions';
import PaymentPayouts from './paymentInnerPages/paymentPayouts';
import PaymentAnalytics from './paymentInnerPages/paymentAnalytics';
import { TfiExport } from "react-icons/tfi";
import { FaAngleDown } from "react-icons/fa6";

export default function Payment() {
    const navigate = useNavigate();

    const [click, setClick] = useState("Overview");

    // ⭐ Correct dropdown states
    const [menuOpen, setMenuOpen] = useState(false);
    const [selectedRange, setSelectedRange] = useState("Last 30 days");

    const card = [
        {
            id: 1,
            title: "Total Revenue",
            icon: <LuPiggyBank />,
            Currency: "$892,540",
            text: "+15% from last month"
        },
        {
            id: 2,
            title: "Monthly Revenue",
            icon: <BsCurrencyDollar />,
            Currency: "$125,680",
            text: "+8% from last month"
        },
        {
            id: 3,
            title: "Platform Fees",
            icon: <LuWallet />,
            Currency: "$89,254",
            text: "10% average fee rate"
        },
        {
            id: 4,
            title: "Pending Payouts",
            icon: <GoClock />,
            Currency: "$45,230",
            text: "Awaiting processing"
        },
    ];

    const buttons = ["Overview", "Transactions", "Payouts", "Analytics"];

    return (
        <div>
            {/* Header */}
            <header className='pb-10'>
                <nav className="flex justify-between items-center px-6 py-5 shadow-md fixed bg-white w-full z-100">

                    {/* Back */}
                    <button
                        onClick={() => navigate(-1)}
                        className="hover:bg-green-500 hover:text-white px-3 py-1 rounded-md flex items-center gap-2"
                    >
                        <FaArrowLeftLong /> back to dashboard
                    </button>

                    {/* Right Side Controls */}
                    <div className="flex gap-3 items-center relative">

                        {/* ⭐ Dropdown Trigger */}
                        <button
                            onClick={() => setMenuOpen(prev => !prev)}
                            className="text-sm text-gray-700 hover:text-white px-4 bg-gray-200 rounded-xl py-1 hover:bg-green-400 flex items-center gap-2"
                        >
                            {selectedRange}<span><FaAngleDown /></span>
                        </button>

                        {/* ⭐ Dropdown Menu */}
                        {menuOpen && (
                            <div className="absolute top-full right-0 mt-2 w-40 bg-white shadow-lg border border-gray-300 rounded-lg p-2 z-10">
                                {["Last 7 days", "Last 30 days", "Last 90 days", "Last year"].map((opt) => (
                                    <p
                                        key={opt}
                                        onClick={() => {
                                            setSelectedRange(opt);
                                            setMenuOpen(false);
                                        }}
                                        className="px-3 py-2 hover:bg-green-400 cursor-pointer rounded-xl text-sm"
                                    >
                                        {opt}
                                    </p>
                                ))}
                            </div>
                        )}

                        {/* Export */}
                        <button className="hover:bg-green-500 px-4 py-1 rounded-xl hover:text-white flex items-center gap-2">
                            <TfiExport className="text-lg" /> export
                        </button>
                    </div>

                </nav>
            </header>

            {/* Main Content */}
            <div className="p-5 sm:p-10 bg-gray-100 min-h-screen">

                {/* Title */}
                <div className="mt-10">
                    <h1 className="text-3xl sm:text-4xl font-semibold">Payment Management</h1>
                    <p className="text-gray-500 mt-2 text-sm sm:text-base">
                        Monitor transactions, manage payouts, and track revenue across your platform.
                    </p>
                </div>

                {/* Cards */}
                <div className="main-card grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-10">
                    {card.map((item, index) => (
                        <div key={item.id} className="border border-gray-200 shadow-md bg-white p-5 rounded-xl h-40 hover:shadow-lg transition">
                            <div className="flex justify-between items-center">
                                <p className="text-lg font-medium">{item.title}</p>
                                <span className="text-2xl text-gray-400">{item.icon}</span>
                            </div>
                            <h1 className="text-xl mt-10 font-semibold">{item.Currency}</h1>
                            <p className={`text-sm  ${index < 2 ? "text-green-600" : index === 2 ? "text-gray-500" : "text-yellow-500"} `}>
                                {item.text}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Filter Buttons */}
                <div className="Filter-Buttons flex justify-around sm:gap-4 mt-10 bg-gray-200 rounded-full sm:py-1 px-1">
                    {buttons.map((btn) => (
                        <button
                            key={btn}
                            onClick={() => setClick(btn)}
                            className={`btn rounded-full w-80 px-4 sm:px-6 py-1.5 text-sm sm:text-base font-medium transition 
                                ${click === btn ? "bg-white shadow-md" : "hover:bg-white"}
                            `}
                        >
                            {btn}
                        </button>
                    ))}
                </div>

                {/* Tab Content */}
                <div className="mt-6 space-y-5 ">
                    {click === "Overview" && <PaymentOverview />}
                    {click === "Transactions" && <PaymentTransactions />}
                    {click === "Payouts" && <PaymentPayouts />}
                    {click === "Analytics" && <PaymentAnalytics />}
                </div>

            </div>
        </div>
    );
}
