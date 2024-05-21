import { gql } from "graphql-request";

export const CreateAlertsgql = {
  CREATE_ALERTS: gql`
    mutation CreateAlerts($userId: ID!, $asset: String!, $currentPrice: Int!, $targetPrice: Int!) {
      createAlerts(
        userId: $userId
        asset: $asset
        currentPrice: $currentPrice
        targetPrice: $targetPrice
        isOpen: true
      ) {
        alerts {
          id
          userId {
            id
          }
          asset
          currentPrice
          targetPrice
          isOpen
          openDate
        }
      }
    }
  `,
};
