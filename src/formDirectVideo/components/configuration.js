import React, {useState, useEffect, useRef} from 'react';
import {
    Row,
    Col,
    Input,
    Button,
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

import { PlusSquareOutlined,EditOutlined,MinusCircleOutlined , InfoCircleFilled } from '@ant-design/icons';
import Hooks from '../utils/hooks'
import {ModalSpeaker} from './modalspeacker'
import {useSelector} from "react-redux";



import {useTranslation} from 'react-i18next';
import {TabMenu} from './RichMedia/TabMenu'

import {AttachedFile} from "./attachedFile";

export const Configuration = () => {
    const idLive = localStorage.getItem('idLive')?localStorage.getItem('idLive'):'';
    const [form] = Form.useForm();
    const visibleLiveRef = useRef(null)
    const themesRef = useRef(null)
    const [itemListHeight, setItemListHeight] = useState(null);
    const values = useSelector((state) => state.FormDirectVideoReducer)
    const { listQuestion } = useSelector(
        (state) => state.FormDirectVideoReducer.configuration
      );
    const itemListRef = useRef(null);
    const {t} = useTranslation();

    const {
        configurationOnChangeByName,
        addSpeaker,
        editSpeaker,
        deleteSpeaker,
        configurationOnChange,
        configurationOnChangeButton,
        ConfigurationOnChangeSelect,
        getFirstCharacter,
        scrollToRef
    } = Hooks(form)

    // use Selector redux
    const darkMode = useSelector((state) => state.Reducer.DarkMode)

    const {Option} = Select;
    const children = [];
    for (let i = 10; i < 36; i++) {
        children.push(<Option key={i.toString(36) + i}></Option>);
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

    useEffect(() => {
        !idLive&&values.configuration.liveAutomaticArchiving&&scrollToRef(visibleLiveRef)
    }, [values.configuration.liveAutomaticArchiving]);

    useEffect(() => {
        !idLive&&values.configuration.videoMode === "visibleVideo"&&scrollToRef(themesRef)
    }, [values.configuration.videoMode]);

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
                            {values.configuration.SpeakerList.length > 0 && values.configuration.switchSpeaker &&
                            <Col span={24}>
                                <Row>
                                    <List
                                        className={`list-speaker ${values.configuration.SpeakerList.length > 3 ? "scrolling" : ""}`}
                                        itemLayout="horizontal"
                                        dataSource={values.configuration.SpeakerList}
                                        renderItem={(item, indexItem) => (
                                            <List.Item  actions={[
                                                <span key="list-loadmore-edit"><EditOutlined
                                                        className={"EditOutlined"}
                                                        onClick={() => editSpeaker(item.name, item.lastName, item.title, item.email, item.logoSpeaker, indexItem+1)}
                                                        style={{fontSize: "21px",marginRight:"5px" ,color: darkMode === false ? "rgba(0, 0, 0, 0.25)" : "rgba(255, 255, 255, 0.25)"}}/></span>,
                                                    <span key="list-loadmore-more"><MinusCircleOutlined
                                                        className={"MinusCircleOutlined"}
                                                        style={{
                                                            fontSize: "21px",
                                                            color: darkMode === false ? "rgba(0, 0, 0, 0.25)" : "rgba(255, 255, 255, 0.25)",
                                                            marginLeft:"5px"
                                                        }}
                                                        onClick={() => deleteSpeaker(indexItem)}/></span>
                                                ]}>
                                                <List.Item.Meta
                                                    className={indexItem != -1 && "col-item-list"}
                                                    avatar={
                                                        <Avatar
                                                            className={'avatar-speaker'}
                                                            src={item.logoSpeaker[0] && item.logoSpeaker[0].thumbUrl ? item.logoSpeaker[0].thumbUrl :
                                                                ''}> {getFirstCharacter(item)} </Avatar>}
                                                    title={
                                                        <div ref={itemListRef} >
                                                            <Row>
                                                                <Col xl={12} lg={14} md={18} sm={18} xs={20} className={"list-title-participant"}>
                                                                    <span>
                                                                        {item.name} {item.lastName}</span>
                                                                </Col>
                                                                <Col offset={1}  className={"list-title-participant-dis"}>
                                                                  <span >{item.title}</span>
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
                                {values.configuration.switchSpeaker && values.configuration.SpeakerList.length > 0 &&
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
                            <Col span={24}>
                                <Row gutter={[0, 15]}>
                                    <Col span={24} className={"col-forms"}>
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
                                    <Col span={24}
                                         className={values.configuration.richeMediaDiffusion ? "bordered-col d-block" : "d-none"}>
                                        <TabMenu listQuestion={listQuestion}/>
                                    </Col>
                                    <Col span={24} className={"col-forms"}>

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
                                    <Col span={24} className={""}>
                                                {
                                                    values.configuration.attachments
                                                        ?
                                                      <AttachedFile />
                                                        :
                                                        null
                                                }
                                            </Col>
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
                            <Col span={24} className={"col-forms"} ref={visibleLiveRef}>
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
                            <Col  ref={themesRef} span={24} style={{color: darkMode === false ? "" : "rgba(255, 255, 255, 0.85" }}
                                 className={"col-forms col_theme"}>
                                <span>{t("formDirectVideo.Themes")}</span>
                            </Col>
                            }
                            {values.configuration.liveAutomaticArchiving && values.configuration.videoMode === "visibleVideo" &&
                            <Col offset={0} span={24} className={"col_theme"}>
                                    <Select
                                        value={values.configuration.theme}
                                        showArrow={true}
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
                                         getPopupContainer={() => document.querySelector(".spn2")}
                                    >
                                        {values.configuration.themesList.map((el) => {
                                            return (
                                                <Option name="theme" key={el.id} value={el.title}>{el.title}</Option>
                                            )
                                        })}
                                    </Select>
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
                                    <Select
                                        onInputKeyDown={(e) => {
                                            if (e.target.value.length === 0) {
                                                e.stopPropagation()
                                            }
                                        }}
                                           name="tags" className={"selectTags"} mode="tags"
                                            style={{width: '100%', minHeight: "32px"}} placeholder={t("formDirectVideo.ModeTags")}
                                            onChange={(value, event) => {
                                                configurationOnChangeByName(value, "tags")
                                            }}
                                            {...selectProps}

                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Col>

        </Row>
    )
};