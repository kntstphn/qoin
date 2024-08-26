"use client";

import React, { useState, useEffect } from "react";
import BottomNav from "./bottomNav";
import { Console } from "console";
import TrackerModal from "../modal/trackerModal";

function Dashboard() {
  const [wants, setWants] = useState<number>(0);
  const [needs, setNeeds] = useState<number>(0);
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

  async function fetchTotalWants() {
    const response = await fetch("/api/wants"); // This assumes you have the GET method setup on this endpoint
    const data = await response.json();
    if (response.ok) {
      const expenseResponse = await fetch("/api/expenses/wants");
      const expenses = await expenseResponse.json();
      if (expenseResponse.ok) {
        setWants(data.totalAmount - expenses.totalAmount);
      } else {
        console.error("Failed to fetch total expenses on needs amount");
      }
    } else {
      console.error("Failed to fetch total wants amount");
    }
  }

  async function fetchTotalNeeds() {
    const response = await fetch("/api/needs"); // This assumes you have the GET method setup on this endpoint
    const data = await response.json();
    if (response.ok) {
      const expenseResponse = await fetch("/api/expenses/needs");
      const expenses = await expenseResponse.json();
      if (expenseResponse.ok) {
        setNeeds(data.totalAmount - expenses.totalAmount);
      } else {
        console.error("Failed to fetch total expenses on needs amount");
      }
    } else {
      console.error("Failed to fetch total needs amount");
    }
  }

  useEffect(() => {
    fetchTotalWants();
    fetchTotalNeeds();
  });

  return (
    <div className="text-[whitesmoke] h-full flex flex-col justify-around gap-10 py-5 px-7">
      {bottomNav === "tracker" && (
        <TrackerModal modal={modal} setModal={setModal} />
      )}
      <>
        <div className="px-3 border-l-2 border-Firebrick flex flex-col">
          <span className="text-gray-500 font-semibold text-[14px] mb-[-10px]">
            Wants
          </span>
          <div className="flex gap-2">
            <span className="text-[20px] flex items-center text-gray-600">
              Php
            </span>
            <span className=" text-[24px] text-Cinnabar font-bold">
              {wants}
            </span>
          </div>
        </div>
        <div className="px-3 border-l-2 border-Firebrick flex flex-col">
          <span className="text-gray-500 font-semibold text-[14px] mb-[-10px]">
            Needs
          </span>
          <div className="flex gap-2">
            <span className="text-[20px] flex items-center text-gray-600">
              Php
            </span>
            <span className=" text-[24px] text-Cinnabar font-bold">
              {needs}
            </span>
          </div>
        </div>
        <div className="px-3 border-l-2 border-Firebrick flex flex-col">
          <span className="text-gray-600 text-[14px] mb-[-10px]">Savings</span>
          <span className=" text-[24px] text-Cinnabar">Php 12000</span>
        </div>
        <div className="px-3 border-l-2 border-Firebrick flex flex-col">
          <span className="text-gray-600 text-[14px] mb-[-10px]">Debt</span>
          <span className=" text-[24px] text-Cinnabar">Php 12000</span>
        </div>
        <div className="px-3 border-l-2 border-Firebrick flex flex-col">
          <span className="text-gray-600 text-[14px] mb-[-10px]">Credit</span>
          <span className=" text-[24px] text-Cinnabar">Php 12000</span>
        </div>
        <div className="px-3 border-l-2 border-Firebrick flex flex-col">
          <span className="text-gray-600 text-[14px] mb-[-10px]">
            Emergency Funds
          </span>
          <span className=" text-[24px] text-Cinnabar">Php 12000</span>
        </div>
        <div className="px-3 border-l-2 border-Firebrick flex flex-col">
          <span className="text-gray-600 text-[14px] mb-[-10px] ">
            Travel Budget
          </span>
          <span className=" text-[24px] text-Cinnabar">Php 12000</span>
        </div>
      </>

      {!modal && (
        <BottomNav
          setModal={setModal}
          setBottomNav={setBottomNav}
          bottomNav={bottomNav}
        />
      )}
    </div>
  );
}

export default Dashboard;
