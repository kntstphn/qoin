"use client";

import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "@styles/calendarStyles.css"; // Import custom styles

function Homepage() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [currentDate] = useState(new Date());

  const handleDateChange = (newDate: Date) => {
    setSelectedDate(newDate);
  };

  const handleViewChange = () => {
    setSelectedDate(null); // Reset selection when navigating months
  };

  return (
    <div className="text-[whitesmoke] h-[100vh] flex flex-col gap-6 py-5 px-7 mb-10">
      <h1 className="text-xl font-bold text-[Cinnabar]">Home</h1>
      <div className="bg-opacity-40 rounded-lg p-4">
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
    </div>
  );
}

export default Homepage;
