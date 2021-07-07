import React from 'react';
import gql from "graphql-tag";

export const graphQL_shema = ()=> {

    const SignUp = gql`
        mutation($input:CreateUserInput!) {
            addUser(input:$input) {
                code
                message
                token
            }

        }
    `;

    return({
        SignUp,
    })
}