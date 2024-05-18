import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { API_URL } from "../../../config";
import axios from "axios";
import { toast } from "react-toastify";

export const ChangePassword = () => {
  const { uid, token } = useParams();
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [reNewPassword, setReNewPassword] = useState("");

  const handleNewPasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNewPassword(event.target.value);
  };

  const handleReNewPasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setReNewPassword(event.target.value);
  };

  const ResetNewPasswordAPI = async () => {
    try {
      if (newPassword === reNewPassword) {
        const response = await axios.post(
          `${API_URL}/auth/users/reset_password_confirm/`,
          {
            uid: uid,
            token: token,
            new_password: newPassword,
            re_new_password: reNewPassword,
          }
        );
        console.log(response.data);
        navigate("/login");
        toast.success("The new password has been Changed", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (error) {
      console.error(
        "Erreur lors de la réinitialisation du mot de passe :",
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
      throw error;
    }
  };

  return (
    <>
      <div className="flex gradient-background flex-col gap-8 items-center justify-center h-screen">
        <div className="w-full flex flex-col max-w-lg p-8 gap-8 gradient-background rounded-lg shadow-lg">
          <h2 className="text-3xl text-white mb-4 text-center">
            Changement de votre mot de passe
          </h2>
          <input
            type="password"
            value={newPassword}
            onChange={handleNewPasswordChange}
            placeholder="Nouveau mot de passe"
            className="rounded-lg text-lg p-3 border border-gray-300 focus:border-blue-500 outline-none"
          />
          <input
            type="password"
            value={reNewPassword}
            onChange={handleReNewPasswordChange}
            placeholder="Confirmer le nouveau mot de passe"
            className="rounded-lg text-lg p-3 border border-gray-300 focus:border-blue-500 outline-none"
          />
          <button
            onClick={ResetNewPasswordAPI}
            className=" bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
          >
            Réinitialiser le mot de passe
          </button>
        </div>
      </div>
    </>
  );
};
