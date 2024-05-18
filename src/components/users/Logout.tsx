import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import { userAtom } from "../../stores/userAtom";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Logout = () => {
  const navigate = useNavigate();
  const [, setUser] = useAtom(userAtom);

  const logoutOn = async () => {
    try {
      Cookies.remove("access_token");

      setUser({
        id: "",
        first_name: "",
        last_name: "",
        email: "",
        isAuth: false,
      });
      navigate("/");
      toast.success("The Logout has been succes", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (error) {
      console.error(
        "Une erreur s'est produite lors de la déconnexion :",
        error
      );
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
  };

  useEffect(() => {
    logoutOn();
  }, []);

  return (
    <div>
      <button onClick={logoutOn}>Logout</button>
    </div>
  );
};
