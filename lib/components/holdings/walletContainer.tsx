import React, { useEffect, useState } from "react";

function WalletContainer({ bank, totalAmount }: WalletContainer) {
  const [amount, setAmount] = useState(0);
  const [expenses, setExpenses] = useState(0);

  return (
    <div className="px-3 border-l-2 border-Firebrick flex flex-col gap-4">
      <span className="text-gray-500 font-semibold text-[25px] mb-[-10px]">
        {bank}
      </span>
      <div className="flex gap-2 bg-gray-950 bg-opacity-15 px-3 py-2 rounded-lg">
        <span className="text-[20px] flex items-center text-gray-600">Php</span>
        <span className=" text-[24px] text-Cinnabar font-bold">
          {totalAmount.toFixed(2)}
        </span>
      </div>
    </div>
  );
}

export default WalletContainer;
