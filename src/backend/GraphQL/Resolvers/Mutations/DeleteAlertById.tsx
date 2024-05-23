import { DeleteAlertsByIdgql } from '../../RequeteAPI/Mutations/DeleteAlertsByIdgql'
import { GraphQLClient } from 'graphql-request'
import { API_GRAPHQL } from '../../../../../config'

const client = new GraphQLClient(API_GRAPHQL)

export type DeleteAlertField = {
    id: string
}

export const DeleteAlertById = async (token: string, DeleteAlertField: DeleteAlertField) => {
    try {
        const headers = {
            Authorization: `Bearer ${token}`,
        }

        const variables = {
            id: DeleteAlertField.id,
          };
        const data = await client.request<DeleteAlertField>(DeleteAlertsByIdgql.DELETE_ALERT_BY_ID, variables, headers)
        return data
    } catch (error) {
        console.error("The alerts is not been deleted", error)
        throw error;
    }


  
}
