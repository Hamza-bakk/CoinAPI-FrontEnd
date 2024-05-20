import React, { useEffect, useState } from "react";
import { GetApi } from "../../backend/ApiRESTFULL/get/get";
import { PageOne } from "./PageOne";

const { CoinAPI } = GetApi;

type Props = {
    userId: string;
  };
  

export const CoinGetAndALert: React.FC<Props> = ({userId}) => {
  const [prices, setPrices] = useState({ BTC: null, ETH: null });

  const responseGetApi = async () => {
    try {
      const data = await CoinAPI();
      const prices = {
        BTC: data.find((d) => d.asset_id_base === "BTC").rate,
        ETH: data.find((d) => d.asset_id_base === "ETH").rate,
      };
      setPrices(prices);
      console.log(prices);
    } catch (error) {
      console.error("Une erreur s'est produite lors de la connexion :", error);
    }
  };

  useEffect(() => {
    responseGetApi();
  }, []);

  const getPriceDecimal = (price: number | null) => {
    if (price === null) return "Try later";
    return new Intl.NumberFormat("fr-FR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price);
  };

  return (
    <>
      {userId ? (
        <div className="flex flex-col h-2/3 mt-6 sm:mt-2 text-center justify-center items-center text-white gap-2 ">
          <table className="table-auto mx-auto mt-4">
            <thead>
              <tr className="bg-black-200">
                <th className="border px-4 py-2">Id</th>
                <th className="border px-4 py-2">Asset</th>
                <th className="border px-4 py-2">Current Price</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(prices).map(([asset, price], index) => (
                <tr key={index}>
                  <td className="border px-4 py-2">{index + 1}</td>
                  <td className="border px-4 py-2">{asset}</td>
                  <td className="border px-4 py-2">
                    {getPriceDecimal(price)} €
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="flex flex-col h-2/3 mt-6 sm:mt-2 text-center justify-center text-4xl items-center text-white gap-2 ">
          Connecte toi pour afficher le prix du BTC et du ETH
        </div>
      )}
        
    </>
  );
};
