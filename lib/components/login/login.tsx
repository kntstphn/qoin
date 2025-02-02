"use client";

import React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@lib/firebase/config";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message);
    }
  };
  return (
    <div className="text-[whitesmoke] flex lg:flex-row flex-col justify-center global-container lg:px-[200px] lg:pt-[100px] w-full h-[100vh]">
      <div className="flex w-full lg:h-[500px] bg-[#232b2b] justify-center items-center p-5 rounded-3xl">
        <form className="flex flex-col w-[90%]" onSubmit={handleLogin}>
          <label className="mb-2" htmlFor="username">
            Username
          </label>
          <input
            type="text"
            id="email"
            className="p-2 mb-4 border border-gray-300 rounded"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
          <label className="mb-2" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="p-2 mb-4 border border-gray-300 rounded"
          />
          <button
            type="submit"
            className="p-2 mt-4 text-white bg-gray-700 rounded-lg"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
