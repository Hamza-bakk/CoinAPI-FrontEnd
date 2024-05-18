import React, { useEffect, useState } from "react";
import { userAtom } from "../../stores/userAtom";
import { useAtom } from "jotai";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { PutApi } from "../../backend/ApiRESTFULL/put/put";
import { toast } from "react-toastify";

const { EditProfileAPI } = PutApi;

export const EditProfile = () => {
  const [user] = useAtom(userAtom);
  const [cookies] = useCookies(["access_token"]);

  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    first_name: user.first_name,
    last_name: user.last_name || "",
    email: user.email,
    password: "",
  });

  useEffect(() => {
    if (!user.id) {
      navigate("/login");
    }
  }, [user, navigate]);

  const handleChangeUserForm = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name !== "email") {
      setUserData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const token = cookies["access_token"];
      if (!token) {
        console.error("No token found");
        return;
      }
      await EditProfileAPI(token, userData);
      navigate("/user/account");
      toast.success('The profile has been Edited', {
    position: 'top-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
    } catch (error) {
      console.error("An error occurred during password change:", error);
    toast.error('A problem has Occured', {
    position: 'top-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
    }
  };


  

 
  return (
    <>
      {user.id && (
        <div className="flex gradient-background flex-col items-center justify-center h-screen">
          <div className="w-full gradient-background max-w-lg p-8 gap-8 flex flex-col text-center bg-white rounded-lg shadow-lg transition-all duration-300 ease-in-out hover:shadow-xl">
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col gap-4">
                <p className="flex flex-col justify-start text-start items-start text-white font-bold">
                  First name
                </p>
                <input
                  type="text"
                  name="first_name"
                  value={userData.first_name}
                  onChange={handleChangeUserForm}
                  className="flex border border-gray-300 rounded-md p-2 justify-start text-start items-start"
                />

                <p className="flex flex-col justify-start text-start items-start text-white font-bold">
                  Last name
                </p>

                <input
                  type="text"
                  name="last_name"
                  value={userData.last_name}
                  onChange={handleChangeUserForm}
                  className="flex border border-gray-300 rounded-md p-2 justify-start text-start items-start"
                />

                <p className="flex flex-col justify-start text-start items-start text-white font-bold">
                  Email (change not possible)
                </p>
                <input
                  type="email"
                  name="email"
                  value={userData.email}
                  className="flex border border-gray-300 rounded-md p-2 justify-start text-start items-start"
                  disabled
                />
              </div>
              <div className="flex flex-col mt-12">
                <span className="flex flex-col justify-start text-start items-start  font-bold text-red-700">
                  * The password is required for a successful operation
                </span>
                <input
                  type="password"
                  name="password"
                  value={userData.password}
                  onChange={handleChangeUserForm}
                  className="flex border border-gray-300 rounded-md p-2 justify-start text-start items-start"
                />
              </div>
              <button
                type="submit"
                className="bg-blue-500 text-white p-2 rounded-md mt-4"
              >
                Update Profile
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
