/* eslint-disable react-refresh/only-export-components */
// src/backend/ApiGraphQL/api.js
import { GraphQLClient } from "graphql-request";
import { API_GRAPHQL } from "../../../../../config";
import { QueryAPI } from "../../RequeteAPI/Query/AlertsByUsergql.tsx";

export type Alert = {
  id: string;
  asset: string;
  currentPrice: number;
  targetPrice: number;
  isOpen: boolean;
  openDate: Date;
  closeDate: Date;
};



export type AlertsData = {
  alertsByUserId: any;
  alert: Alert;
};

const client = new GraphQLClient(API_GRAPHQL);

export const fetchAlertsByUserId = async (token: string, userId: Alert) => {
  try {
    const headers = {
      Authorization: `Bareer ${token}`,
    };
    const variables = { userId };

    const data = await client.request<AlertsData>(
      QueryAPI.ALL_ALERTS_BY_USER,
      variables,
      headers
    );
    return data;
  } catch (error) {
    console.error("Error fetching alerts:", error);
    throw error;
  }
};


export const QueryAlerts = async (token: string, userId: string) => {
  try {
    const headers = {
      Authorization: `Bareer ${token}`,
    };
    const variables = { userId };

    const data = await client.request<AlertsData>(
      QueryAPI.QUERY_USERID,
      variables,
      headers
    );
    return data;
  } catch (error) {
    console.error("Error fetching alerts:", error);
    throw error;
  }
};


