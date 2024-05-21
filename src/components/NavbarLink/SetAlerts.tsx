import React, { useEffect, useState } from "react";
import {fetchAlertsByUserId, Alert, AlertsData,} from "../../backend/GraphQL/Resolvers/Query/AlertsByUser";
import { fetchUpdateAlertsStatus, UpdateAlertStatut,  } from "../../backend/GraphQL/Resolvers/Mutations/UpdateAlertsStatus";
import { useAtom } from "jotai";
import { userAtom } from "../../stores/userAtom";
import Cookies from "js-cookie";
import { ID } from "graphql-request/alpha/schema/scalars";


export const SetAlerts  = () => {
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

 


//   useEffect(() => {
//     const passAlertToClose = async (alerts) => {
//       const token = Cookies.get("access_token");
//       const openlog = (openAlerts[alerts.id].isOpen === true)
//       console.log(alerts.isOpen);
      
      

//       if (alerts.isOpen) {
//         console.log(alerts.currentPrice);
//         console.log(alerts.currentPrice)
        
//         if (alerts.currentPrice >= alerts.targetPrice || alerts.currentPrice <= alerts.targetPrice) {
//           const alertData: UpdateAlertStatut = {
//             alertId: alerts.id,
//             isOpen: false
//           };
//           try {
//             const updateStatut = await fetchUpdateAlertsStatus(token, alertData);
//             console.log('Alert status updated:', updateStatut);
//           } catch (error) {
//             console.error('Error updating alert status:', error);
//           }
//         }
//       }
//     };

//     if (alerts) {
//       passAlertToClose(alerts);
//     }
//   }, [alerts]); 

const verifconstructor = () => {
    const verif = openAlerts
    console.log(verif);

    return verif
}


  const openAlerts = alerts.filter(alert => alert.isOpen);
  const closedAlerts = alerts.filter(alert => !alert.isOpen);




  return (
    <>
      {user.id ? (
  
        <div className="flex flex-col h-screen sm:p-4 sm:py-4 gradient-background text-white gap-12 justify-center">
          <div className="flex flex-col w-full justify-center">
            <button onClick={verifconstructor}>
                click me
            </button>
            <p className="text-center font-bold text-2xl mb-4">Open Alerts</p>
  
            <table className="table-auto mx-auto">
              <thead>
                <tr className="bg-black-200">
                  <th className="border px-4 py-2">ID</th>
                  <th className="border px-4 py-2">Asset</th>
                  <th className="border px-4 py-2">Current Price</th>
                  <th className="border px-4 py-2">Target Price</th>
                  <th className="border px-4 py-2">Is Open ?</th>
                </tr>
              </thead>
              <tbody>
                {openAlerts.map((alert) => (
                  <tr key={alert.id} className="transition-all duration-300 hover:bg-black">
                  <td className="border px-4 py-2 font-bold">{alert.id}</td>
                    <td className="border px-4 py-2 font-bold">{alert.asset}</td>
                    <td className="border px-4 py-2 font-bold text-orange-500">{alert.currentPrice}</td>
                    <td className="border px-4 py-2 font-bold text-orange-500">{alert.targetPrice}</td>
                    <td className="border px-4 py-2 font-bold text-orange-500">{alert.isOpen ? 'Open' : 'Close'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
  
  
          <div className="flex flex-col w-full justify-center mt-8">
            <p className="text-center font-bold text-2xl mb-4">Closed Alerts</p>
            <table className="table-auto mx-auto">
              <thead>
                <tr className="bg-black-200">
                  <th className="border px-4 py-2">ID</th>
                  <th className="border px-4 py-2">Asset</th>
                  <th className="border px-4 py-2">Current Price</th>
                  <th className="border px-4 py-2">Target Price</th>
                  <th className="border px-4 py-2">Is Open ?</th>
                </tr>
              </thead>
              <tbody>
                {closedAlerts.map((alert) => (
                  <tr key={alert.id} className="transition-all duration-300 hover:bg-black">
                    <td className="border px-4 py-2 font-bold">{alert.id}</td>
                    <td className="border px-4 py-2 font-bold">{alert.asset}</td>
                    <td className="border px-4 py-2 font-bold text-green-500">{alert.currentPrice}</td>
                    <td className="border px-4 py-2 font-bold text-green-500">{alert.targetPrice}</td>
                    <td className="border px-4 py-2 font-bold text-green-500">{alert.isOpen ? 'Open' : 'Close'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          
          </div>
        </div>
  
  
  
      ) : (
        <div className="flex flex-col h-screen sm:p-4 sm:py-4 gradient-background text-white justify-center">
          <div className="flex flex-col text-2xl w-full justify-center">
            <p className="text-center">Please log in to see your alerts.</p>
          </div>
        </div>
      )}
    </>
  );
}