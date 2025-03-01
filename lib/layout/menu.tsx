import Image from "next/image";
import React from "react";
import Logo from "@images/QoinLogo.png";
import { useAuth } from "@lib/layout/authContext";
import { GiHamburgerMenu } from "react-icons/gi";
import { signOut } from "firebase/auth";
import { auth } from "@lib/firebase/config";

function Menu() {
  const [showMenu, setShowMenu] = React.useState(false);
  const { user, loading } = useAuth();

  const handleLogout = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {
        console.error("Error signing out: ", error);
      });
  };

  return (
    <div className="flex bottom-0 top-10 px-5 lg:px-10 py-3 justify-between items-center w-full rounded-b-3xl">
      <a href="/">
        <Image src={Logo} alt="logo" width={45} height={45} />
      </a>
      {!user && !loading && (
        <div className="text-black flex gap-5 lg:gap-10">
          <a href="/login">Login</a>
        </div>
      )}
      {user && (
        <div className="text-black text-[20px] hidden lg:flex gap-10">
          <a href="/dashboard">Dashboard</a>
          <a href="/holdings">Holdings</a>
          <a href="/balances">Balances</a>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
      {user && (
        <>
          <GiHamburgerMenu
            className="flex lg:hidden w-auto h-[20px] text-3xl text-Cinnabar"
            onClick={() => setShowMenu(!showMenu)}
          />
          {showMenu && (
            <div className="bg-black/50 fixed top-0 bottom-0 left-0 right-0 w-full z-10">
              <div className="text-gray-400 fixed flex flex-col h-full w-[80%] gap-5 top-0 bottom-0 right-0 bg-slate-950/95 p-5 z-50 rounded-l-3xl">
                <div
                  className="flex w-full justify-end"
                  onClick={() => setShowMenu(!showMenu)}
                >
                  X
                </div>
                <a href="/dashboard">Dashboard</a>
                <a href="/holdings">Holdings</a>
                <a href="/balances">Balances</a>
                <button onClick={handleLogout}>Logout</button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Menu;
