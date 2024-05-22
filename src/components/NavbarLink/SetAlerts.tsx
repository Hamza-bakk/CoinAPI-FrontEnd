import React, { useEffect, useState } from "react";
import {
  fetchAlertsByUserId,
  Alert,
  AlertsData,
} from "../../backend/GraphQL/Resolvers/Query/AlertsByUser";
import {fetchUpdateAlertsStatus} from "../../backend/GraphQL/Resolvers/Mutations/UpdateAlertsStatus";
import { GetApi } from "../../backend/ApiRESTFULL/get/get";

import { useAtom } from "jotai";
import { userAtom } from "../../stores/userAtom";
import Cookies from "js-cookie";
import { EditAlerts } from "./AlertsCrud/EditAlerts";
import { useNavigate } from "react-router-dom";

const { CoinAPI } = GetApi;

export const SetAlerts = () => {
  const [user] = useAtom(userAtom);
  const navigate = useNavigate()
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [, setLoading] = useState(true);
  const [, setError] = useState(null);
  const userId = user.id;

  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = (alertId: string) => {
    setIsEditing(true);
    navigate(`/edit/alerts/${alertId}`);
  };

  const handleDeleteClick = (alertId: string) => {
    setIsEditing(true);
    navigate(`/delete/alerts/${alertId}`);
  };

  useEffect(() => {
    const getAlerts = async () => {
      try {
        const token = Cookies.get("access_token");
        if (!token) {
          throw new Error("Token is missing");
        }
        const alertsData: AlertsData = await fetchAlertsByUserId(token, userId);

        setAlerts(alertsData.alertsByUserId); // Assurez-vous d'accéder correctement aux données

        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    if (userId) {
      getAlerts();
    }
  }, [user, userId]);

  useEffect(() => {
    const passAlertToClose = async (alerts: any[]) => {
      const token = Cookies.get("access_token");
      const currentPriceLive = await CoinAPI();
      const pricesByAsset = currentPriceLive.reduce((acc, price) => {
        acc[price.asset_id_base] = price.rate;
        return acc;
      }, {});

      const openAlerts = alerts.filter((alert) => alert.isOpen);
      const updatePromises = openAlerts.map(async (alert) => {
        const currentPriceLive = pricesByAsset[alert.asset];

        if (alert.isOpen && currentPriceLive !== null) {
          const alertData = {
            id: alert.id,
            isOpen: false,
          };

          if (alert.targetPrice > alert.currentPrice) {
            if (currentPriceLive >= alert.targetPrice) {
               await fetchUpdateAlertsStatus(token, alertData);
            }
          }
          if (alert.targetPrice < alert.currentPrice) {
            if (currentPriceLive <= alert.targetPrice) {
              await fetchUpdateAlertsStatus(token, alertData);
            }
          }
        }
      });

      await Promise.all(updatePromises);
    };

    if (alerts.length > 0) {
      passAlertToClose(alerts);
    }
  }, [alerts]);

  const openAlerts = alerts.filter((alert) => alert.isOpen);
  const closedAlerts = alerts.filter((alert) => !alert.isOpen);

  const formatDate = (dateString: Date) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
  };


  return (
    <>
      {user.id ? (
        <div className="flex flex-col min-h-screen gradient-background sm:text-sm text-white gap-12 sm:gap-2 justify-center">
          <div className="flex flex-col overflow-x-auto">
            <div className="flex flex-col w-full justify-center">
              <p className="text-center font-bold text-2xl sm:text-sm mb-4">
                Open Alerts
              </p>

              <table className="table-auto mx-auto">
                <thead>
                  <tr className="bg-black-200">
                    <th className="border px-4 py-2">ID</th>
                    <th className="border px-4 py-2">Open Date</th>

                    <th className="border px-4 py-2">Asset</th>
                    <th className="border px-4 py-2">Current Price</th>
                    <th className="border px-4 py-2">Target Price</th>
                    <th className="border px-4 py-2">Is Open ?</th>
                    <th className="border px-4 py-2">Edit</th>
                    <th className="border px-4 py-2">Delete</th>



                  </tr>
                </thead>
                <tbody>
                  {openAlerts.map((alert) => (
                    <tr
                      key={alert.id}
                      className="transition-all duration-300 hover:bg-black "
                    >
                      <td className="border px-4 py-2 font-bold">{alert.id}</td>
                      <td className="border px-4 py-2 font-bold text-green-500">
                        {formatDate(alert.openDate)}
                      </td>
                      <td className="border px-4 py-2 font-bold">
                        {alert.asset}
                      </td>
                      <td className="border px-4 py-2 font-bold text-orange-500">
                        {alert.currentPrice}
                      </td>
                      <td className="border px-4 py-2 font-bold text-orange-500">
                        {alert.targetPrice}
                      </td>
                      <td className="border px-4 py-2 font-bold text-orange-500">
                        {alert.isOpen ? "Open" : "Close"}
                      </td>
                      <td className="border px-4 py-2 font-bold text-orange-500 cursor-pointer" onClick={() => handleEditClick(alert.id)}>
                        Edit ✏️
                      </td>
                      <td className="border px-4 py-2 font-bold text-orange-500 cursor-pointer" onClick={() => handleDeleteClick(alert.id)}>
                        Delete 🗑️
                      </td>

                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="flex flex-col overflow-x-auto">
            <div className="flex flex-col w-full justify-center mt-8">
              <p className=" text-center font-bold text-2xl sm:text-sm mb-4">
                Closed Alerts
              </p>
              <table className="table-auto mx-auto">
                <thead>
                  <tr className="bg-black-200">
                    <th className="border px-4 py-2">ID</th>
                    <th className="border px-4 py-2">Asset</th>
                    <th className="border px-4 py-2">Current Price</th>
                    <th className="border px-4 py-2">Target Price</th>
                    <th className="border px-4 py-2">Is Open ?</th>
                    <th className="border px-4 py-2">Open Date</th>
                    <th className="border px-4 py-2">Close Date</th>
                  </tr>
                </thead>
                <tbody>
                  {closedAlerts.map((alert) => (
                    <tr
                      key={alert.id}
                      className="transition-all duration-300 hover:bg-black"
                    >
                      <td className="border px-4 py-2 font-bold">{alert.id}</td>
                      <td className="border px-4 py-2 font-bold">
                        {alert.asset}
                      </td>
                      <td className="border px-4 py-2 font-bold text-green-500">
                        {alert.currentPrice}
                      </td>
                      <td className="border px-4 py-2 font-bold text-green-500">
                        {alert.targetPrice}
                      </td>
                      <td className="border px-4 py-2 font-bold text-green-500">
                        {alert.isOpen ? "Open" : "Close"}
                      </td>
                      <td className="border px-4 py-2 font-bold text-green-500">
                        {formatDate(alert.openDate)}
                      </td>
                      <td className="border px-4 py-2 font-bold text-green-500">
                        {formatDate(alert.closeDate)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col min-h-screen sm:p-4 sm:py-4 gradient-background text-white justify-center">
          <div className="flex flex-col text-2xl w-full justify-center">
            <p className="text-center">Please log in to see your alerts.</p>
          </div>
        </div>
      )}
    </>
  );
};
