import React, { useState } from "react";
import { useAtom } from "jotai";
import { userAtom } from "../../stores/userAtom";
import { useNavigate } from "react-router-dom";
import { PostAPI } from "../../backend/ApiRESTFULL/post/post";
import { GetApi } from "../../backend/ApiRESTFULL/get/get";
import Cookies from "js-cookie";
const { JwtCreate } = PostAPI;
const { UserLogin } = GetApi;
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Login = () => {
  const navigate = useNavigate();

  const [, setUser] = useAtom(userAtom);
  const [formDataLogin, setFormDataLogin] = useState({
    email: "",
    password: "",
  });

  const handleChangeLogin = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormDataLogin((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await JwtCreate(formDataLogin);
      const { access } = response;
      console.log(access);

      const userData = await UserLogin(access);
      Cookies.set("access_token", access);
      setUser({
        id: userData.id,
        first_name: userData.first_name,
        last_name: userData.last_name,
        email: userData.email,
        isAuth: true,
      });
      navigate("/");
      toast.success("The login has been succes", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (error) {
      console.error("Une erreur s'est produite lors de la connexion :", error);
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
        <h2 className="text-3xl text-white mb-4 text-center">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col">
            <label htmlFor="email" className="text-white">
              Email:
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formDataLogin.email}
              onChange={handleChangeLogin}
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
              value={formDataLogin.password}
              onChange={handleChangeLogin}
              required
              className="input-field"
              autoComplete="current-password"
            />
          </div>
          <div className="flex justify-center items-center ">
            <button
              type="submit"
              className=" bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
            >
              Login
            </button>
          </div>
        </form>
        <div className="flex flex-col gap-4 justify-start mt-4 w-full">
          <p className="text-white w-8/10">
            Pas de compte ?{" "}
            <a href="/register" className="text-blue-500 w-2/8">
              Inscrivez-vous
            </a>
          </p>
          <p className="text-white w-full">
            Mot de passe oublié ?{" "}
            <a href="/auth/reset/password" className="text-blue-500 w-full">
              Réinitialiser le mot de passe
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};
