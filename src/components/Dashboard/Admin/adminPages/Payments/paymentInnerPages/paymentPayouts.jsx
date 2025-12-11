import { useState } from "react";
import { FiMoreHorizontal, FiSearch } from "react-icons/fi";
import { MdKeyboardArrowDown } from "react-icons/md";
import { CiFilter } from "react-icons/ci";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { FaRegClock } from "react-icons/fa6";
import { FiArrowDownRight } from "react-icons/fi";
import { MdOutlineCancel } from "react-icons/md";
import { FiLoader } from "react-icons/fi";
import { FaRegEye } from "react-icons/fa";

export default function PaymentPayouts() {
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [openMenu, setOpenMenu] = useState(null);

  const transactions = [
    {
      id: "TXN-2024-001234",
      date: "Dec 1-15, 2024",
      method: "Credit Card",
      instructor: "Sarah Johnson",
      avatar: "SJ",
      transactions: "	31 transactions",
      amount: "$2456.80",
      payout: "PAYOUT-2024-5678",
      status: "completed",
    },
    {
      id: "TXN-2024-001235",
      date: "Dec 1-15, 2024 ",
      method: "PayPal",
      instructor: "Mike Chen",
      avatar: "MC",
      transactions: "	23 transactions",
      amount: "$1834.50",
      payout: "PAYOUT-2024-5679",
      status: "pending",
    },
    {
      id: "TXN-2024-001236",
      date: "Dec 1-15, 2024",
      method: "Credit Card",
      instructor: "Alex Thompson",
      avatar: "AT",
      transactions: "	19 transactions",
      amount: "$1642.30",
      fee: "$12.90",
      payout: "PAYOUT-2024-5680",
      status: "processing",
    },
  ];

  const statusStyles = {
    completed: "bg-green-100 text-green-600",
    pending: "bg-yellow-100 text-yellow-600",
    processing: "bg-blue-100 text-blue-600",
    failed: "bg-red-100 text-red-600",
  };

  const statusStyle = {
    completed: " text-green-600",
    pending: " text-yellow-600",
    processing: "text-blue-600",
    failed: " text-red-600",
  };

   const icons = {
    completed: <IoMdCheckmarkCircleOutline />,
    pending: <FaRegClock />,
    processing: <FiLoader />,
    failed: <MdOutlineCancel />,
  };

  const reson = {
    completed: "via Bank Transfer",
    pending: "via PayPal",
    processing: "via Bank Transfer",
    failed: " ",
  }

  // Apply search + filter
  const filteredTxns = transactions.filter((t) => {
    const matchesSearch =
      t.id.toLowerCase().includes(search.toLowerCase()) ||
      t.student.toLowerCase().includes(search.toLowerCase()) ||
      t.course.toLowerCase().includes(search.toLowerCase());

    const matchesFilter =
      filterStatus === "All" || t.status === filterStatus.toLowerCase();

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="p-6">
      {/* Instructor Payouts Table */}
      <div className="bg-white p-8 rounded-xl shadow-sm mt-6">
        <h3 className="text-lg font-semibold mb-1">
          Instructor Payouts
        </h3>
        <p className="text-gray-500 text-sm mb-4">
          Manage instructor payments and payout schedules
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-gray-500 text-sm border-b border-gray-300">
                <th className="py-3">Instructor</th>
                <th className="py-3">Period</th>
                <th className="py-3 pl-5">Amount</th>
                <th className="py-3 pl-5">Transactions</th>
                <th className="py-3">Status</th>
                <th className="py-3">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredTxns.map((txn, index) => (
                <tr key={index} className="border-b  border-gray-300 last:border-none hover:bg-gray-200">
                  {/* Instructor*/}
                  <td >
                    <div className="flex items-center gap-2 mt-7 mb-3">
                      <div className="h-9 w-9 rounded-full bg-gray-200 flex items-center justify-center font-medium">
                        {txn.avatar}
                      </div>
                      <div>
                        <p>{txn.instructor}</p>
                        <p className="text-gray-500">{txn.payout}</p>
                      </div>
                    </div>
                  </td>

                  {/* Period */}
                  <td className="py-4">
                    <p className="text-sm ">
                      {txn.date}
                    </p>
                  </td>

                  {/* Amount */}
                  <td className="pl-5">
                    <p className="font-medium text-gray-800">{txn.amount}</p>
                  </td>

                  {/* Transactions */}
                  <td className="pl-5">
                    <p className="font-medium text-gray-800">{txn.transactions}</p>
                  </td>


                  {/* Status */}
                  <td>
                    <div className="flex gap-1">
                      <span className={`mt-1 text-xl  ${statusStyle[txn.status]}`}>{icons[txn.status]}</span>
                      <span className={`px-3 py-1 rounded-full text-sm ${statusStyles[txn.status]}`}>
                        {txn.status}
                      </span>
                    </div>
                    <p className={`${statusStyle[txn.status]}`}>{`${reson[txn.status]}`}</p>
                  </td>

                  {/* Actions */}
                  <td className="relative">
                    <button
                      onClick={() =>
                        setOpenMenu(openMenu === index ? null : index)
                      }
                      className="text-xl text-gray-600 hover:text-black px-3 rounded-xl w-10 h-7 hover:bg-green-400"
                    >
                      <FiMoreHorizontal />
                    </button>

                    {openMenu === index && (
                      <div className="absolute right-10 mt-2 w-50 bg-white shadow-lg border border-gray-300 rounded-lg p-2 z-10">
                        {["View Details", "Download Statement"]
                          .map((opt) => (
                            <p
                              key={opt}
                              className="px-3 py-2 hover:bg-green-400 cursor-pointer rounded-xl"
                            >
                              {opt}
                            </p>
                          ))}
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
