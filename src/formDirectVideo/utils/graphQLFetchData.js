import {useQuery,useMutation} from "@apollo/react-hooks";
import {graphQL_shema} from "./graphQL";
import {Hooks} from "./hooks";
import {useHistory} from "react-router-dom";
import {setConnexionConstraintDataOnchange} from "../../connexion/store/connexionAction";
import {useDispatch} from "react-redux";
import moment from "moment";
import {setAppSetLogin} from "../../utils/redux/actions";
import {setConfigurationOnchange, setGeneralOnchange} from "../store/formDirectVideoAction";
import {setAccountSetting, setConstraintDataOnchange} from "../../compteSettings/store/accountSettingsAction";



export const GraphQLFetchData = (values) => {
    const history = useHistory()
    const dispatch = useDispatch()
    console.log("test",values)
    let startDate= values.general.startDate && values.general.startHour ? (values.general.startDate).format('YYYY-MM-DD') + "T" + (values.general.startHour).format('HH:mm:ss') + "Z" : ""
    let period = values.general.period? values.general.period.format('HH:mm:ss'):""
    console.log("addSpeaker",values.configuration.addSpeakerList)


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
                        duration:period
                    },
                    liveAccess:values.general.directAccessMode !== "freeAccess",
                    pwd:values.general.pwd,
                },
                configuration:{
                    liveProgram:values.configuration.directProgram,
                    addSpeaker:values.configuration.addSpeakerList,

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
                    tags:"tags1,tags2"
                }
            }
        },
        onCompleted: async (data) => {
            if (data.addLive.code === 200) {
                history.push("/showVideos")


            } else if (data.addLive.code === 403) {

            }
        }
    });

    const [generateSecuredPassword,{loading:loading_securedPassword, data:data_securedPassword}]
        = useMutation(graphQL_shema().generateSecuredPassword, {
        skip:values.general.securedPasswordOption,
        variables: {input:{autoGenerate:true}},
        context: { clientName: "second" },
        onCompleted :async (data)=>{
            if (data.generatePwd.code===200)
            {

                await dispatch(setGeneralOnchange({generalNameChange:"pwd", generalValueChange:data.generatePwd.pwd}));

                // await values.form.setFieldsValue({...values.form.getFieldsValue(),securedPasswordOption:data.generatePwd.pwd})
                // console.log("form.getFieldsValue()",values.form.getFieldsValue())
                await dispatch(setGeneralOnchange({generalNameChange:"loadingSecuredPassword", generalValueChange:true}));
            }
        }
    })

    const [themesDisplayQueryAction,{loading: loading_themesDisplay, data: ThemesDisplayData}]
        = useMutation(graphQL_shema().themesDisplayQuery, {
        context: { clientName: "second" },
        onCompleted: async (data) => {
            dispatch(setConfigurationOnchange({configurationNameChange:"themesList", configurationValueChange:data.getThemesList}));
        }
    })



    return ({
        CreateLive,
        generateSecuredPassword,
        loading_securedPassword,
        data_securedPassword,
        themesDisplayQueryAction
    })
}

