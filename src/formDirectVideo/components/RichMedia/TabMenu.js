import { Tabs } from "antd";
import { SettingOutlined ,  UnorderedListOutlined , QuestionCircleFilled , AppstoreFilled} from "@ant-design/icons";
import { Slides } from "../RichMedia/Slides";
import { Question } from "../RichMedia/Qusestion";
import { Chapter } from "../RichMedia/Chapters";
import { useTranslation } from "react-i18next";
import {setFormDirectLiveConstraintDataOnchange, setTab} from "../../store/formDirectVideoAction";
import { useDispatch, useSelector } from "react-redux";
import {useEffect, useRef} from "react";
import Hooks from "../../utils/hooks";

const { TabPane } = Tabs;

export const TabMenu = ({ listQuestion }) => {
    const { t } = useTranslation();
    const {currentTab} = useSelector((state) => state.FormDirectVideoReducer);
    const dispatch = useDispatch();
    const onChangeTab = (key) => {
        dispatch(setTab(key));
    };
    const richMediaRef = useRef(null)
    const {values,scrollToRef}=Hooks()

    useEffect(() => {
        values.constraintData.scrollIntoView&&values.configuration.richeMediaDiffusion&&scrollToRef(richMediaRef)
        },
        [values.configuration.richeMediaDiffusion]);

    // useEffect(() => {
    //     return () => {
    //         dispatch(setFormDirectLiveConstraintDataOnchange({constraintDataNameChange:"scrollIntoView",constraintDataValueChange:false}))
    //     }
    // }, []);

    return (
        <div ref={richMediaRef}>
            <Tabs
                onChange={onChangeTab}
                activeKey={currentTab}
                className="TabMenu"
            >
                <TabPane
                    tab={
                        <span className={"tabMenu"}>
            <UnorderedListOutlined />
                            {t("formDirectVideo.chaptersTab.title")}
          </span>
                    }
                    key="0"
                >
                    <Chapter />
                </TabPane>
                <TabPane
                    tab={
                        <span className={"tabMenu"}>
            <QuestionCircleFilled />
                            {t("formDirectVideo.questionsTab.title")}
          </span>
                    }
                    key="1"
                >
                    <Question listQuestion={listQuestion} />
                </TabPane>
                <TabPane
                    tab={
                        <span className={"tabMenu"}>
            <AppstoreFilled />
                            {t("formDirectVideo.slidesTab.title")}
          </span>
                    }
                    key="2"
                >
                    <Slides />
                </TabPane>
            </Tabs>
        </div>
    );
};
