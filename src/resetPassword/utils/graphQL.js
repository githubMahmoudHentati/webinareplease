import React from 'react';
import gql from "graphql-tag";

export const graphQL_shema = ()=> {

    const resetPassword = gql`
        mutation($token:String!,$input:PasswordReset!) {
            resetPassword(token:$token, input:$input) {
                code
                message

            }
        }
    `;

    const verificationTokenPasswordResetQuery = gql`
        query ($token:String!) {
            resetPasswordTokenVerification(token:$token) {
                code
                message
            }
        }
    `;
    return({
        resetPassword,
        verificationTokenPasswordResetQuery
    })
}