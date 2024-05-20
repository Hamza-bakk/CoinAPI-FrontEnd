import { API_URL } from "../../../../config";
import { COIN_API } from "../../../../config";
import axios from "axios";

export const GetApi = {
  UserLogin: async (token: string) => {
    try {
      const config = {
        headers: {
          Authorization: `JWT ${token}`,
        },
        withCredentials: true,
      };
      const response = await axios.get(`${API_URL}/auth/users/me/`, config);
      const userData = response.data;
      return userData;
    } catch (error) {
      console.error("Error fetching user data:", error);
      throw error;
    }
  },

  CoinAPI: async () => {
  const assets = ["BTC", "ETH"];
  const config = {
    headers: {
      "X-CoinAPI-Key": COIN_API,
    },
  };

  try {
    const responses = await Promise.all(
      assets.map(asset => axios.get(`https://rest.coinapi.io/v1/exchangerate/${asset}/USD`, config))
    );
    const data = responses.map(response => response.data);
    return data;
  } catch (error) {
    console.error("Error fetching exchange rates:", error);
    throw error;
  }
},

  // Autres méthodes...
};
