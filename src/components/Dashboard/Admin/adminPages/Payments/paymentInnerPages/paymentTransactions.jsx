import { useState } from "react";
import { FiMoreHorizontal, FiSearch } from "react-icons/fi";
import { MdKeyboardArrowDown } from "react-icons/md";
import { CiFilter } from "react-icons/ci";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { FaRegClock } from "react-icons/fa6";
import { FiArrowDownRight } from "react-icons/fi";
import { MdOutlineCancel } from "react-icons/md";
import { FiLoader } from "react-icons/fi";


export default function PaymentTransactions() {
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [openMenu, setOpenMenu] = useState(null);

  const transactions = [
    {
      id: "TXN-2024-001234",
      date: "2024-12-20 at 14:32",
      method: "Credit Card",
      student: "Alice Johnson",
      avatar: "AJ",
      course: "Complete React Development",
      instructor: "Sarah Johnson",
      amount: "$99.00",
      fee: "$9.90",
      payout: "$79.20",
      status: "completed",
    },
    {
      id: "TXN-2024-001235",
      date: "2024-12-20 at 13:45",
      method: "PayPal",
      student: "Bob Smith",
      avatar: "BS",
      course: "Advanced JavaScript Patterns",
      instructor: "Mike Chen",
      amount: "$149.00",
      fee: "$14.90",
      payout: "$119.20",
      status: "completed",
    },
    {
      id: "TXN-2024-001236",
      date: "2024-12-20 at 12:15",
      method: "Credit Card",
      student: "Carol Davis",
      avatar: "CD",
      course: "UI/UX Design Masterclass",
      instructor: "Alex Thompson",
      amount: "$129.00",
      fee: "$12.90",
      payout: "$103.20",
      status: "pending",
    },
    {
      id: "TXN-2024-001237",
      date: "2024-12-19 at 16:20",
      method: "Credit Card",
      student: "David Wilson",
      avatar: "DW",
      course: "React Development Course",
      instructor: "Sarah Johnson",
      amount: "$99.00",
      fee: "$9.90",
      payout: "$79.20",
      status: "refunded",
    },
    {
      id: "TXN-2024-001238",
      date: "2024-12-19 at 15:10",
      method: "Credit Card",
      student: "Emily Rodriguez",
      avatar: "ER",
      course: "Digital Marketing Strategy",
      instructor: "Lisa Park",
      amount: "$89.00",
      fee: "$8.90",
      payout: "$71.20",
      status: "failed",
    },
  ];

  const statusStyles = {
    completed: "bg-green-100 text-green-600",
    pending: "bg-yellow-100 text-yellow-600",
    refunded: "bg-blue-100 text-blue-600",
    failed: "bg-red-100 text-red-600",
  };

  const statusStyle = {
    completed: " text-green-600",
    pending: " text-yellow-600",
    refunded: "text-blue-600",
    failed: " text-red-600",
  }

  const icons = {
    completed: <IoMdCheckmarkCircleOutline />,
    pending: <FaRegClock />,
    processing: <FiLoader />,
    failed: <MdOutlineCancel />,
    refunded : <FiArrowDownRight />
  };

  const reson = {
    completed: " ",
    pending: " ",
    refunded: "Student request",
    failed: " Insufficient funds",
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
      {/* Search + Filters */}
      <div className="bg-white p-4 rounded-xl shadow-sm flex items-center justify-between">
        {/* Search bar */}
        <div className="flex items-center gap-3 bg-gray-50 px-4 py-2 rounded-lg w-1/2">
          <FiSearch className="text-gray-500" />
          <input
            type="text"
            placeholder="Search by student, course, or transaction ID..."
            className="bg-transparent outline-none w-full"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Filter Dropdown */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <button
              onClick={() =>
                setOpenMenu(openMenu === "filter" ? null : "filter")
              }
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-gray-700"
            >
              {filterStatus} Status
              <MdKeyboardArrowDown />
            </button>

            {openMenu === "filter" && (
              <div className="absolute mt-2 w-40 bg-white p-2 shadow-md rounded-md z-10">
                {["All", "Completed", "Pending", "Refunded", "Failed"].map(
                  (s) => (
                    <p
                      key={s}
                      onClick={() => {
                        setFilterStatus(s);
                        setOpenMenu(null);
                      }}
                      className="px-3 py-2 hover:bg-gray-100 cursor-pointer rounded"
                    >
                      {s}
                    </p>
                  )
                )}
              </div>
            )}
          </div>

          {/* More Filters */}
          <button className="border flex gap-2 border-gray-300 bg-gray-100 px-7 py-1 rounded-xl  hover:bg-green-400 hover:text-white">
            <span className="text-2xl "><CiFilter /></span>More Filters
          </button>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-white p-8 rounded-xl shadow-sm mt-6">
        <h3 className="text-lg font-semibold mb-1">
          Recent Transactions ({filteredTxns.length})
        </h3>
        <p className="text-gray-500 text-sm mb-4">
          Latest payment transactions and their status
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-gray-500 text-sm border-b border-gray-300">
                <th className="py-3">Transaction</th>
                <th className="py-3">Student</th>
                <th className="py-3">Course</th>
                <th className="py-3">Amount</th>
                <th className="py-3">Status</th>
                <th className="py-3">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredTxns.map((txn, index) => (
                <tr key={index} className="border-b border-gray-300 last:border-none hover:bg-gray-200">
                  {/* Transaction */}
                  <td className="py-4">
                    <p className="font-medium">{txn.id}</p>
                    <p className="text-sm text-gray-500">
                      {txn.date} <br /> via {txn.method}
                    </p>
                  </td>

                  {/* Student */}
                  <td>
                    <div className="flex items-center gap-2">
                      <div className="h-9 w-9 rounded-full bg-gray-200 flex items-center justify-center font-medium">
                        {txn.avatar}
                      </div>
                      {txn.student}
                    </div>
                  </td>

                  {/* Course */}
                  <td>
                    <p className="font-medium">{txn.course}</p>
                    <p className="text-sm text-gray-500">
                      by {txn.instructor}
                    </p>
                  </td>

                  {/* Amount */}
                  <td>
                    <p className="font-medium">{txn.amount}</p>
                    <p className="text-sm text-gray-500">
                      Fee: {txn.fee} <br />
                      Payout: {txn.payout}
                    </p>
                  </td>

                  {/* Status */}
                  <td >
                    <div className="flex gap-1 mt-8">
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
                        {["View Details", "Refund", "Download Receipt", "Delete"]
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
