
import gql from "graphql-tag";

export const graphQL_shema = ()=> {
    const Get_Lives = gql`
   query($input: NewLivesPagination) {
     getLives(input: $input) {
      data{
         id
         title
         logo
         status
         liveDate
         owner
      }
      recordsTotal
      recordsFiltered
      code
      }
     }
    `;
    const Delete_Items = gql`
    mutation($idLive:[Int!]!) {
    deleteLive(idLive:$idLive){
        deleteditems
        undeleteditems
        code
       }
     }
    `;

    const Get_Live_Info = gql `
       mutation($liveId:Int!) {
       getliveInfo(liveId:$liveId) {
        urlDiffusion
        streamName
        idLive
        pwdLive
        code
      }
     }
    `;
    const Export_Live = gql `
    query($id:Int!) {
    GetLinkExport(id:$id) {
        permaLink
        password
        participantUrl
        participantUrlT
        auditorUrl
        auditorUrlT
        translatorUrl
        integrationUrl
        code
     }
    }
    `;
    const diffusion_link = gql `
    mutation($id:Int!) {
     getDiffusionLink(id:$id)
     { code diffLink visLink }

      }
    `;
    const get_live_emails = gql `
    mutation($id:Int!, $searchEmail: String!) {
    getLiveEmails(id:$id, searchEmail:$searchEmail){
        email
        isOnline
       }
     } 
    `;
    const create_pwd = gql `
    mutation($pwd:String!, $liveId:String!) {
     createPwd(pwd:$pwd, liveId:$liveId) {
        code
        message
      }
    }
    `;
    return ({
        Get_Lives,
        Delete_Items,
        Get_Live_Info,
        Export_Live,
        diffusion_link,
        get_live_emails,
        create_pwd
    })
}