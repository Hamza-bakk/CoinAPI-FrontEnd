import { gql } from "graphql-request";

export const UpdateAlertStatutsgql = {
  UPDATE_ALERT_STATUT: gql`
    mutation UpdateAlertStatut($alertId: ID!, $isOpen: Boolean!) {
      updateAlertStatut(alertId: $alertId, isOpen: $isOpen) {
        id
        isOpen
      }
    }
  `
};
