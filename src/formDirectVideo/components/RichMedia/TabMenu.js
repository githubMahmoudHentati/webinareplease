import { Tabs } from "antd";
import { SettingOutlined } from "@ant-design/icons";
import { Slides } from "../RichMedia/Slides";
import { Question } from "../RichMedia/Qusestion";
import { Chapter } from "../RichMedia/Chapters";
import { useTranslation } from "react-i18next";
import { setTab } from "../../store/formDirectVideoAction";
import { useDispatch, useSelector } from "react-redux";

const { TabPane } = Tabs;

export const TabMenu = ({ listQuestion }) => {
  const { t } = useTranslation();
  const {currentTab} = useSelector((state) => state.FormDirectVideoReducer);
  const dispatch = useDispatch();
  const onChangeTab = (key) => {
    dispatch(setTab(key));
  };
  return (
    <Tabs
      onChange={onChangeTab}
      activeKey={currentTab}
      className="TabMenu"
    >
      <TabPane
        tab={
          <span>
            <SettingOutlined />
            {t("formDirectVideo.chaptersTab.title")}
          </span>
        }
        key="0"
      >
        <Chapter />
      </TabPane>
      <TabPane
        tab={
          <span>
            <SettingOutlined />
            {t("formDirectVideo.questionsTab.title")}
          </span>
        }
        key="1"
      >
        <Question listQuestion={listQuestion} />
      </TabPane>
      <TabPane
        tab={
          <span>
            <SettingOutlined />
            {t("formDirectVideo.slidesTab.title")}
          </span>
        }
        key="2"
      >
        <Slides />
      </TabPane>
    </Tabs>
  );
};
