import gql from 'graphql-tag';
export const useGraphqlSchema= () =>{
    const INFO_TO_REGISTER = gql`
      mutation($token: String!) {
        infoToRegister(token:$token){
            firstName
            lastName
            date
            title
            description
            availableOnlinePlaces
            availableOnsitePlaces
            email
        }
      }
`
    const CONFIRM_REGISTRATION = gql`
        mutation($email: String!, $input: ToConfirmRegistration!, $cryptext: String!) {
            confirmRegistration(email:$email, input:$input,cryptext:$cryptext) {
                code
                message
            }
        }
     `
        return  {INFO_TO_REGISTER, CONFIRM_REGISTRATION}
}


