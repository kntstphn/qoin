"use client";

import React, { useState } from "react";
import BottomNav from "./bottomNav";

function Dashboard() {
  const [wants, setWants] = useState<number>(0);
  const [modal, setModal] = useState(false);
  const [bottomNav, setBottomNav] = useState(" ");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Convert the input value to a number
    const value = e.target.value === "" ? 0 : Number(e.target.value);
    setWants(value);
  };

  async function addValue({ value }: { value: number }) {
    const response = await fetch("/api/wants", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ value }),
    });

    const data = await response.json();
    console.log(data);
  }

  return (
    <div className="text-[whitesmoke] h-full">
      Dashboard yay
      <BottomNav />
    </div>
  );
}

export default Dashboard;
