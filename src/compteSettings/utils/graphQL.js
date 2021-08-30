import gql from "graphql-tag";


export const graphQL_shema = ()=> {
    const Get_UserInfoData = gql`
        query {
            getUserInfo{
                generalInformation{
                    vignette
                    firstName
                    lastName
                    email
                    adresse
                    city
                    postalCode
                    numberPerson
                    phone
                }
                subscription{
                    subscriptionType
                    subscriptionAmount
                    subscriptionMode
                    usedStorage
                    diffusionDuration
                    paymentMode
                }
                bills{
                    bill
                    issuedTime
                    entitled
                    amount
                    status
                }
                billCount
            }
        }
    `;
    const Update_AccountSetting = gql`
        mutation($input:UpdateteUserInput!) {
            updateUser(input:$input) {
                code
                message
            }
        }
    `;
    const UPDATE_PASSWORD = gql `
    
    mutation($input:PasswordChange!) {
    changePassword(input:$input) {
      code
      message
      
      }
     }
    
    `;
    return({
        Get_UserInfoData,
        Update_AccountSetting,
        UPDATE_PASSWORD
    })
}