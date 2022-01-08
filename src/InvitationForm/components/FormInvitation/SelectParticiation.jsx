import React, {useState} from 'react';
import { Select} from 'antd';
import {useHooksInvitationForm} from "../../utils/useHooksInvitationForm";
const { Option } = Select;

export const SelectParticipation = ({prefixCls}) =>{
    const {FormDataSource, state, handleChangeParticipation} = useHooksInvitationForm()
    return (
        <Select
            className={`${prefixCls}__selectForm`+ (  !state.selectedParticipation.value ? ` ${prefixCls}__error` : "")}
            name={"participation"}
            size={"large"}
            style={{width: '100%'}}
            placeholder={FormDataSource.form.participation}
            defaultValue={ state.selectedParticipation.name  +  ' — ' + state.selectedParticipation.value  +  FormDataSource.form.places}
            value={ state.selectedParticipation.name  +  ' — ' + state.selectedParticipation.value  +  FormDataSource.form.places}
            onChange={handleChangeParticipation}
            dropdownClassName={`${prefixCls}__selectInputForm`}
        >
            {
                state.participation.map(x=>(
                    <Option value={ x.id + '-' + x.value } key={x.id}>
                        {x.name +  ' — ' + x.value +  FormDataSource.form.places}
                    </Option>
                ))
            }

        </Select>
    )
}