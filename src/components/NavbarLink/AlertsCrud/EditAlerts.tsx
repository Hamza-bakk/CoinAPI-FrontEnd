import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useNavigate, useParams } from "react-router-dom";
import {
  fetchupdateAllFieldsData,
  UpdateAlertAllFields,
} from "../../../backend/GraphQL/Resolvers/Mutations/UpdateAlertsStatus";
import { useAtom } from "jotai";
import { userAtom } from "../../../stores/userAtom";
import { toast } from "react-toastify";

type Props = {
  alertId: string;
};

export const EditAlerts: React.FC<Props> = () => {
  const { alertId } = useParams<{ alertId: string }>();
  const [user] = useAtom(userAtom);
  const navigate = useNavigate();

  const [editAlert, setEditAlert] = useState<UpdateAlertAllFields>({
    id: alertId || "",
    targetPrice: 0,
    userId: user.id.toString() || "",
  });
  // Fonction pour gérer les changements de l'input targetPrice
  const handleTargetPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditAlert((prevState) => ({
      ...prevState,
      [name]: Number(value), // Convertir la valeur de l'input en nombre
    }));
  };

  // Fonction pour envoyer les données mises à jour à l'API
  const updateAllFieldsApi = async () => {
    try {
      const token = Cookies.get("access_token");
      if (!token) {
        navigate("/login");
        toast.error(`the session has expired`, {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        throw new Error("Token is missing");
      }
      await fetchupdateAllFieldsData(token, editAlert);

      toast.success(`The alert ${alertId} has been updated `, {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      navigate("/My/alerts");
    } catch (error) {
      console.error("Error updating alert:", error);
    }
  };

  const handleCancel = () => {
    navigate("/My/alerts");
  };

  // Fonction pour gérer la soumission du formulaire
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateAllFieldsApi();
  };

  return (
    <>
      {user.id ? (
        <div className="flex flex-col sm:text-lg min-h-screen gradient-background text-white gap-12 justify-center items-center text-center p-4">
          <h1 className="text-2xl font-bold mb-4 text-sky-200">
            Edit Alert {alertId}
          </h1>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col text-start ">
              <label htmlFor="targetPrice"> Target Price</label>
              <input
                type="number"
                id="targetPrice"
                name="targetPrice"
                value={editAlert.targetPrice}
                onChange={handleTargetPriceChange} // Ajout du gestionnaire d'événements onChange
                className="flex mt-6 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="flex mt-6 items-center justify-between">
              <button
                type="submit"
                className="p-2 w-30 bg-blue-500 text-white rounded-md hover:bg-blue-700"
              >
                Update Alert
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="p-2 w-30 bg-gray-500 text-white rounded-md hover:bg-gray-700"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="flex justify-center items-center min-h-screen">
          <p className="text-white text-xl">
            You need to be logged in to edit alerts.
          </p>
        </div>
      )}
    </>
  );
};
