"use client";

import { FiCreditCard, FiEdit2, FiTrash } from "react-icons/fi";

const bankData = [
  {
    bankName: "BCA",
    accountNumber: "786459897",
    accountName: "PT SportOn Digital Indonesia",
  },
  {
    bankName: "BRI",
    accountNumber: "7864121323459897",
    accountName: "PT SportOn Digital Indonesia",
  },
  {
    bankName: "Mandiri",
    accountNumber: "723386459897",
    accountName: "PT SportOn Digital Indonesia",
  },
];

const BankInfoList = () => {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {bankData.map((data, index) => (
        <div
          key={index}
          className="bg-white border border-gray-200 rounded-lg p-4 flex flex-col justify-between w-[315px] h-[192px]"
        >
          {/* Header: Icon + Bank Name + Buttons */}
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-3">
              <div className="bg-blue-50 text-blue-600 w-12 h-12 flex justify-center items-center rounded">
                <FiCreditCard size={24} />
              </div>
              <div className="flex flex-col">
                <div className="font-semibold text-lg leading-[1.2]">{data.bankName}</div>
                <div className="text-xs opacity-50 leading-[1.2]">Bank Transfer</div>
              </div>
            </div>

            {/* Buttons di pojok kanan atas */}
            <div className="flex gap-2">
              <button
                className="flex h-8 w-8 items-center justify-center rounded-md text-gray-600 hover:bg-gray-100"
                aria-label="Edit bank"
              >
                <FiEdit2 size={18} />
              </button>

              <button
                className="flex h-8 w-8 items-center justify-center rounded-md text-red-600 hover:bg-red-100"
                aria-label="Delete bank"
              >
                <FiTrash size={18} />
              </button>
            </div>
          </div>

          {/* Bottom section: vertical layout */}
          <div className="mt-4 flex flex-col gap-2.5">
            {/* Account Number label */}
            <div className="font-medium text-sm">Account Number</div>
            {/* Account Number value */}
            <div className="font-semibold text-lg border-b border-gray-200 pb-1">{data.accountNumber}</div>
{/* Holder */}
<div className="flex gap-2 items-center py-1">
  <span className="font-medium text-sm">Holder :</span>
  <span className="text-sm text-gray-600">{data.accountName}</span>
</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BankInfoList;