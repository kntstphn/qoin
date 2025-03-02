import { Timestamp } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { BsChevronBarDown, BsChevronDown, BsChevronUp } from "react-icons/bs";

interface WalletContainerProps {
  bank: string;
  totalAmount: number;
  combinedData: {
    updatedOn: Timestamp;
    amount: number;
    category: string;
    id: string;
    wallet: string;
  }[];
}

function WalletContainer({
  bank,
  totalAmount,
  combinedData,
}: WalletContainerProps) {
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);

  return (
    <div className="px-3 flex flex-col gap-4">
      <span className="text-gray-500 font-semibold text-[15px] mb-[-10px] border-l-2 border-Firebrick pl-2">
        {bank}
      </span>
      <div className="flex gap-2 justify-between">
        <div className="flex gap-2">
          <span className="text-[20px] flex items-center text-gray-600">
            Php
          </span>
          <span className=" text-[24px] text-Cinnabar font-bold">
            {totalAmount.toFixed(2)}
          </span>
        </div>
        <div className="flex items-center cursor-pointer">
          {isAccordionOpen ? (
            <BsChevronUp
              size={20}
              className="text-Cinnabar"
              onClick={() => setIsAccordionOpen(false)}
            />
          ) : (
            <BsChevronDown
              size={20}
              className="text-Cinnabar"
              onClick={() => setIsAccordionOpen(true)}
            />
          )}
        </div>
      </div>

      {/* Accordion Section */}
      {isAccordionOpen && (
        <div className=" p-3 rounded-md shadow-xl">
          <ul className="mt-1">
            {combinedData.map((item) => (
              <li key={item.id} className="text-Cinnabar py-2 flex flex-col">
                <span className="text-gray-500 text-sm font-bold border-l-2 border-Firebrick pl-2">
                  {item.category.toUpperCase()}
                </span>
                <div>
                  <span className="text-gray-600 text-base pl-5">Php</span>
                  <span className="text-Cinnabar text-base pl-1">
                    {item.amount.toFixed(2)}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default WalletContainer;
