import React, { useState } from "react";

function SavingsModal({ modal, setModal, bottomNav }: SavingsModal) {
  const [amount, setAmount] = useState("");
  const [timestamp, setTimestamp] = useState("");
  const [type, setType] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault(); // Prevent the default form submission behavior
    console.log(type);

    try {
      // Make a POST request to the API
      const response = await fetch(`/api/${type}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: Number(amount), // Convert to number
          timestamp,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        console.log("Success:", data);
        setModal(false); // Close the modal on successful submission
      } else {
        console.error("Error:", data.error);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
    setModal(false);
  };

  return (
    <div>
      {modal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-end">
          <div className="bg-Onyx p-4 rounded-t-lg shadow-lg w-full max-w-md">
            <div className="relative flex flex-col gap-2">
              <h1 className="text-[20px] font-bold text-Cinnabar">
                Savings Form
              </h1>
              <button
                className="absolute top-1 right-2 text-gray-400 rounded-full p-1"
                onClick={() => setModal(false)}
              >
                &times;
              </button>
              <form onSubmit={handleSubmit}>
                <div className="flex flex-col gap-2">
                  <label htmlFor="timestamp">Time Stamp</label>
                  <input
                    type="datetime-local"
                    id="timestamp"
                    className="p-2 border border-gray-300 rounded text-DarkCharcoal"
                    value={timestamp}
                    onChange={(e) => setTimestamp(e.target.value)}
                  />
                  <label htmlFor="amount">Amount</label>
                  <input
                    type="number"
                    step="0.01"
                    id="amount"
                    className="p-2 border border-gray-300 rounded text-DarkCharcoal"
                    value={amount}
                    onChange={(e) => {
                      const value = parseFloat(e.target.value);
                      if (!isNaN(value)) {
                        setAmount(value.toFixed(2)); // Format the value to 2 decimal places
                      } else {
                        setAmount(""); // Handle empty or invalid input
                      }
                    }}
                  />
                  <label htmlFor="type">Type</label>
                  <select
                    id="type"
                    className="p-2 border border-gray-300 rounded text-DarkCharcoal"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                  >
                    <option value="" disabled>
                      Select a category
                    </option>
                    <option value="needs">Needs</option>
                    <option value="wants">Wants</option>
                    <option value="savings">Savings</option>
                    <option value="emergencyFunds">Emergency Funds</option>
                    <option value="travelFunds">Travel Funds</option>
                  </select>
                  <button
                    type="submit"
                    className="bg-Cinnabar text-white p-2 rounded mt-2"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SavingsModal;
