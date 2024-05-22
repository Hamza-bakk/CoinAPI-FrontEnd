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
