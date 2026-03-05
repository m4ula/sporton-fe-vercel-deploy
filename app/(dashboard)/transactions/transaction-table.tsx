"use client";

import priceFormatter from "@/app/utils/price-formatter";
import { FiEye } from "react-icons/fi";

const transactionData = [
  {
    date: "23/02/2026 19:12",
    customer: "John Doe",
    contact: "+62899847385",
    total: 15000000,
    status: "PENDING",
  },
  {
    date: "24/02/2026 22:15",
    customer: "Jane Doe",
    contact: "+62899855535435",
    total: 1900000,
    status: "PAID",
  },
  {
    date: "22/02/2026 20:22",
    customer: "James",
    contact: "+62843456565",
    total: 20000000,
    status: "REJECTED",
  },
];

type TTransactionTableProps = {
  onViewDetails: () => void;
}

const TransactionTable = ({onViewDetails}: TTransactionTableProps) => {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "bg-yellow-100 text-yellow-600";
      case "paid":
        return "bg-green-100 text-green-600";
      case "rejected":
        return "bg-red-100 text-red-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="px-6 py-4 font-semibold">Date</th>
            <th className="px-6 py-4 font-semibold">Customer</th>
            <th className="px-6 py-4 font-semibold">Contact</th>
            <th className="px-6 py-4 font-semibold">Total</th>
            <th className="px-6 py-4 font-semibold">Status</th>
            <th className="px-6 py-4 font-semibold">Actions</th>
          </tr>
        </thead>

        <tbody>
          {transactionData.map((data, index) => (
            <tr
              key={index}
              className="border-b border-gray-200 last:border-b-0"
            >
              <td className="px-6 py-4 font-medium">{data.date}</td>
              <td className="px-6 py-4 font-medium">{data.customer}</td>
              <td className="px-6 py-4 font-medium">{data.contact}</td>
              <td className="px-6 py-4 font-medium">
                {priceFormatter(data.total)}
              </td>
              <td className="px-6 py-4 font-medium">
                <div
                  className={`rounded-full px-3 py-1 text-sm font-medium w-fit uppercase ${getStatusColor(
                    data.status
                  )}`}
                >
                  {data.status}
                </div>
              </td>
              <td className="px-6 py-4">
                <button onClick={onViewDetails} className="flex items-center gap-2 rounded-md px-2 py-1 hover:bg-gray-100">
                  <FiEye size={18} />
                  View Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionTable;