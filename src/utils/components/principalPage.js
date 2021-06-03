import React,{useState , useEffect} from 'react';
import GlobalHeader from "./header";
import {Card} from "antd";

export const PrincipalPage =(props)=>{
    return(
        <div className="showVideosDiv">
            <GlobalHeader/>
            <Card className={"card"}>
                <Card>
                    {props.children}
                </Card>
            </Card>
        </div>
    )
}