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

    return({
        Connexion,
    })
}