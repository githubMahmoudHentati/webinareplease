import React from 'react';
import gql from "graphql-tag";

export const graphQL_shema = ()=> {

    const Connexion = gql`
        mutation($input:LoginInput!) {
            login(input:$input) {
                code
                message
                token
            }
        }
    `;

    const confirmAccountQuery = gql`
    query ($token:String!) {
        verifySubscriptionToken(token:$token) {
            code
            message
        }
    }
    `;

    return({
        Connexion,
        confirmAccountQuery
    })
}