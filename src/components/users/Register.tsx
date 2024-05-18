import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PostAPI } from "../../backend/ApiRESTFULL/post/post";
import { toast } from "react-toastify";

const { RegisterUser } = PostAPI;

export const Register = () => {
  const navigate = useNavigate();
  const [formDataRegister, setformDataRegister] = useState({
    email: "",
    first_name: "",
    last_name: "",
    password: "",
    re_password: "",
  });

  const handleChangeRegister = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setformDataRegister((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handlesubmitRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await RegisterUser(formDataRegister);

      navigate("/await/confirmation");
      toast.success("The register has been succes", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (error) {
      console.error("Error registering user:", error);
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
    <div className="flex gradient-background flex-col gap-8 items-center justify-center h-screen">
      <div className="w-full flex flex-col max-w-lg p-8 gradient-background rounded-lg shadow-lg">
        <h2 className="text-3xl text-white mb-4 text-center">Register</h2>
        <form onSubmit={handlesubmitRegister} className="space-y-4">
          <div className="flex flex-col">
            <label htmlFor="email" className="text-white">
              Email:
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formDataRegister.email}
              onChange={handleChangeRegister}
              required
              className="input-field"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="first_name" className="text-white">
              First Name:
            </label>
            <input
              type="text"
              name="first_name"
              id="first_name"
              value={formDataRegister.first_name}
              onChange={handleChangeRegister}
              required
              className="input-field"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="last_name" className="text-white">
              Last Name:
            </label>
            <input
              type="text"
              name="last_name"
              id="last_name"
              value={formDataRegister.last_name}
              onChange={handleChangeRegister}
              required
              className="input-field"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="password" className="text-white">
              Password:
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={formDataRegister.password}
              onChange={handleChangeRegister}
              required
              className="input-field"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="re_password" className="text-white">
              Confirm Password:
            </label>
            <input
              type="password"
              name="re_password"
              id="re_password"
              value={formDataRegister.re_password}
              onChange={handleChangeRegister}
              required
              className="input-field"
            />
          </div>
          <div className="flex justify-center items-center ">
            <button
              type="submit"
              className=" bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
