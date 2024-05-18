import { API_URL } from "../../../../config";
import axios from "axios";

interface UserEdit {
    first_name: string
    email: string
    password: string
}

export const PutApi = {



  EditProfileAPI: async (token: string, UserEdit: UserEdit) => {
    try {
      const config = {
        headers: {
          Authorization: `JWT ${token}`,
        },
      };
      const response = await axios.put(
        `${API_URL}/auth/users/me/`,
        UserEdit,
          config,
      
      );
      return response;
    } catch (error) {
      console.error("Error send data:", error);
      throw error;
    }
  },
  // Autres méthodes...
};
