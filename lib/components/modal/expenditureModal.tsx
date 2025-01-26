import React, { useState } from "react";

function ExpenditureModal({ modal, setModal, holdings }: ExpenditureModal) {
  const [amount, setAmount] = useState("");
  const [remarks, setRemarks] = useState("");
  const [timestamp, setTimestamp] = useState("");
  const [wallet, setWallet] = useState("");
  const [type, setType] = useState("");
  const [errors, setErrors] = useState({
    amount: false,
    remarks: false,
    timestamp: false,
    type: false,
    wallet: false,
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault(); // Prevent the default form submission behavior

    // Check for empty fields and highlight them
    setErrors({
      amount: !amount,
      remarks: !remarks,
      timestamp: !timestamp,
      type: !type,
      wallet: !wallet,
    });

    // If any field is empty, prevent submission
    if (!amount || !remarks || !timestamp || !type || !wallet) {
      return;
    }

    try {
      const url = `/api/${type}`;

      // Make a POST request to the API
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: Number(amount),
          remarks,
          timestamp,
          wallet,
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
                Expenditure Form
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
                  <label htmlFor="remarks">Remarks</label>
                  <textarea
                    id="remarks"
                    rows={3}
                    className={`p-2 border rounded text-DarkCharcoal ${
                      errors.remarks
                        ? "border-red-500 border-2"
                        : "border-gray-300"
                    }`}
                    value={remarks}
                    onChange={(e) => {
                      setRemarks(e.target.value);
                      handleInputChange("remarks", e.target.value);
                    }}
                  />
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

export default ExpenditureModal;
