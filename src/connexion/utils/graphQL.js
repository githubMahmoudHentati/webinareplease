import React from 'react';
import gql from "graphql-tag";

export const graphQL_shema = ()=> {

    const Connexion = gql`
        mutation($input:LoginInput!) {
            login(input:$input) {
                Code
                Message
                Token
            }
        }
    `;

    return({
        Connexion,
    })
}