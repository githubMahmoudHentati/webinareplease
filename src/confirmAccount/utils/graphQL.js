import gql from "graphql-tag";

export const graphQL_shema = ()=> {

    const ResendConfirmMailMutation = gql`
        mutation ($token:String!) {
            ResendMailConfirmation(token:$token) {
                code
                deliveryStatus
            }
        }

    `;

    return({
        ResendConfirmMailMutation,
    })
}