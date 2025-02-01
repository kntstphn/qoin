"use client";

import React, { useState, useEffect } from "react";
import WalletContainer from "./walletContainer";
import { useAuth } from "@lib/layout/authContext";

function Holdings() {
  const { user } = useAuth();
  const [holdings, setHoldings] = useState([]);

  async function fetchHoldingsData() {
    try {
      const endpoints = [
        "wants",
        "savings",
        "needs",
        "emergency_funds",
        "leisure_funds",
      ];

      const fetchRequests = endpoints.map((type) =>
        fetch(`/api/${type}?userId=${user?.uid}`).then((res) => res.json())
      );

      const results = await Promise.all(fetchRequests);

      console.log("KENT results:", results); // ✅ Logs fetched data

      // Extract and combine all 'documents' arrays
      const combinedData = results.flatMap((result) => result.documents || []);

      console.log("KENT combinedData:", combinedData); // ✅ Logs combined documents

      // Group by wallet name and sum the amounts
      const groupedHoldings = combinedData.reduce((acc: any, item: any) => {
        if (!acc[item.wallet]) {
          acc[item.wallet] = {
            wallet: item.wallet,
            totalAmount: 0,
          };
        }
        acc[item.wallet].totalAmount += item.amount;
        return acc;
      }, {});

      const holdingsArray = Object.values(groupedHoldings); // Convert grouped object to array

      console.log("KENT groupedHoldings:", holdingsArray); // ✅ Logs grouped holdings

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
    <div className="text-[whitesmoke] h-full flex flex-col justify-around gap-6 py-5 px-7 mb-10">
      {holdings.map((holding: any) => (
        <WalletContainer
          key={holding.wallet}
          bank={holding.wallet} // Pass wallet name
          totalAmount={holding.totalAmount} // Pass total amount for that wallet
        />
      ))}
    </div>
  );
}

export default Holdings;
