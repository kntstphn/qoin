"use client";

import React, { useState, useEffect } from "react";
import BottomNav from "./bottomNav";
import { Console } from "console";
import TrackerModal from "../modal/trackerModal";
import SavingsModal from "../modal/savingsModal";

function Dashboard() {
  const [wants, setWants] = useState<number>(0);
  const [needs, setNeeds] = useState<number>(0);
  const [travelBudget, setTravelBudget] = useState<number>(0);
  const [savings, setSavings] = useState<number>(0);
  const [modal, setModal] = useState(false);
  const [bottomNav, setBottomNav] = useState(" ");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Convert the input value to a number
    const value = e.target.value === "" ? 0 : Number(e.target.value);
    setWants(value);
  };

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

  async function fetchTotalSavings() {
    const response = await fetch("/api/savings"); // This assumes you have the GET method setup on this endpoint
    const data = await response.json();
    if (response.ok) {
      const expenseResponse = await fetch("/api/expenses/savings");
      const expenses = await expenseResponse.json();
      if (expenseResponse.ok) {
        setSavings(data.totalAmount - expenses.totalAmount);
      } else {
        console.error("Failed to fetch total expenses on savings amount");
      }
    } else {
      console.error("Failed to fetch total savings amount");
    }
  }

  async function fetchTotalTravelBudget() {
    const response = await fetch("/api/travelFunds"); // This assumes you have the GET method setup on this endpoint
    const data = await response.json();
    if (response.ok) {
      const expenseResponse = await fetch("/api/expenses/travelFunds");
      const expenses = await expenseResponse.json();
      if (expenseResponse.ok) {
        setTravelBudget(data.totalAmount - expenses.totalAmount);
      } else {
        console.error("Failed to fetch total expenses on travel budget amount");
      }
    } else {
      console.error("Failed to fetch total travel budget amount");
    }
  }

  useEffect(() => {
    fetchTotalWants();
    fetchTotalNeeds();
    fetchTotalSavings();
    fetchTotalTravelBudget();
  });

  return (
    <div className="text-[whitesmoke] h-full flex flex-col justify-around gap-10 py-5 px-7">
      {modal && bottomNav === "tracker" && (
        <TrackerModal modal={modal} setModal={setModal} />
      )}
      {modal && bottomNav === "savings" && (
        <SavingsModal modal={modal} setModal={setModal} bottomNav={bottomNav} />
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
          <span className="text-gray-500 font-semibold text-[14px] mb-[-10px]">
            Savings
          </span>
          <div className="flex gap-2">
            <span className="text-[20px] flex items-center text-gray-600">
              Php
            </span>
            <span className=" text-[24px] text-Cinnabar font-bold">
              {savings}
            </span>
          </div>
        </div>
        <div className="px-3 border-l-2 border-Firebrick flex flex-col">
          <span className="text-gray-500 font-semibold text-[14px] mb-[-10px]">
            Travel Funds
          </span>
          <div className="flex gap-2">
            <span className="text-[20px] flex items-center text-gray-600">
              Php
            </span>
            <span className=" text-[24px] text-Cinnabar font-bold">
              {" "}
              {travelBudget}
            </span>
          </div>
        </div>
        <div className="px-3 border-l-2 border-Firebrick flex flex-col">
          <span className="text-gray-500 font-semibold text-[14px] mb-[-10px]">
            Emergency Funds
          </span>
          <div className="flex gap-2">
            <span className="text-[20px] flex items-center text-gray-600">
              Php
            </span>
            <span className=" text-[24px] text-Cinnabar font-bold">0</span>
          </div>
        </div>
        <div className="px-3 border-l-2 border-Firebrick flex flex-col">
          <span className="text-gray-600 text-[14px] mb-[-10px]">Debt</span>
          <span className=" text-[24px] text-Cinnabar">Php 12000</span>
        </div>
        <div className="px-3 border-l-2 border-Firebrick flex flex-col">
          <span className="text-gray-600 text-[14px] mb-[-10px]">Credit</span>
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
