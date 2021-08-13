import React, {useState, useEffect, useRef} from 'react';
import {
    Row,
    Col,
    Input,
    Button,
    Card,
    Tabs,
    Breadcrumb,
    Menu,
    Switch,
    Radio,
    Checkbox,
    Select,
    Space,
    List,
    Avatar,
    Form,
    Tooltip
} from 'antd'
import '../formDirectVideo.scss'
import { Upload, message } from 'antd';
import { PlusSquareOutlined,EditOutlined,MinusCircleOutlined , InfoCircleFilled, SettingOutlined } from '@ant-design/icons';
import Hooks from '../utils/hooks'
import {ModalSpeaker} from './modalspeacker'
import {useDispatch, useSelector} from "react-redux";
import {setConfigurationOnchange, setModalSpeaker, setOnchange, setTabRichmedia} from "../store/formDirectVideoAction";
import EditableTagGroupConfiguration from "./EditableTagGroupConfiguration";

import moment from "moment";
import {useTranslation} from 'react-i18next';
import {TabMenu} from './RichMedia/TabMenu'

import {AttachedFile} from "./attachedFile";

export const Configuration = () => {
    const dispatch = useDispatch()
    const [itemListHeight, setItemListHeight] = useState(null);
    const values = useSelector((state) => state.FormDirectVideoReducer)
    const { listQuestion } = useSelector(
        (state) => state.FormDirectVideoReducer.configuration
      );
    const itemListRef = useRef(null);
    const {t, i18n} = useTranslation();

    const {
        configurationOnChangeByName,
        addSpeaker,
        editSpeaker,
        deleteSpeaker,
        configurationOnChange,
        configurationOnChangeButton,
        ConfigurationOnChangeSelect,
        displayThemes
    } = Hooks()

    console.log("values", values)
    // use Selector redux
    const darkMode = useSelector((state) => state.Reducer.DarkMode)

    const CheckboxGroup = Checkbox.Group;
    const {Option} = Select;
    const children = [];
    for (let i = 10; i < 36; i++) {
        children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
    }

    const selectProps = {
        mode: "tags",
        placeholder: t("formDirectVideo.ModeTags"),
        dropdownClassName: `custom-dropdown`,
        className: `custom-select`
    };


    useEffect(() => {
        itemListRef.current && setItemListHeight(itemListRef.current.offsetHeight)
    }, [itemListRef]);

    useEffect(async () => {
        console.log("testswitch", values.configuration.SpeakerList.length > 0)
        values.configuration.SpeakerList.length > 1 &&
        dispatch(setConfigurationOnchange({configurationNameChange: "switchSpeaker", configurationValueChange: true}));
    }, []);
    console.log("testxxx", values.configuration.switchSpeaker)

  

    return (
        <Row gutter={[0, 40]} className={"Configuration"}>
            <Col span={24}>
                <Row gutter={[0, 25]}>
                    <Col span={24} className={"col-forms"}>
                        <span className={"config_direct"}
                              style={{color: darkMode === false ? "" : "rgba(255, 255, 255, 0.85"}}>{t("formDirectVideo.LivePageConfiguration")}</span>
                    </Col>
                    <Col span={24}>
                        <Row gutter={[0, 10]}>
                            <Col className={"col-forms"} span={24}>

                                <span name="directProgram"
                                      style={{color: darkMode === false ? "" : "rgba(255, 255, 255, 0.85"}}>{t("formDirectVideo.LiveProgram")}</span>

                            </Col>
                            <Col span={24} className={"col-forms"}>
                                <Form.Item name="directProgram" className={"form-item-style"}
                                >
                                    <Input.TextArea Rows={5}
                                                    name="directProgram"
                                                    onChange={configurationOnChange}
                                                    placeholder={t("formDirectVideo.TitleAndDesc")}>
                                    </Input.TextArea>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Col>
                    <Col span={24}>
                        <Row gutter={[10, 15]}>
                            <Col className={"col-forms"}>
                                <span style={{
                                    color: darkMode === false ? "" : "rgba(255, 255, 255, 0.85"
                                }}>{t("formDirectVideo.Participants")}</span>
                            </Col>
                            <Col>
                                    <Switch checked={values.configuration.switchSpeaker}
                                            name="switchSpeaker"
                                            onChange={(value) => configurationOnChangeByName(value, "switchSpeaker")}
                                    />
                            </Col>
                            {values.configuration.SpeakerList && values.configuration.SpeakerList.length > 1 && values.configuration.switchSpeaker &&
                            <Col span={24}>
                                <Row>
                                    <List
                                        className={`list-speaker ${values.configuration.SpeakerList.length > 3 ? "scrolling" : ""}`}
                                        itemLayout="horizontal"
                                        dataSource={values.configuration.SpeakerList}
                                        renderItem={(item, indexItem) => (
                                            <List.Item actions={indexItem != 0 ? [
                                                    <span key="list-loadmore-edit"><EditOutlined
                                                        onClick={() => editSpeaker(item.name, item.lastName, item.title, item.email, item.logoSpeaker, indexItem)}
                                                        style={{fontSize: "21px", color: darkMode === false}}/></span>,
                                                    <span key="list-loadmore-more"><MinusCircleOutlined
                                                        style={{
                                                            fontSize: "21px",
                                                            color: darkMode === false ? "" : "rgba(255, 255, 255, 0.85"
                                                        }}
                                                        onClick={() => deleteSpeaker(indexItem)}/></span>
                                                ] :
                                                [<span style={{marginLeft: "48px"}}/>]}>
                                                <List.Item.Meta
                                                    className={indexItem != 0 && "col-item-list"}
                                                    avatar={<Avatar
                                                        src={item.logoSpeaker[0] && item.logoSpeaker[0].thumbUrl ? item.logoSpeaker[0].thumbUrl :
                                                            "https://www.trustedclothes.com/blog/wp-content/uploads/2019/02/anonymous-person-221117.jpg"}/>}
                                                    title={
                                                        <div ref={itemListRef}>
                                                            <Row>
                                                                <Col xl={12} lg={14} md={18} sm={18} xs={20}>
                                                                    <span style={{
                                                                        textAlign: 'left',
                                                                        fontSize: "17px",
                                                                        fontFamily: "system-ui"
                                                                    }}>
                                                                        {item.name} {item.lastName}</span>
                                                                </Col>
                                                                <Col offset={1}>
                                                                    <span style={{
                                                                        textAlign: 'left',
                                                                        fontSize: "15px",
                                                                        fontFamily: "system-ui",
                                                                        fontWeight: "lighter"
                                                                    }}>{item.title}</span>
                                                                </Col>
                                                            </Row>
                                                        </div>
                                                    }
                                                />
                                            </List.Item>
                                        )}
                                    />
                                </Row>
                            </Col>
                            }
                            <Col className={"button-SpeackAadd"} span={24}>
                                {values.configuration.modalSpeaker &&
                                <ModalSpeaker isVisible={values.configuration.modalSpeaker}/>
                                }
                                {values.configuration.switchSpeaker && values.configuration.SpeakerList.length > 1 &&
                                <Button onClick={addSpeaker} icon={
                                    <PlusSquareOutlined/>}>{t("formDirectVideo.AddParticipant")}</Button>
                                }
                            </Col>
                        </Row>
                    </Col>
                    <Col span={24}>
                        <Row gutter={[0, 15]}>
                            <Col className={"col-forms"} span={24}>
                                <span style={{
                                    color: darkMode === false ? "" : "rgba(255, 255, 255, 0.85",
                                }}>{t("formDirectVideo.InterActiveOption")}</span>
                            </Col>
                            <Col span={24} className={"col-forms  interactive-options"}>
                                <Checkbox onChange={configurationOnChangeButton} value="chat"
                                          style={{color: darkMode === false ? "" : "rgba(255, 255, 255, 0.85"}}
                                          checked={values.configuration.chat}
                                >
                                            <p>{t("formDirectVideo.Chat")}</p>
                                </Checkbox>
                                <Checkbox  onChange={configurationOnChangeButton} value="comments"
                                           style={{color: darkMode === false ? "" : "rgba(255, 255, 255, 0.85"}}
                                           checked={values.configuration.comments}>
                                            <p>{t("formDirectVideo.Comments")}</p>
                                </Checkbox>
                                <Checkbox onChange={configurationOnChangeButton} value="likeMention"
                                          style={{color: darkMode === false ? "" : "rgba(255, 255, 255, 0.85"}}
                                          checked={values.configuration.likeMention}>
                                            <p>{t("formDirectVideo.Likes")}</p>
                                 </Checkbox>
                            </Col>
                        </Row>
                    </Col>
                    <Col span={24}>
                        <Row gutter={[0, 15]}>
                            <Col className={"col-forms"} span={24}>
                                <span style={{
                                    color: darkMode === false ? "" : "rgba(255, 255, 255, 0.85",
                                }}>{t("formDirectVideo.LiveMultimediaOptions")}</span>
                            </Col>
                            <Col span={24} className={"col-forms"}>
                                <Row gutter={[0, 15]}>
                                    <Col span={24}  className={"col-forms"}>
                                    <Checkbox onChange={configurationOnChangeButton}
                                          name="richeMediaDiffusion"
                                          value="richeMediaDiffusion"
                                          style={{color: darkMode === false ? "" : "rgba(255, 255, 255, 0.85"}}
                                          checked={values.configuration.richeMediaDiffusion}>
                                            <p style={{margin: 0}}>{t("formDirectVideo.Richmedia")}
                                                <InfoCircleFilled
                                                    style={{color: darkMode === false ? "rgba(0, 0, 0, 0.15)" : "rgba(255, 255, 255, 0.85"}}
                                                    className={"infosIcon"}/></p>
                                        </Checkbox>
                                        <br/>
                                    </Col>
                                    <Col span={24} className={values.configuration.richeMediaDiffusion ? "bordered-col d-block" : "d-none"}>
                                        <TabMenu listQuestion={listQuestion} />
                                    </Col>
                                    <Col span={24}  className={"col-forms"}>

                                        <Checkbox onChange={configurationOnChangeButton}
                                                  name="attachments"
                                                  value="attachments"
                                                  style={{color: darkMode === false ? "" : "rgba(255, 255, 255, 0.85"}}
                                                  checked={values.configuration.attachments}>
                                            <p style={{margin: 0}}>{t("formDirectVideo.AttachedFiles")}
                                                <InfoCircleFilled
                                                    style={{color: darkMode === false ? "rgba(0, 0, 0, 0.15)" : "rgba(255, 255, 255, 0.85"}}
                                                    className={"infosIcon"}/></p></Checkbox>
                                    </Col>
                                    {
                                        values.configuration.attachments
                                            ?
                                            <Col span={24}  className={""}>
                                                <AttachedFile/>
                                            </Col>
                                            :
                                            null
                                    }
                                </Row>
                             </Col>
                        </Row>
                    </Col>
                </Row>
            </Col>
            <Col span={24}>
                <Row gutter={[0, 25]}>
                    <Col span={24} className={"col-forms"}>
                        <span className={"config_direct"}
                              style={{color: darkMode === false ? "" : "rgba(255, 255, 255, 0.85"}}>{t("formDirectVideo.VideoSetup")}</span>
                    </Col>
                    <Col span={24}>
                        <Row gutter={[0, 15]}>
                            <Col span={24}>
                                <Row gutter={[10, 0]}>
                                    <Col className={"col-forms"}>
                                        <span style={{
                                            color: darkMode === false ? "" : "rgba(255, 255, 255, 0.85",
                                        }}>{t("formDirectVideo.AutomaticArchiving")}</span>
                                    </Col>
                                    <Col>
                                        <Form.Item name="liveAutomaticArchiving" className={"form-item-style"}
                                        >
                                            <Switch name="liveAutomaticArchiving" checked={values.configuration.liveAutomaticArchiving}
                                                    onChange={(value) => configurationOnChangeByName(value, "liveAutomaticArchiving")}
                                            />
                                            <Tooltip placement="right"
                                                     title={t("formDirectVideo.ArchivedAndVisualisationMsg")}>
                                                <InfoCircleFilled style={{
                                                    cursor: "pointer",
                                                    color: darkMode === false ? "rgba(0, 0, 0, 0.15)" : "rgba(255, 255, 255, 0.85"
                                                }} className={"infosIcon"}/>
                                            </Tooltip>
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </Col>
                            {values.configuration.liveAutomaticArchiving &&
                            <Col span={24} className={"col-forms"}>
                                <Form.Item name="videoMode" className={"form-item-style"}
                                >
                                    <Radio.Group value={values.configuration.videoMode} name="videoMode"
                                                 onChange={configurationOnChange}>
                                        <Space direction="vertical">
                                            <Radio onChange={configurationOnChangeButton} value="notVisibleVideo">
                                                <span
                                                    style={{color: darkMode === false ? "" : "rgba(255, 255, 255, 0.85"}}><p>{t("formDirectVideo.VideoNotVisible")}</p></span></Radio>
                                            <Radio checked={values.configuration.visibleVideo}
                                                   onChange={configurationOnChangeButton} value="visibleVideo">
                                                <span
                                                    style={{color: darkMode === false ? "" : "rgba(255, 255, 255, 0.85"}}><p>{t("formDirectVideo.VisibleVideo")}</p></span></Radio>
                                        </Space>
                                    </Radio.Group>
                                </Form.Item>
                            </Col>
                            }
                            {values.configuration.liveAutomaticArchiving && values.configuration.videoMode === "visibleVideo" &&
                            <Col span={24} style={{color: darkMode === false ? "" : "rgba(255, 255, 255, 0.85"}}
                                 className={"col-forms"}>
                                <span>{t("formDirectVideo.Themes")}</span>
                            </Col>
                            }
                            {values.configuration.liveAutomaticArchiving && values.configuration.videoMode === "visibleVideo" &&
                            <Col offset={1} span={23}>
                                <Form.Item name="theme" className={"form-item-style"}
                                >
                                    <Select
                                         mode="multiple"
                                        className={"spn2"}
                                        name="theme" onChange={(value,action)=>{ConfigurationOnChangeSelect(value,action,"theme")}}
                                        showSearch
                                        style={{width: "100%"}}
                                        placeholder={t("formDirectVideo.SelectTheme")}
                                        optionFilterProp="children"
                                        filterOption={(input, option) =>
                                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                        }
                                    >
                                        {values.configuration.themesList.map((el) => {
                                            return (
                                                <Option name="theme" key={el.id} value={el.title}>{el.title}</Option>
                                            )
                                        })}
                                    </Select>
                                </Form.Item>
                            </Col>
                            }
                        </Row>
                    </Col>
                    <Col span={24}>
                        <Row gutter={[0, 10]}>
                            <Col className={"col-forms"} span={24}>
                                <span style={{color: darkMode === false ? "" : "rgba(255, 255, 255, 0.85"}}>{t("formDirectVideo.Tags")}</span>
                            </Col>
                            <Col span={24} className={"col-forms"}>
                                <Form.Item name="tags" className={"form-item-style"}
                                >
                                    <Select name="tags" className={"selectTags"} mode="tags"
                                            style={{width: '100%', minHeight: "32px"}} placeholder={t("formDirectVideo.ModeTags")}
                                            onChange={(value, event) => {
                                                configurationOnChangeByName(value, "tags")
                                            }}  {...selectProps} />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Col>

        </Row>
    )
};