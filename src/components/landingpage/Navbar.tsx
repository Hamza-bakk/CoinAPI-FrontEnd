import { useAtom } from "jotai";
import { userAtom } from "../../stores/userAtom";
import React, { useState } from "react";

export const Navbar = () => {
  const [user] = useAtom(userAtom);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const handleHBClick = () => {
    window.location.href = "/";
  };

  const handleDropdownClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <>
      <nav className="flex gradient-background p-4 w-full">
        <div className="flex flex-row items-center justify-between w-full">
          <div className="flex h-full w-3/12 justify-center rounded-lg items-center">
            <div
              onClick={handleHBClick}
              className="cursor-pointer rounded-full bg-white h-10 w-10 flex items-center justify-center text-black font-bold"
            >
              HB
            </div>
          </div>
          <div className="flex flex-row w-9/12 justify-around sm:gap-4 text-center items-center">
            <a
              href="/"
              className="text-white font-bold sm:text-sm hover:underline"
            >
              ABOUT ME            
              </a>
            <a
              href="/"
              className="text-white font-bold  sm:text-sm  hover:underline"
            >
              CONTACT
            </a>
            {user.id == "" ? ( // Vérifier si l'ID de l'utilisateur est défini
              <a
                href="/login"
                className="text-white font-bold sm:text-sm hover:underline"
              >
                LOGIN
              </a>
            ) : (
              <div className="flex relative ">
                <button
                  onClick={handleDropdownClick}
                  className="text-white font-bold sm:text-sm hover:underline items-center"
                >
                SETTING                
              </button>
                {isDropdownOpen && (
                  <div
                    className="flex absolute flex-col backdrop:items-center justify-center text-center top-full left-1/2 transform -translate-x-1/2 min-w-max marker gradient-background shadow-lg rounded-md"
                  >
                   <a
                      href="/user/account"
                      className="block px-4 py-2 mt-2 text-gray-200 hover:bg-gray-500"
                    >
                      PROFILE
                    </a>
                    <a
                      href="/logout"
                      className="block px-4 py-2 mt-2 text-gray-200 hover:bg-gray-500">
                      LOGOUT
                    </a>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};