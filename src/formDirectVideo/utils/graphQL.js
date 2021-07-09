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

    const generateSecuredPassword = gql`
        mutation($input:GeneratePwd) {
            generatePwd(input:$input) {
                code
                pwd
            }
        }
    `;

    const themesDisplayQuery = gql`
        query {
            getThemesList {
                id
                title
            }
        }
    `;


    return({
        createLive,
        generateSecuredPassword,
        themesDisplayQuery
    })
}