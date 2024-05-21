// src/backend/ApiGraphQL/api.js
import { GraphQLClient } from "graphql-request";
import { API_GRAPHQL } from "../../../../../config";
import { CreateAlertsgql } from "../../RequeteAPI/Mutations/CreateAlertsgql";

export type CreateAlertType = {
  userId: string;
  asset: string;
  currentPrice: number;
  targetPrice: number;
  isOpen: boolean;
};

export type AlertsData = {
    alertsByUserId: CreateAlertType[];
  };

const client = new GraphQLClient(API_GRAPHQL);

export const fetchCreateAlertType = async (token: string, alertData: CreateAlertType) => {
  try {
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const variables = {
      userId: alertData.userId,
      asset: alertData.asset,
      currentPrice: alertData.currentPrice,
      targetPrice: alertData.targetPrice,
    };

    const data = await client.request<AlertsData>(
      CreateAlertsgql.CREATE_ALERTS,
      variables,
      headers
    );
    return data;
  } catch (error) {
    console.error("Error fetching alerts:", error);
    throw error;
  }
};
