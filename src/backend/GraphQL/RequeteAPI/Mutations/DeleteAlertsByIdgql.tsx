import { gql } from "graphql-request";


export const DeleteAlertsByIdgql = {
    DELETE_ALERT_BY_ID: gql`
    mutation deleteAlerts($id: ID!, $userId: ID!) { 
        deleteAlerts(id: $id, userId: $userId) {
            alertsId
        }  
    }
    `
}