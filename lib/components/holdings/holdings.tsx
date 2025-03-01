"use client";

import React, { useState, useEffect } from "react";
import WalletContainer from "./walletContainer";
import { useAuth } from "@lib/layout/authContext";
import BottomNav from "./botttomNav";
import WalletModal from "../modal/walletModal";

function Holdings() {
  const { user } = useAuth();
  const [modal, setModal] = useState(false);
  const [bottomNav, setBottomNav] = useState(" ");
  const [holdings, setHoldings] = useState<
    { wallet: string; totalAmount: number }[]
  >([]);
  const [combinedData, setCombinedData] = useState<any[]>([]);

  async function fetchHoldingsData() {
    try {
      const endpoints = [
        "wants",
        "savings",
        "needs",
        "emergency_funds",
        "leisure_funds",
      ];

      const fetchRequests = endpoints.map(
        (type) =>
          fetch(`/api/${type}?userId=${user?.uid}`)
            .then((res) => res.json())
            .then((data) =>
              (data.documents || []).map((doc: any) => ({
                ...doc,
                category: type,
              }))
            ) // Add category field
      );

      const results = await Promise.all(fetchRequests);

      // Combine all documents with their respective categories
      const combinedData = results.flat();
      setCombinedData(combinedData);

      // Group by wallet name and sum the amounts
      const groupedHoldings = combinedData.reduce<{
        [key: string]: {
          wallet: string;
          totalAmount: number;
          categories: string[];
        };
      }>((acc, item) => {
        if (!acc[item.wallet]) {
          acc[item.wallet] = {
            wallet: item.wallet,
            totalAmount: 0,
            categories: [],
          };
        }
        acc[item.wallet].totalAmount += item.amount;
        if (!acc[item.wallet].categories.includes(item.category)) {
          acc[item.wallet].categories.push(item.category);
        }
        return acc;
      }, {});

      const holdingsArray = Object.values(groupedHoldings); // Convert grouped object to array
      setHoldings(holdingsArray);
    } catch (error) {
      console.error("Error fetching holdings data:", error);
      setHoldings([]);
    }
  }

  useEffect(() => {
    fetchHoldingsData();
  }, []);

  return (
    <div className="text-[whitesmoke] h-[100vh] flex flex-col gap-6 py-5 px-7 mb-10">
      {modal && <WalletModal modal={modal} setModal={setModal} />}
      <>
        {holdings.map((holding: any) => (
          <WalletContainer
            key={holding.wallet}
            bank={holding.wallet} // Pass wallet name
            totalAmount={holding.totalAmount} // Pass total amount for that wallet
            combinedData={combinedData.filter(
              (item) => item.wallet === holding.wallet
            )}
          />
        ))}
      </>
      {!modal && <BottomNav setModal={setModal} />}
    </div>
  );
}

export default Holdings;
