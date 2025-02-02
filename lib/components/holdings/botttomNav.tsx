"use client";

import React, { useState, useEffect } from "react";
import { FaWallet } from "react-icons/fa";

function BottomNav({ setModal }: BottomNavPropsHoldings) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-Onyx text-gray-500 text-sm font-bold flex justify-around py-2 rounded-t-3xl z-1 text-[10px]">
      <button
        className="flex flex-col items-center"
        onClick={() => {
          setModal(true);
        }}
      >
        <FaWallet size={20} className="text-Cinnabar" />
        Wallet
      </button>
    </nav>
  );
}

export default BottomNav;
