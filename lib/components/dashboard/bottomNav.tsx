"use client";

import React, { useState, useEffect } from "react";
import {
  GiTakeMyMoney,
  GiMoneyStack,
  GiPiggyBank,
  GiExpense,
} from "react-icons/gi";

function BottomNav({ setModal, setBottomNav, bottomNav }: BottomNavProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-Onyx text-gray-500 text-sm font-bold flex justify-around py-2 rounded-t-3xl z-1 text-[10px]">
      <button
        className="flex flex-col items-center"
        onClick={() => {
          setModal(true);
          setBottomNav("tracker");
        }}
      >
        <GiTakeMyMoney size={24} className="text-Cinnabar" />
        Expenditure
      </button>
      <button
        className="flex flex-col items-center"
        onClick={() => {
          setModal(true);
          setBottomNav("savings");
        }}
      >
        <GiPiggyBank size={24} className="text-Cinnabar" />
        Disbursement
      </button>
    </nav>
  );
}

export default BottomNav;
