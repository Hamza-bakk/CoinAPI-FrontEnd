import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { PostAPI } from "../../backend/ApiRESTFULL/post/post";
import { toast } from "react-toastify";

const { SetNewPasswordAPI } = PostAPI;

export const NewPassword = () => {
  const [cookies] = useCookies(["access_token"]);
  const navigate = useNavigate();
  const [formDataPassword, setFormDataPassword] = useState({
    current_password: "",
    new_password: "",
    re_new_password: "",
  });

  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormDataPassword((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmitNewPassword = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    try {
      const token = cookies["access_token"];
      if (!token) {
        console.error("No token found");
        return;
      }

      await SetNewPasswordAPI(token, formDataPassword);
      navigate("/confirm/password");
      toast.success("The password has been Changed", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (error) {
      console.error("An error occurred during password change:", error);
      // Display error to the user
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

  return (
    <div className="flex gradient-background flex-col items-center justify-center h-screen">
      <div className="flex w-full border-spacing-8 flex-col max-w-lg p-8 gap-8 gradient-background text-center rounded-lg shadow-lg">
        <form
          onSubmit={handleSubmitNewPassword}
          className="flex flex-col space-y-4"
        >
          <input
            name="current_password"
            id="current_password"
            type="password"
            placeholder="Current password"
            value={formDataPassword.current_password}
            onChange={handleChangePassword}
            className="flex border border-gray-300 rounded-md p-2 justify-start text-start items-start"
          />
          <input
            name="new_password"
            id="new_password"
            type="password"
            placeholder="New password"
            value={formDataPassword.new_password}
            onChange={handleChangePassword}
            className="flex border border-gray-300 rounded-md p-2 justify-start text-start items-start"
          />
          <input
            name="re_new_password"
            id="re_new_password"
            type="password"
            placeholder="New password again"
            value={formDataPassword.re_new_password}
            onChange={handleChangePassword}
            className="flex border border-gray-300 rounded-md p-2 justify-start text-start items-start"
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
};
