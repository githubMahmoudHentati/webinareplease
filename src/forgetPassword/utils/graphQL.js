import React from 'react';
import gql from "graphql-tag";

export const graphQL_shema = ()=> {

    const forgetPassword = gql`
        mutation($email:String!) {
            ResetPasswordRequest(email:$email) {
                code
            }
        }
    `;

    return({
        forgetPassword,
    })
}