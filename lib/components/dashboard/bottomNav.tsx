"use client";

import React from "react";
import {
  GiTakeMyMoney,
  GiMoneyStack,
  GiPiggyBank,
  GiExpense,
} from "react-icons/gi";

function BottomNav({ setModal, setBottomNav, bottomNav }: BottomNavProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-Onyx text-white flex justify-around py-3 rounded-t-3xl z-1">
      <button
        className="flex flex-col items-center"
        onClick={() => {
          setModal(true);
          setBottomNav("tracker");
        }}
      >
        <GiExpense size={24} className="text-Cinnabar" />
      </button>
      <button
        className="flex flex-col items-center"
        onClick={() => setModal(true)}
      >
        <GiTakeMyMoney size={24} className="text-Cinnabar" />
      </button>
      <button
        className="flex flex-col items-center"
        onClick={() => setModal(true)}
      >
        <GiMoneyStack size={24} className="text-Cinnabar" />
      </button>
      <button
        className="flex flex-col items-center"
        onClick={() => {
          setModal(true);
          setBottomNav("savings");
        }}
      >
        <GiPiggyBank size={24} className="text-Cinnabar" />
      </button>
    </nav>
  );
}

export default BottomNav;
