import { API_URL } from "../../../../config";
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

  // Autres méthodes...
};
