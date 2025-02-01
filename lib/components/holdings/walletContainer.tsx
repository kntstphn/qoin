import React, { useEffect, useState } from "react";

function WalletContainer({ bank, id }: WalletContainer) {
  const [amount, setAmount] = useState(0);
  const [expenses, setExpenses] = useState(0);

  async function fetchWalletExpenses() {
    const needsExpenses = await fetch(`/api/needs/byWallet?wallet=${bank}`);
    // const wantsExpenses = await fetch(`/api/wants/byWallet?wallet=${bank}`);
    // const savingsExpenses = await fetch(`/api/savings/byWallet?wallet=${bank}`);
    // const emergencyExpenses = await fetch(
    //   `/api/emergencyFunds/byWallet?wallet=${bank}`
    // );
    // const leisureExpenses = await fetch(
    //   `/api/leisureFunds/byWallet?wallet=${bank}`
    // );

    if (
      needsExpenses.ok
      // wantsExpenses.ok &&
      // savingsExpenses.ok &&
      // emergencyExpenses.ok &&
      // leisureExpenses.ok
    ) {
      const needs = await needsExpenses.json();
      // const wants = await wantsExpenses.json();
      // const savings = await savingsExpenses.json();
      // const emergency = await emergencyExpenses.json();
      // const leisure = await leisureExpenses.json();

      setExpenses(
        needs.totalAmount
        // wants.totalAmount +
        // savings.totalAmount +
        // emergency.totalAmount +
        // leisure.totalAmount
      );

      console.log("Expenses " + bank + ": " + expenses);
    }
  }

  async function fetchTotalWallet() {
    const expenseResponse = await fetch(`/api/funds/byWallet?wallet=${bank}`);
    const funds = await expenseResponse.json();

    if (expenseResponse.ok) {
      setAmount(funds.totalAmount - expenses);
    } else {
      console.error("Failed to fetch total expenses on needs amount");
    }
  }

  useEffect(() => {
    fetchWalletExpenses();
    fetchTotalWallet();
  }, []);

  return (
    <div className="px-3 border-l-2 border-Firebrick flex flex-col gap-4">
      <span className="text-gray-500 font-semibold text-[25px] mb-[-10px]">
        {bank}
      </span>
      <div className="flex gap-2 bg-gray-950 bg-opacity-15 px-3 py-2 rounded-lg">
        <span className="text-[20px] flex items-center text-gray-600">Php</span>
        <span className=" text-[24px] text-Cinnabar font-bold">
          {amount.toFixed(2)}
        </span>
      </div>
    </div>
  );
}

export default WalletContainer;
