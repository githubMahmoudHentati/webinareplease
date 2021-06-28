import React from 'react';
import gql from "graphql-tag";

export const graphQL_shema = ()=> {

    const resetPassword = gql`
        mutation($token:String!,$input:PasswordReset!) {
            resetPassword(token:$token, input:$input) {
                Code
                Message

            }
        }
    `;

    return({
        resetPassword,
    })
}