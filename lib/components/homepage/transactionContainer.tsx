import React from "react";

function TransactionContainer({ transaction }: TransactionContainerProps) {
  return (
    <div className=" p-2 rounded-md shadow-md mt-1 shadow-gray-800">
      <ul className="mt-1">
        <span className="text-gray-500 text-sm font-bold border-l-2 border-Firebrick pl-2">
          {transaction.remarks}
        </span>
        <div className="flex justify justify-between">
          <div>
            <span className="text-gray-600 text-base pl-5">Php</span>
            <span className="text-Cinnabar text-base pl-1">
              {transaction.amount.toFixed(2)}
            </span>
          </div>
          <span className="text-gray-600 text-base pl-5">
            {transaction.wallet}
          </span>
        </div>
      </ul>
    </div>
  );
}

export default TransactionContainer;
