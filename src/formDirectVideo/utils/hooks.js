import React, { useState,useEffect,useRef } from 'react';

export  const Hooks=()=>{
    const [values, setValues] = useState({modalSpeaker:false});

    const onChangeSwitch =(checked)=>{
            setValues({...values,"modalSpeaker":checked})
    }
    const handleOk = () => {
        setValues({...values,"modalSpeaker":false})
    };

    const handleCancel = () => {
        setValues({...values,"modalSpeaker":false})
    };

    return({
        onChangeSwitch,
        handleOk,
        handleCancel,
        values
    })
}