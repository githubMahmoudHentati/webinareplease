import gql from "graphql-tag";

export const graphQL_shema = ()=> {

    const CONTACT_CLIENT = gql`

        mutation($input:Mail!) {
          sendMail(input:$input) {
             code
             deliveryStatus
        }
   
      }
    `;


    return({
        CONTACT_CLIENT,
    })
}