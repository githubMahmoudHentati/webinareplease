import React from 'react';
import {Form} from 'antd'
import '../forgetPassword.scss'
import {Hooks} from "../utils/hooks";
import {RecoveryPassword} from "./recoveryPassword";
import {ForgetPassword} from "./forgetPassword";

export const FormForgetPassword =()=>{
    const [form] = Form.useForm();

    const{handleSubmit,values}=Hooks()

    return(
        <Form
            form={form}
            layout="horizontal"
            name="product-form"
            onFinish={handleSubmit}
        >
            {!values.constraintData.passwordSent ?
                <ForgetPassword/>
                :
                <RecoveryPassword/>
            }
        </Form>
    )
}
