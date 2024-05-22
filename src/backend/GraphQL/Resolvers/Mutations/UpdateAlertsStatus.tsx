import { GraphQLClient } from "graphql-request";
import { API_GRAPHQL } from "../../../../../config";
import { UpdateAlertStatutsgql } from "../../RequeteAPI/Mutations/UpdateAlertStatutsgql";

export type UpdateAlertStatut = {
  id: string;
  isOpen: boolean;
};

export type UpdateAlertsData = {
  updateAlertStatut: UpdateAlertStatut;
};

const client = new GraphQLClient(API_GRAPHQL);

export const fetchUpdateAlertsStatus = async (token: string, alertData: UpdateAlertStatut) => {
  try {
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const variables = {
      id: alertData.id,
      isOpen: alertData.isOpen,
    };

    const data = await client.request<UpdateAlertsData>(UpdateAlertStatutsgql.UPDATE_ALERT_STATUT, variables, headers);
    return data;
  } catch (error) {
    console.error("Error fetching alerts:", error);
    throw error;
  }
};

