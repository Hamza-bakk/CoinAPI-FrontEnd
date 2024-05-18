import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { DeleteApi } from "../../backend/ApiRESTFULL/delete/delete";
import { useAtom } from "jotai";
import { userAtom } from "../../stores/userAtom";
import { toast } from "react-toastify";

const { DeleteUserAPI } = DeleteApi;

export const DeleteProfile = () => {
  const [userData, setUserData] = useState({
    current_password: "",
  });
  const [user] = useAtom(userAtom);
  const navigate = useNavigate();

  const handleChangeUserForm = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setUserData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const token = Cookies.get("access_token");
      if (!token) {
        console.error("No token found");
        return;
      }
      console.log(userData, token);
      
      await DeleteUserAPI(token, userData);
      Cookies.remove("access_token")
      navigate("/");
      toast.success('Account has been Deleted', {
        position: 'top-right',
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    
     
    
    } catch (error) {
      console.error("An error occurred during delete User:", error);
      toast.error('A problem has Occured', {
        position: 'top-right',
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      // Display error to the user
    }
  };



  useEffect(() => {
    if (!user.id) {
      navigate("/login");
    }
  }, [user, navigate]);

  return (
    <>
      {user.id && (
        <div className="flex gradient-background flex-col items-center justify-center h-screen">
          <div className="w-full gradient-background max-w-lg p-8 gap-8 flex flex-col text-center bg-white rounded-lg shadow-lg transition-all duration-300 ease-in-out hover:shadow-xl">
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col mt-12">
                <span className="flex flex-col justify-start text-start items-start  font-bold text-red-700">
                  * The password is required for a successful operation
                </span>
                <input
                  type="password"
                  name="current_password"
                  value={userData.current_password}
                  onChange={handleChangeUserForm}
                  className="flex border border-gray-300 rounded-md p-2 justify-start text-start items-start"
                />
              </div>
              <button
                type="submit"
                className="bg-blue-500 text-white p-2 rounded-md mt-4"
              >
                Delete User
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
