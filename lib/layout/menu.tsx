import Image from "next/image";
import React from "react";
import Logo from "@images/logo.png";
import { useAuth } from "@lib/layout/authContext";
import { GiHamburgerMenu } from "react-icons/gi";

function Menu() {
  const [showMenu, setShowMenu] = React.useState(false);
  const { user, loading } = useAuth();

  return (
    <div className="sticky flex px-5 lg:px-10 py-3 justify-between items-center w-full bg-PearlRiver">
      <a href="/">Insert LOGo</a>
      {!user && !loading && (
        <div className="text-black flex gap-5 lg:gap-10">
          <a href="/login">Login</a>
        </div>
      )}
      {user && (
        <div className="text-white text-[20px] hidden lg:flex gap-10">
          <a href="/dashboard">Dashboard</a>
          <a href="/expenses">Expenses</a>
          <a href="/balances">Balances</a>
          <button>Logout</button>
        </div>
      )}
      {user && (
        <>
          <GiHamburgerMenu
            className="text-white lg:hidden w-auto h-[30px]"
            onClick={() => setShowMenu(!showMenu)}
          />
          {showMenu && (
            <div className="text-white fixed flex flex-col h-full w-[80%] gap-10 top-0 bottom-0 right-0 bg-red-300 p-5">
              <div
                className="flex w-full justify-end"
                onClick={() => setShowMenu(!showMenu)}
              >
                X
              </div>
              <a href="/dashboard">Dashboard</a>
              <a href="/expenses">Expenses</a>
              <a href="/balances">Balances</a>
              <button>Logout</button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Menu;
