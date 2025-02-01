"use client";

import React, { useState, useEffect } from "react";
import BottomNav from "./bottomNav";
import ExpenditureModal from "../modal/expenditureModal";
import DisbursementModal from "../modal/disbursementModal";
import { useAuth } from "@lib/layout/authContext";

function Dashboard() {
  const { user } = useAuth();
  const [wants, setWants] = useState<number>(0);
  const [needs, setNeeds] = useState<number>(0);
  const [leisureFunds, setLeisureFunds] = useState<number>(0);
  const [savings, setSavings] = useState<number>(0);
  const [emergencyFunds, setEmergencyFunds] = useState<number>(0);
  const [debt, setDebt] = useState<number>(0);
  const [credit, setCredit] = useState<number>(0);
  const [modal, setModal] = useState(false);
  const [bottomNav, setBottomNav] = useState(" ");
  const [holdings, setHoldings] = useState<{ name: string }[]>([]);

  // Fetch actual needs
  async function fetchTotalNeeds() {
    const response = await fetch(`/api/needs?userId=${user?.uid}`);
    const data = await response.json();

    if (response.ok) {
      setNeeds(data.totalAmount);
    } else {
      console.error("Failed to fetch total needs amount");
    }
  }

  // Fetch actual wants
  async function fetchTotalWants() {
    const response = await fetch(`/api/wants?userId=${user?.uid}`);
    const data = await response.json();

    if (response.ok) {
      setWants(data.totalAmount);
    } else {
      console.error("Failed to fetch total wants amount");
    }
  }

  // Fetch actual savings
  async function fetchTotalSavings() {
    const response = await fetch(`/api/savings?userId=${user?.uid}`);
    const data = await response.json();

    if (response.ok) {
      setSavings(data.totalAmount);
    } else {
      console.error("Failed to fetch total savings amount");
    }
  }

  // Fetch actual fun funds
  async function fetchLeisureFunds() {
    const response = await fetch("/api/leisureFunds");
    const data = await response.json();

    if (response.ok) {
      const expenseResponse = await fetch(`/api/funds?type=leisure_funds`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const funds = await expenseResponse.json();
      if (expenseResponse.ok) {
        setLeisureFunds(funds.totalAmount - data.totalAmount);
      } else {
        console.error("Failed to fetch total expenses on leisure funds amount");
      }
    } else {
      console.error("Failed to fetch total leisure funds amount");
    }
  }

  async function fetchTotalEmergencyFunds() {
    const response = await fetch("/api/emergencyFunds");
    const data = await response.json();

    if (response.ok) {
      const expenseResponse = await fetch(`/api/funds?type=emergency_funds`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const funds = await expenseResponse.json();
      if (expenseResponse.ok) {
        setEmergencyFunds(funds.totalAmount - data.totalAmount);
      } else {
        console.error("Failed to fetch total expenses on fun funds amount");
      }
    } else {
      console.error("Failed to fetch total fun funds amount");
    }
  }

  async function fetchTotalDebts() {
    const response = await fetch("/api/debts"); // This assumes you have the GET method setup on this endpoint
    const data = await response.json();
    if (response.ok) {
      const expenseResponse = await fetch("/api/debts");
      const expenses = await expenseResponse.json();
      if (expenseResponse.ok) {
        setDebt(data.totalAmount);
      } else {
        console.error("Failed to fetch total expenses on debt amount");
      }
    } else {
      console.error("Failed to fetch total debt amount");
    }
  }

  async function fetchTotalCredits() {
    const response = await fetch("/api/credits"); // This assumes you have the GET method setup on this endpoint
    const data = await response.json();
    if (response.ok) {
      const expenseResponse = await fetch("/api/credits");
      const expenses = await expenseResponse.json();
      if (expenseResponse.ok) {
        setCredit(data.totalAmount);
      } else {
        console.error("Failed to fetch total expenses on credit amount");
      }
    } else {
      console.error("Failed to fetch total credit amount");
    }
  }

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
    if (user?.uid) {
      fetchHoldings();
    }
    fetchTotalWants();
    fetchTotalNeeds();
    fetchTotalSavings();
    // fetchLeisureFunds();
    // fetchTotalEmergencyFunds();
    // fetchTotalDebts();
    // fetchTotalCredits();
    // fetchHoldings();
  }, [user, modal]);

  return (
    <div className="text-[whitesmoke] h-[100vh] flex flex-col gap-6 py-5 px-7 mb-10">
      {modal && bottomNav === "tracker" && (
        <ExpenditureModal
          modal={modal}
          setModal={setModal}
          holdings={holdings}
        />
      )}
      {modal && bottomNav === "savings" && (
        <DisbursementModal
          modal={modal}
          setModal={setModal}
          holdings={holdings}
        />
      )}
      <>
        {/* Needs */}
        <div className="px-3 border-l-2 border-Firebrick flex flex-col">
          <span className="text-gray-500 font-semibold text-[14px] mb-[-10px]">
            Needs
          </span>
          <div className="flex gap-2">
            <span className="text-[20px] flex items-center text-gray-600">
              Php
            </span>
            <span className=" text-[24px] text-Cinnabar font-bold">
              {needs.toFixed(2)}
            </span>
          </div>
        </div>
        {/* Wants */}
        <div className="px-3 border-l-2 border-Firebrick flex flex-col">
          <span className="text-gray-500 font-semibold text-[14px] mb-[-10px]">
            Wants
          </span>
          <div className="flex gap-2">
            <span className="text-[20px] flex items-center text-gray-600">
              Php
            </span>
            <span className=" text-[24px] text-Cinnabar font-bold">
              {wants.toFixed(2)}
            </span>
          </div>
        </div>
        {/* Savings */}
        <div className="px-3 border-l-2 border-Firebrick flex flex-col">
          <span className="text-gray-500 font-semibold text-[14px] mb-[-10px]">
            Savings
          </span>
          <div className="flex gap-2">
            <span className="text-[20px] flex items-center text-gray-600">
              Php
            </span>
            <span className=" text-[24px] text-Cinnabar font-bold">
              {savings.toFixed(2)}
            </span>
          </div>
        </div>
        {/* Leisure Funds */}
        {/* <div className="px-3 border-l-2 border-Firebrick flex flex-col">
          <span className="text-gray-500 font-semibold text-[14px] mb-[-10px]">
            Leisure Funds
          </span>
          <div className="flex gap-2">
            <span className="text-[20px] flex items-center text-gray-600">
              Php
            </span>
            <span className=" text-[24px] text-Cinnabar font-bold">
              {leisureFunds.toFixed(2)}
            </span>
          </div>
        </div> */}
        {/* Emergency Funds */}
        {/* <div className="px-3 border-l-2 border-Firebrick flex flex-col">
          <span className="text-gray-500 font-semibold text-[14px] mb-[-10px]">
            Emergency Funds
          </span>
          <div className="flex gap-2">
            <span className="text-[20px] flex items-center text-gray-600">
              Php
            </span>
            <span className=" text-[24px] text-Cinnabar font-bold">
              {emergencyFunds.toFixed(2)}
            </span>
          </div>
        </div> */}
        {/* Payables */}
        {/* <div className="px-3 border-l-2 border-Firebrick flex flex-col">
          <span className="text-gray-500 font-semibold text-[14px] mb-[-10px]">
            Payables
          </span>
          <div className="flex gap-2">
            <span className="text-[20px] flex items-center text-gray-600">
              Php
            </span>
            <span className=" text-[24px] text-Cinnabar font-bold">
              {debt.toFixed(2)}
            </span>
          </div>
        </div> */}
        {/* Receivables */}
        {/* <div className="px-3 border-l-2 border-Firebrick flex flex-col">
          <span className="text-gray-500 font-semibold text-[14px] mb-[-10px]">
            Receivables
          </span>
          <div className="flex gap-2">
            <span className="text-[20px] flex items-center text-gray-600">
              Php
            </span>
            <span className=" text-[24px] text-Cinnabar font-bold">
              {credit.toFixed(2)}
            </span>
          </div>
        </div> */}
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
