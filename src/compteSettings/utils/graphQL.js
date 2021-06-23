import React from 'react';
import gql from "graphql-tag";

export const graphQL_shema = ()=> {
    const Get_UserInfoData = gql`
        query {
            getUserInfo{
                generalInformation{
                    avatar
                    firstName
                    lastName
                    email
                    address
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
            }
        }
    `;
    return({
        Get_UserInfoData
    })
}