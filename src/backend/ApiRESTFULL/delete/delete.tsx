import axios from "axios";
import { API_URL } from "../../../../config";

interface userData {
  current_password: string;
}

export const DeleteApi = {
    
  DeleteUserAPI: async (token: string, userData: userData) => {
    try {
      const config = {
        headers: {
          Authorization: `JWT ${token}`,
        },
        data: userData,
      };
      const response = await axios.delete(`${API_URL}/auth/users/me/`, config);
      return response;
    } catch (error) {
      console.error("Error send data:", error);
      throw error;
    }
  },
};
