// src/backend/ApiGraphQL/queries.js
import { gql } from "graphql-request";

export const QueryAPI = {
  ALL_ALERTS_BY_USER: gql`
    query AlertsByUserId($userId: ID!) {
      alertsByUserId(userId: $userId) {
        id
        asset
        currentPrice
        targetPrice
        isOpen
        openDate
        closeDate
        userId {
          id
          firstName
          lastName
        }
      }
    }
  `,

  QUERY_USERID: gql`
    query AlertsByUserId($userId: ID!) {
      alertsByUserId(userId: $userId) {
        id
        isOpen
        userId {
          id
          firstName
        }
      }
    }
  `,
  // Ajoutez d'autres requêtes ici
};
