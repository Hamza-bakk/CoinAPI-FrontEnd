import React, { useEffect } from "react";
import { useAtom } from "jotai";
import { useNavigate } from "react-router-dom";
import { userAtom } from "../../stores/userAtom";
import { toast } from "react-toastify";

export const SettingForm = () => {
  const [user] = useAtom(userAtom);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user.id) {
      navigate("/login");
      toast.error("A problem has Occured", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }, [user, navigate]);

  return (
    <>
      {user.id && (
        <div className="flex gradient-background flex-col items-center justify-center h-screen">
          <div className=" w-full gradient-background max-w-lg p-8 gap-8 flex flex-col text-center bg-white rounded-lg shadow-lg transition-all duration-300 ease-in-out hover:shadow-xl">
            <a
              href="/edit/profil"
              className="text-white border-double border-4 border-sky-500 font-bold text-lg sm:text-sm hover:underline transition-colors duration-300 ease-in-out"
            >
              Edit Account
            </a>
            <a
              href="/change/password"
              className="text-white  border-double border-4 border-sky-500 font-bold text-lg sm:text-sm hover:underline transition-colors duration-300 ease-in-out"
            >
              Change Password
            </a>
            <a
              href="/delete/user"
              className="text-white  border-double border-4 border-sky-500 font-bold text-lg sm:text-sm hover:underline transition-colors duration-300 ease-in-out"
            >
              Delete Account
            </a>
          </div>
        </div>
      )}
    </>
  );
};
