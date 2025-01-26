"use client";

import React, { useState, useEffect } from "react";
import WalletContainer from "./walletContainer";

function Holdings() {
  const [holdings, setHoldings] = useState([]);

  async function fetchHoldings() {
    try {
      const response = await fetch("/api/holdings");

      if (!response.ok) {
        throw new Error("Failed to fetch holdings");
      }

      const data = await response.json();
      setHoldings(data);
    } catch (error) {
      // Handle any errors that occurred during the fetch
      console.error("Error fetching holdings:", error);
    }
  }

  useEffect(() => {
    fetchHoldings();
  }, []);

  return (
    <div className="text-[whitesmoke] h-full flex flex-col justify-around gap-6 py-5 px-7 mb-10">
      {holdings.map((holding: any) => (
        <WalletContainer
          key={holding.id}
          bank={holding.name}
          id={holding.documentId}
        />
      ))}
    </div>
  );
}

export default Holdings;
