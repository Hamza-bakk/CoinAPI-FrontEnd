import React, { useEffect, useState } from "react";
import { GetApi } from "../../backend/ApiRESTFULL/get/get";
import Cookies from "js-cookie";
import { fetchCreateAlertType } from "../../backend/GraphQL/Resolvers/Mutations/CreateAlerts";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const { CoinAPI } = GetApi;

type Props = {
  userId: string;
};

type PriceData = {
  time: string;
  asset_id_base: string;
  asset_id_quote: string;
  rate: number;
};

export const CoinGetPrice: React.FC<Props> = ({ userId }) => {
  const [prices, setPrices] = useState<PriceData[]>([]);
  const navigate = useNavigate();
  const [createAlert, setCreateAlert] = useState({
    userId: userId,
    targetPrice: "",
    currentPrice: 0,
    asset: "",
    isOpen: true,
  });

  const handleTargetPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCreateAlert((prevState) => ({
      ...prevState,
      [name]: Number(value), // Convert input value to number
    }));
  };

  const handleAssetChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedAsset = e.target.value;
    const selectedPriceData = prices.find(
      (price) => price.asset_id_base === selectedAsset
    );

    if (selectedPriceData) {
      setCreateAlert((prevState) => ({
        ...prevState,
        currentPrice: Math.floor(selectedPriceData.rate),
        asset: selectedAsset,
      }));
    }
  };

  const responseGetApi = async () => {
    try {
      const data: PriceData[] = await CoinAPI();
      setPrices(data);
      if (data.length > 0) {
        setCreateAlert((prevState) => ({
          ...prevState,
          currentPrice: Math.floor(data[0].rate), // Default to first item
          asset: data[0].asset_id_base,
        }));
      }
    } catch (error) {
      console.error("Une erreur s'est produite lors de la connexion :", error);
    }
  };

  useEffect(() => {
    responseGetApi();
  }, []);

  const createAlertAPI = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const token = Cookies.get("access_token");
      if (!token) throw new Error("Token not found");
      await fetchCreateAlertType(token, createAlert);
      toast.success('The alert has been created', {
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
      console.error("Error creating alert:", error);
    }
  };

  const getPriceDecimal = (rate: number | null) => {
    if (rate === null) return "Try later";
    return new Intl.NumberFormat("fr-FR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(rate);
  };

  return (
    <>
      {userId ? (
        <div className="flex flex-col min-h-screen w-full sm:p-4 sm:py-4 gradient-background text-center text-white">
          <div className="flex flex-col h-1/3 border w-full justify-center">
            <table className="table-auto mx-auto mt-4">
              <thead>
                <tr className="bg-black-200">
                  <th className="border px-4 py-2">Id</th>
                  <th className="border px-4 py-2">Asset</th>
                  <th className="border px-4 py-2">Current Price</th>
                </tr>
              </thead>
              <tbody>
                {prices.map((price, index) => (
                  <tr key={index}>
                    <td className="border px-4 py-2">{index + 1}</td>
                    <td className="border px-4 py-2">{price.asset_id_base}</td>
                    <td className="border px-4 py-2">
                      {getPriceDecimal(price.rate)} €
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col h-2/3 border w-full justify-center text-center">
            <form onSubmit={createAlertAPI} className="mx-auto mt-4">
              <div className="mb-4">
                <label
                  className="block text-white text-sm font-bold mb-2"
                  htmlFor="asset"
                >
                  Asset
                </label>
                <select
                  name="asset"
                  value={createAlert.asset}
                  onChange={handleAssetChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                >
                  {prices.map((price, index) => (
                    <option key={index} value={price.asset_id_base}>
                      {price.asset_id_base}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label
                  className="block text-white text-sm font-bold mb-2"
                  htmlFor="currentPrice"
                >
                  Current Price
                </label>
                <input
                  type="text"
                  name="currentPrice"
                  value={getPriceDecimal(createAlert.currentPrice)}
                  readOnly
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-white text-sm font-bold mb-2"
                  htmlFor="targetPrice"
                >
                  Target Price
                </label>
                <input
                  type="number"
                  name="targetPrice"
                  value={createAlert.targetPrice}
                  onChange={handleTargetPrice}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Create Alert
              </button>
            </form>
          </div>
        </div>
      ) : (
        <div className="flex flex-col min-h-screen sm:p-4 sm:py-4 gradient-background text-white justify-center">
          <div className="flex flex-col text-2xl  w-full justify-center">
            <p className="text-center">Please log in to create your alerts.</p>
          </div>
        </div>
      )}
    </>
  );
};
