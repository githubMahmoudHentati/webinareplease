import gql from "graphql-tag";

export const graphQL_shema = ()=> {

    const GET_PWD = gql`
    query($id:Int!) {
     getPWD(id:$id)
    } 
    `;
    return ({
        GET_PWD
    })
}