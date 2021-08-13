import { Tabs } from "antd";
import { SettingOutlined } from "@ant-design/icons";
import { Slides } from "../RichMedia/Slides";
import { Question } from "../RichMedia/Qusestion";
import { Chapter } from "../RichMedia/Chapters";
const { TabPane } = Tabs;

export const TabMenu = ({listQuestion}) => {
  
  return (
    <Tabs defaultActiveKey="0" className="TabMenu">
      <TabPane
        tab={
          <span>
            <SettingOutlined />
            chapitres
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
            question
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
            diapositives
          </span>
        }
        key="2"
      >
        <Slides />
      </TabPane>
    </Tabs>
  );
};
