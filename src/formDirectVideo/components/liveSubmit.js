import React, { useState,useEffect,useRef } from 'react';
import {Row, Col, Input, Button, Card, Tabs, Breadcrumb, Menu, Form} from 'antd'
import {GraphQLFetchData} from "../utils/graphQLFetchData";
import {Hooks} from "../utils/hooks";

export const LiveSubmit=(props)=>{
    const [form] = Form.useForm();
    const {handleSubmit}=Hooks()

    return(
        <div>
            <Form
                form={form}
                layout="horizontal"
                name="product-form"
                onFinish={handleSubmit}
            >
                {props.children}
            </Form>
        </div>
    )
}