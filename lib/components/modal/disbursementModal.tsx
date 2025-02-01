import React, { useState } from "react";
import { useAuth } from "@lib/layout/authContext";

function DisbursementModal({ modal, setModal, holdings }: DisbursementModal) {
  const { user } = useAuth();
  const [amount, setAmount] = useState("");
  const [timestamp, setTimestamp] = useState("");
  const [wallet, setWallet] = useState("");
  const [type, setType] = useState("");
  const [errors, setErrors] = useState({
    amount: false,
    timestamp: false,
    type: false,
    wallet: false,
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault(); // Prevent default form submission

    // Validate form fields
    setErrors({
      amount: !amount,
      timestamp: !timestamp,
      type: !type,
      wallet: !wallet,
    });

    if (!amount || !timestamp || !type || !wallet) {
      return;
    }

    try {
      // Fetch existing funds
      const checkExistingFunds = await fetch(
        `/api/${type}/byWallet?userId=${user?.uid}&wallet=${wallet}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const existingFunds = await checkExistingFunds.json();
      console.log("Existing Funds:", existingFunds); // Debugging log

      let updatedAmount = Number(amount); // Convert input to number

      // If funds exist, add to existing amount
      if (
        Array.isArray(existingFunds?.documents) &&
        existingFunds.documents.length > 0
      ) {
        const currentAmount = Number(existingFunds.documents[0].amount || 0);
        updatedAmount += currentAmount; // Add new amount to existing
      }

      const payload = {
        userId: user?.uid,
        wallet,
        amount: updatedAmount, // Use updated amount
        updatedOn: new Date(timestamp),
      };

      let response;

      if (
        Array.isArray(existingFunds?.documents) &&
        existingFunds.documents.length > 0
      ) {
        // If funds exist, update (PUT)
        response = await fetch(`/api/${type}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });
      } else {
        // If funds don't exist, create new entry (POST)
        response = await fetch(`/api/${type}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });
      }

      const data = await response.json();

      if (response.ok) {
        console.log("Success:", data);
        setModal(false); // Close modal on success
      } else {
        console.error("Error:", data.error);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  // Update the error state when the user starts typing
  const handleInputChange = (field: string, value: string) => {
    setErrors((prevErrors) => ({
      ...prevErrors,
      [field]: value === "",
    }));
  };

  return (
    <div>
      {modal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-end">
          <div className="bg-Onyx p-4 rounded-t-lg shadow-lg w-full max-w-md">
            <div className="relative flex flex-col gap-2">
              <h1 className="text-[20px] font-bold text-Cinnabar">
                Disbursement Form
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
                    className={`p-2 border rounded text-DarkCharcoal ${
                      errors.timestamp
                        ? "border-red-500 border-2"
                        : "border-gray-300"
                    }`}
                    value={timestamp}
                    onChange={(e) => {
                      setTimestamp(e.target.value);
                      handleInputChange("timestamp", e.target.value);
                    }}
                  />
                  <label htmlFor="amount">Amount</label>
                  <input
                    type="number"
                    id="amount"
                    className={`p-2 border rounded text-DarkCharcoal ${
                      errors.amount
                        ? "border-red-500 border-2"
                        : "border-gray-300"
                    }`}
                    value={amount}
                    onChange={(e) => {
                      setAmount(e.target.value);
                      handleInputChange("amount", e.target.value);
                    }}
                  />
                  <label htmlFor="wallet">Wallet</label>
                  <select
                    id="wallet"
                    className={`p-2 border rounded text-DarkCharcoal ${
                      errors.wallet
                        ? "border-red-500 border-2"
                        : "border-gray-300"
                    }`}
                    value={wallet}
                    onChange={(e) => {
                      setWallet(e.target.value);
                      handleInputChange("wallet", e.target.value);
                    }}
                  >
                    <option value="" disabled>
                      Select a category
                    </option>
                    {holdings.map((holding, index) => (
                      <option key={index} value={holding.name}>
                        {holding.name}
                      </option>
                    ))}
                  </select>
                  <label htmlFor="type">Type</label>
                  <select
                    id="type"
                    className={`p-2 border rounded text-DarkCharcoal ${
                      errors.type
                        ? "border-red-500 border-2"
                        : "border-gray-300"
                    }`}
                    value={type}
                    onChange={(e) => {
                      setType(e.target.value);
                      handleInputChange("type", e.target.value);
                    }}
                  >
                    <option value="" disabled>
                      Select a category
                    </option>
                    <option value="needs">Needs</option>
                    <option value="wants">Wants</option>
                    <option value="savings">Savings</option>
                    <option value="leisure_funds">Leisure Funds</option>
                    <option value="emergency_funds">Emergency Funds</option>
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

export default DisbursementModal;
