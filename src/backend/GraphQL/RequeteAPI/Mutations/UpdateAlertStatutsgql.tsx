import { gql } from "graphql-request";

export const UpdateAlertStatutsgql = {
  UPDATE_ALERT_STATUT: gql`
    mutation updateAlerts($id: ID!, $isOpen: Boolean!) {
      updateAlerts(id: $id, isOpen: $isOpen) {
        alerts {
          id
          isOpen
        }
      }
    }
  `

};

export const UpdateAlertAllFields = {
  UPDATE_ALERT_ALL_FIELDS: gql`
    mutation updateAlerts($id: ID!, $asset: String, $currentPrice: Int, $targetPrice: Int) {
      updateAlerts(
        id: $id
        asset: $asset
        currentPrice: $currentPrice
        targetPrice: $targetPrice) {
        alerts {
          id
        }
      }
    }
  `
  }
