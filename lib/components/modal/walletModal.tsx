import { useAuth } from "@/lib/layout/authContext";
import React, { useState } from "react";

function WalletModal({ modal, setModal }: WalletModal) {
  const { user } = useAuth();
  const [wallet, setWallet] = useState("");
  const [errors, setErrors] = useState({ wallet: false });

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    setErrors({ wallet: !wallet });
    if (!wallet) return;

    try {
      const response = await fetch("/api/holdings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user?.uid, name: wallet }),
      });

      if (response.ok) {
        setModal(false);
      } else {
        console.error("Error adding wallet");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div>
      {modal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-end">
          <div className="bg-Onyx p-4 rounded-t-lg shadow-lg w-full max-w-md">
            <div className="relative flex flex-col gap-2">
              <h1 className="text-[20px] font-bold text-Cinnabar">
                Wallet/Bank Form
              </h1>
              <button
                className="absolute top-1 right-2 text-gray-400 rounded-full p-1"
                onClick={() => setModal(false)}
              >
                &times;
              </button>
              <form onSubmit={handleSubmit}>
                <div className="flex flex-col gap-2">
                  <label htmlFor="wallet">Add Wallet</label>
                  <input
                    type="text"
                    id="wallet"
                    className={`p-2 border rounded text-DarkCharcoal ${
                      errors.wallet
                        ? "border-red-500 border-2"
                        : "border-gray-300"
                    }`}
                    value={wallet}
                    onChange={(e) => setWallet(e.target.value)}
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

export default WalletModal;
