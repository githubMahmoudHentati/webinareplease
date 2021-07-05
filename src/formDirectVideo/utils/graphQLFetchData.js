import {useQuery,useMutation} from "@apollo/react-hooks";
import {graphQL_shema} from "./graphQL";
import {Hooks} from "./hooks";
import {useHistory} from "react-router-dom";
import {setConnexionConstraintDataOnchange} from "../../connexion/store/connexionAction";
import {useDispatch} from "react-redux";
import moment from "moment";



export const GraphQLFetchData = (values) => {
    const history = useHistory()
    const dispatch = useDispatch()
    console.log("test",values)
    let startDate= values.general.startDate && values.general.startHour ? (values.general.startDate).format('YYYY-MM-DD') + "T" + (values.general.startHour).format('HH:mm:ss') + "Z" : ""
    console.log("startDate",startDate)
    const [CreateLive, {
        data: dataUpdate,
        loading: loading_EventUpdated,
        error: error_EventUpdated,
    }] = useMutation(graphQL_shema().createLive, {
        context: { clientName: "second" },
        variables: {
            input:{
                generalInfo:{
                    liveTitle:values.general.liveTitle,
                    liveDescription:values.general.liveDescription,
                    livePlan:{
                        plan:values.general.liveAction,
                        startDate:startDate,
                        duration:""
                    },
                    liveAccess:values.general.directAccessMode !== "freeAccess",
                    pwd:values.general.pwd,
                },
                configuration:{
                    liveProgram:values.configuration.directProgram,
                    interOption:{
                        chat:values.configuration.chat,
                        comment:values.configuration.comments,
                        like:values.configuration.likeMention
                    },
                    multiOption:{
                        isRm:values.configuration.richeMediaDiffusion,
                        shareFile:values.configuration.attachments
                    },
                    autoArchLive:{
                        auto:values.configuration.liveAutomaticArchiving,
                        visible:values.configuration.videoMode!=="notVisibleVideo",
                        theme:values.configuration.theme
                    },
                    tags:"tag1, tag2, tag3"
                }
            }
        },
        onCompleted: async (data) => {
            if (data.addLive.code === 200) {
                //history.push("/connexion")
                console.log("enter")


            } else if (data.addLive.code === 403) {

            }
        }
    });
    return ({
        CreateLive,
    })
}

