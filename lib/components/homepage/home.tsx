"use client";

import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "@styles/calendarStyles.css"; // Import custom styles
import TransactionContainer from "./transactionContainer";
import { useAuth } from "@lib/layout/authContext";

function Homepage() {
  const { user } = useAuth();
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [currentDate] = useState(new Date());
  const [allTransactions, setAllTransactions] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [account, setAccount] = useState({
    name: "",
  });

  const fetchTransactions = async (date?: Date) => {
    const formatDate = (date: Date) => {
      return (
        date.getFullYear() +
        "-" +
        String(date.getMonth() + 1).padStart(2, "0") +
        "-" +
        String(date.getDate()).padStart(2, "0")
      );
    };

    try {
      const formattedDate = formatDate(date || currentDate);
      const userId = user?.uid;

      const response = await fetch(
        `/api/transactions?userId=${userId}&date=${formattedDate}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch transactions");
      }

      const data = await response.json();

      setAllTransactions(data.transactions);
      setTotalAmount(data.totalAmount);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  const fetchAccount = async () => {
    try {
      const userId = user?.uid;

      const response = await fetch(`/api/profile?userId=${userId}`);

      if (!response.ok) {
        throw new Error("Failed to fetch transactions");
      }

      const data = await response.json();

      setAccount(data.account);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  const handleDateChange = (newDate: Date) => {
    setSelectedDate(newDate);
  };

  const handleViewChange = () => {
    setSelectedDate(null); // Reset selection when navigating months
  };

  useEffect(() => {
    fetchTransactions(selectedDate ? selectedDate : currentDate);
  }, [selectedDate]);

  // Fetch on mount
  useEffect(() => {
    fetchAccount();
    fetchTransactions(selectedDate ? selectedDate : currentDate);
  }, []);

  return (
    <div className="text-[whitesmoke] h-[100vh] flex flex-col gap-2 py-2 px-7 mb-5">
      <h1 className="text-xl font-bold text-[Cinnabar]">
        Welcome {account?.name}
      </h1>
      <div className="bg-opacity-40 rounded-lg">
        <Calendar
          onClickDay={handleDateChange}
          onActiveStartDateChange={handleViewChange} // Detects month/year change
          value={selectedDate || currentDate}
          tileClassName={({ date }) =>
            selectedDate && date.toDateString() === selectedDate.toDateString()
              ? "selected-date" // Highlight clicked date
              : date.toDateString() === currentDate.toDateString()
              ? "current-date" // Subtle highlight for today
              : ""
          }
          className="custom-calendar shadow-2xl"
        />
      </div>
      {!allTransactions ? (
        <div className="flex justify-center items-center h-full">
          <span className="text-gray-500">Loading transactions...</span>
        </div>
      ) : (
        <>
          {allTransactions.length > 0 && (
            <div className="flex justify-between">
              <span className="text-gray-400 flex items-center">
                Daily Transaction
              </span>
              <div>
                <span className="text-gray-500 mr-2">Php</span>
                <span className="text-Cinnabar font-semibold text-[20px]">
                  {totalAmount.toFixed(2)}
                </span>
              </div>
            </div>
          )}
          {allTransactions.map((transaction: any) => (
            <TransactionContainer
              key={transaction.id}
              transaction={transaction}
            />
          ))}
        </>
      )}
    </div>
  );
}

export default Homepage;
