// src/components/alerts/AlertsByUser.js
import React, { useEffect, useState } from "react";
import {fetchAlertsByUserId, Alert, AlertsData,} from "../../backend/GraphQL/Resolvers/Query/AlertsByUser";
import { useAtom } from "jotai";
import { userAtom } from "../../stores/userAtom";
import Cookies from "js-cookie";

export const PageTwo = () => {
  const [user] = useAtom(userAtom);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [, setLoading] = useState(true);
  const [, setError] = useState(null);
  const userId = user.id; // Utiliser directement user.id, car il est déjà une chaîne

 



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

  const getIsOpenMessage = ( targetPrice: number) =>  {
    if (targetPrice > 2000) {
      return "L'opéaration est terminer"
    } else { 
      return "l'opération est en cours tu sais"
    }
  }



    return (
      <>
      {user.id &&(

        <div className="flex text-white flex-col gap-8 p-8 gradient-background  text-center h-screen justify-center items-center ">
          <h1 className="text-2xl font-bold mb-4">User Alerts</h1>
          <div className="overflow-x-auto">
            <table className="table-auto mx-auto">
              <thead>
                <tr className="bg-black-200">
                <th className="border px-4 py-2">Id</th>
                  <th className="border px-4 py-2">Asset</th>
                  <th className="border px-4 py-2">Current Price</th>
                  <th className="border px-4 py-2">Target Price</th>
                  <th className="border px-4 py-2">is Open</th>

                </tr>
              </thead>
              <tbody>
                {alerts.map((alert) => (
                  <tr key={alert.id} >
                    <td className="border px-4 py-2 hover:bg-red-300">{alert.id}</td>
                    <td className="border px-4 py-2 hover:bg-red-300">{alert.asset}</td>

                    <td className="border px-4 py-2 hover:bg-red-300">{alert.currentPrice}</td>
                    <td className="border px-4 py-2 hover:bg-red-300" >{alert.targetPrice}</td>
                    <td className="border px-4 py-2 hover:bg-red-300">{getIsOpenMessage(alert.targetPrice)}</td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )} {
      }
      </>
    );
  };
  

  