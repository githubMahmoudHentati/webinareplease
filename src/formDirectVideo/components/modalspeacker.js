import React, {useEffect} from 'react';
import {Row, Col, Input, Button, Modal, Upload, Form,Spin} from 'antd'
import '../formDirectVideo.scss'
import {UploadOutlined} from '@ant-design/icons';
import Hooks from "../utils/hooks";
import {UploadLogoSpeaker} from "../utils/uploadLogoSpeaker"

import {useTranslation} from 'react-i18next';
import { LoadingOutlined } from '@ant-design/icons';


export const ModalSpeaker = ({isVisible}) => {
    const [form] = Form.useForm();
    const {t} = useTranslation();


    const requiredFieldRule = [{required: true, message: t("contactClient.FieldsRequired")}];
    const antIcon = <LoadingOutlined style={{ fontSize: 20 }} spin />;

    const isValidEmail = (email) => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(values.configuration.speaker.email)
    }
    const isExistEmail = (email) => {
        let existEmail = values.configuration.SpeakerList.filter(x => x.email === values.configuration.speaker.email && x.id !== values.configuration.speaker.id)
        return existEmail.length > 0
    }

    const props = {
        name: 'file',
        action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
        headers: {
            authorization: 'authorization-text',
        },
    }

    const {handleOk, handleCancel, onChangeSpeaker, values} = Hooks()
    let {onChangeFile, beforeUpload, removeLogoSpeaker} = UploadLogoSpeaker()
    useEffect(() => {
        form.setFieldsValue(values.configuration.speaker)
    });

    return (
        <Modal className="modal-speaker" title={values.configuration.speaker.id?t("formDirectVideo.UpdateParticipant"):t("formDirectVideo.AddParticipant")} visible={isVisible}
               onOk={form.submit} onCancel={handleCancel}
            // okButtonProps={{form:'category-editor-form', key: 'submit', htmlType: 'submit'}}
               footer={[
                   <Button className={"input_modal"} onClick={handleCancel} key="back">
                       {t("formDirectVideo.Cancel")}
                   </Button>,
                   <Button onClick={form.submit} key='submit' htmlType='submit' className={"input_modal input_modal_button"}
                           type="primary">
                       {values.configuration.speaker.id?t("formDirectVideo.Update"):t("formDirectVideo.Add")}
                   </Button>,
               ]}>
            <Form
                form={form}
                layout="horizontal"
                name="product-form"
                onFinish={(e)=>!values.error ? handleOk() : e.preventDefault}
            >
                <Row gutter={[0, 20]}>

                    <Col span={24}>
                        <Row gutter={[0, 8]}>
                            <Col span={24}>
                                <span className={"span_modal"}>{t("formDirectVideo.Photo")}</span>
                            </Col>
                            <Col span={24}>
                                <Upload
                                    onRemove={removeLogoSpeaker}
                                    accept="image/jpeg,image/png"
                                    name="fileList"
                                    fileList={Array.isArray(values.configuration.speaker.logoSpeaker) ? [...values.configuration.speaker.logoSpeaker] : [values.configuration.speaker.logoSpeaker]}
                                    onChange={onChangeFile}
                                    beforeUpload={{beforeUpload}}
                                    {...props} listType="picture">
                                    <Button className={"btn_upload_pic"}
                                            icon={values.loading ? <Spin indicator={antIcon} className={"spin-upload"} wrapperClassName={"spin-upload"} /> : <UploadOutlined/>}>{t("formDirectVideo.ClickToUpload")}</Button>
                                </Upload>
                            </Col>
                            <Col span={24}>
                                <div style={{color:"red", fontSize:"0.75rem"}}>
                                    {values.error? t("CompteSettings.ErrorMsg"): ""}
                                </div>
                            </Col>
                        </Row>
                    </Col>

                    <Col span={24}>
                        <Row gutter={[10, 8]}>
                            <Col span={12}>
                                <span className={"span_modal"}>{t("CompteSettings.Nom")}</span>
                                <span className="require">*</span>
                            </Col>
                            <Col span={12}>
                                <span className={"span_modal"}>{t("CompteSettings.FirstName")}</span>
                                <span className="require">*</span>
                            </Col>
                            <Col span={12}>
                                <Form.Item name="name" className={"form-item-style"}
                                           rules={requiredFieldRule}
                                >
                                    <Input className={"input_modal"} defaultValue={values.configuration.speaker.name}
                                           onChange={(event) => onChangeSpeaker(event, "name")}
                                           placeholder={t("CompteSettings.Nom")}
                                           maxLength={25}></Input>
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item name="lastName" className={"form-item-style"}
                                           rules={requiredFieldRule}
                                >
                                    <Input name="lastName" className={"input_modal"}
                                           defaultValue={values.configuration.speaker.lastName}
                                           onChange={(event) => onChangeSpeaker(event, "lastName")}
                                           placeholder={t("CompteSettings.FirstName")}
                                           maxLength={25}></Input>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Col>

                    <Col span={24}>
                        <Row gutter={[0, 8]}>
                            <Col span={24}>
                                <span className={"span_modal"}>{t("formDirectVideo.Function")}</span>
                            </Col>
                            <Col span={24}>
                                <Form.Item name="title" className={"form-item-style"}
                                >
                                    <Input name="title" className={"input_modal"}
                                           defaultValue={values.configuration.speaker.title}
                                           onChange={(event) => onChangeSpeaker(event, "title")}
                                           placeholder={t("formDirectVideo.Function")}
                                           maxLength={25}></Input>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Col>

                    <Col span={24}>
                        <Row gutter={[0, 8]}>
                            <Col span={24}>
                                <span className={"span_modal"}>Email</span>
                                <span className="require">*</span>
                            </Col>
                            <Col span={24}>
                                <Form.Item name="username" className={"form-item-style"}
                                           rules={[
                                               ({getFieldValue}) => ({
                                                   validator(_, value) {
                                                       if (isValidEmail(value) && !isExistEmail(value)) {
                                                           return Promise.resolve(t("formDirectVideo.value"));
                                                       } else if (isExistEmail(value)) {
                                                           return Promise.reject(t('formDirectVideo.ExistEmailAddress'));
                                                       }
                                                       return Promise.reject(t('formDirectVideo.EnterValidEmailAddress'));
                                                   },
                                               }),
                                           ]}
                                >
                                    <Input name="email" className={"input_modal"}
                                           defaultValue={values.configuration.speaker.email}
                                           onChange={(event) => onChangeSpeaker(event, "email")}
                                           placeholder={"Email"}
                                          ></Input>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Form>
        </Modal>
    )
}