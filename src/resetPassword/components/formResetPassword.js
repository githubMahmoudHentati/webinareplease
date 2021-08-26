import React from 'react';
import {Form} from 'antd'
import '../resetPassword.scss'
import {Hooks} from "../utils/hooks";
import {RecoveryPassword} from "./recoveryPassword";
import {ResetPassword} from "./resetPassword";
import {ErrorResetPassword} from "./errorResetPassword";

export const FormResetPassword =()=>{
    const [form] = Form.useForm();
    const{handleSubmit,values}=Hooks()

    return(
        <Form
            form={form}
            layout="horizontal"
            name="product-form"
            onFinish={handleSubmit}
        >
            {values.constraintData.passwordSent ?
                <RecoveryPassword/>
                : values.constraintData.tokenInvalid || values.constraintData.tokenExpired ?
                    <ErrorResetPassword/> :
                    <ResetPassword/>
            }
        </Form>
    )
}
