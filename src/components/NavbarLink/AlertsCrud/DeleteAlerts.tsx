import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  DeleteAlertById,
  DeleteAlertField,
} from "../../../backend/GraphQL/Resolvers/Mutations/DeleteAlertById";
import { useAtom } from "jotai";
import Cookies from "js-cookie";
import { userAtom } from "../../../stores/userAtom";
import { toast } from "react-toastify";

type Props = {
  alertId: string;
};

export const DeleteAlerts: React.FC<Props> = () => {
  const { alertId } = useParams<{ alertId: string }>();
  const navigate = useNavigate();
  const [user] = useAtom(userAtom);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const deleteAlertsApi = async () => {
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

      const dataVariable: DeleteAlertField = {
        id: alertId ,
        userId: user.id.toString()

      }
      await DeleteAlertById(token, dataVariable);
      toast.success(`The alert ${alertId} has been deleted `, {
        position: 'top-right',
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

  const handleDeleteConfirmation = () => {
    setConfirmDelete(true);
  };

  const handleCancel = () => {
    setConfirmDelete(false);
    navigate("/My/alerts");
  };

  return (
    <>
      {" "}
      {user.id ? (
        <div className="flex flex-col sm:text-lg min-h-screen gradient-background text-white gap-12 justify-center items-center text-center p-4">
          <h1 className="text-3xl flex flex-col font-bold mb-8 text-sky-200">Delete Alert {alertId}</h1>
          {!confirmDelete ? (
            <div className="flex flex-col gap-8">
              <p className="text-xl">Are you sure you want to delete this alert?</p>
              <div className="flex gap-8 justify-between">
                <button type="submit" onClick={deleteAlertsApi} className="p-3 bg-blue-500 text-white rounded-md hover:bg-blue-700">Yes, delete</button>
                <button type="submit" onClick={handleCancel} className="p-3 bg-blue-500 text-white rounded-md hover:bg-blue-700">Cancel</button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col justify-center items-center min-h-screen">
              <p className="text-2xl text-white">
                You need to be logged in to edit alerts.
              </p>
            </div>
          )}
        </div>
      ) : null}
    </>
  );
  
}