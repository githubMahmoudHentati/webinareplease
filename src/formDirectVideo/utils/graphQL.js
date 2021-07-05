import React from 'react';
import gql from "graphql-tag";

export const graphQL_shema = ()=> {

    const createLive = gql`
        mutation($input:Form!) {
            addLive(input:$input) {
                code
                message
            }
        }
    `;

    return({
        createLive,
    })
}