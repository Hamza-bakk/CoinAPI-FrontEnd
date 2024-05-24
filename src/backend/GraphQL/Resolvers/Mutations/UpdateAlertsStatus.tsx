import { GraphQLClient } from "graphql-request";
import { API_GRAPHQL } from "../../../../../config";
import { UpdateAlertAllFields, UpdateAlertStatutsgql } from "../../RequeteAPI/Mutations/UpdateAlertStatutsgql";

const client = new GraphQLClient(API_GRAPHQL);

export type UpdateAlertStatut = {
  id: string;
  isOpen: boolean;
  userId: string;
};


export type UpdateAlertsData = {
  updateAlertStatut: UpdateAlertStatut;
  updateAlertAllFields: UpdateAlertAllFields;
};


export const fetchUpdateAlertsStatus = async (token: string, alertData: UpdateAlertStatut) => {
  try {
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const variables = {
      id: alertData.id,
      isOpen: alertData.isOpen,
      userId: alertData.userId
    };

    const data = await client.request<UpdateAlertsData>(UpdateAlertStatutsgql.UPDATE_ALERT_STATUT, variables, headers);
    return data;
  } catch (error) {
    console.error("Error fetching alerts:", error);
    throw error;
  }
};

export type UpdateAlertAllFields = {
  id: string;
  targetPrice: number;
  userId: string;
  asset?: string; // ajout des champs optionnels
  currentPrice?: number;
};

export const fetchupdateAllFieldsData = async(token: string, UpdateAlertsData: UpdateAlertAllFields) => {
  try {
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const variables = {
      id: UpdateAlertsData.id,
      targetPrice: UpdateAlertsData.targetPrice,
      userId: UpdateAlertsData.userId,

    };

    const data = await client.request<UpdateAlertsData>(UpdateAlertAllFields.UPDATE_ALERT_ALL_FIELDS, variables, headers);
    
    return data

  } catch (error) {
    console.error("Error fetching alerts:", error);
    throw error;
  }
}
