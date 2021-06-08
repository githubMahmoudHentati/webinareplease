import React, { useState,useEffect,useRef } from 'react';
import {Row,Col,Switch,List,DatePicker,Button} from 'antd'
import {DownOutlined,CloseOutlined,PlusOutlined,TwitterOutlined,InstagramOutlined} from '@ant-design/icons';
import empreint from "../../assets/logo-empreinte.svg"
import fb from "../../assets/fb.svg"
import fbPost from  "../../assets/facebookPost.svg"
import linkedinPost from  "../../assets/linkedinPost.svg"
import youtubePost from  "../../assets/youtubePost.svg"




export const SocialTools=()=>{
    const [typePost, setTypePost] = useState([
        {
            id:0,
            type:"Facebook post",
            switch :true,
            logo:<img src={fbPost} style={{width:"24px",height:"24px"}} />,
            plan:[{active:true,startDate:"",endDate:""}]
        },
        {
            id:1,
            type:"Youtube post",
            switch :false,
            logo:<img src={youtubePost} style={{width:"24px",height:"24px"}}/>,
            plan:[{active:true,startDate:"",endDate:""}]
        },
        {
            id:2,
            type:"Linkedlin post",
            switch :false,
            logo:<img src={linkedinPost} style={{width:"24px",height:"24px"}}/>,
            plan:[{active:true,startDate:"",endDate:""}]
        },
        // {
        //     id:3,
        //     type:"Twitter post",
        //     switch :false,
        //     logo:<TwitterOutlined style={{width:"24px",height:"24px"}}/>,
        //     plan:[{active:true,startDate:"",endDate:""}]
        // },
        // {
        //     id:4,
        //     type:"Instagram post",
        //     switch :false,
        //     logo:<InstagramOutlined style={{width:"24px",height:"24px"}}/>,
        //     plan:[{active:true,startDate:"",endDate:""}]
        // }
    ]);
    const addPlan =async (index)=>{

        let newArr=typePost[index].plan.map((el,i) => ({...el,active:false})).concat({active:true,startDate:"",endDate:""})
        await setTypePost(typePost.map(el => (index===el.id? {...el,
            plan: newArr
        }:el)))
    }
    const activePost=(checked,index)=>{
        setTypePost(typePost.map(el => (el.id === index ? {...el, switch:checked} : el)))
    }

    const activePlan=(indexPost,indexPlan)=>{
        let newArr=typePost[indexPost].plan.map((el,i) => (i === indexPlan ? {...el,active:!el.active}:{...el,active:false}))
        console.log("newArr",newArr)
        setTypePost(typePost.map(el => (el.id === indexPost ? {...el,
            plan: newArr
        } : el)))
    }
    console.log("typePost",typePost)

    const closePlan =(indexPost,indexPlan)=>{
        typePost[indexPost].plan.map((el,i) => (i === indexPlan ? typePost[indexPost].plan.splice(indexPlan,1):typePost[indexPost].plan))
        console.log("newArr",typePost)
        setTypePost(typePost.map(el => (el.id === indexPost ? {...el,
            plan: typePost[indexPost].plan
        } : el)))
    }

    return(
        <Row  gutter={[0, 25]}>
            <Col span={24}>
            </Col>
            <Col span={24}>

                <List

                    dataSource={typePost}
                    renderItem={(item,index) => (
                        <List.Item style={{width: "100%", display: "flex", flexDirection: "row"}}>
                            <Row gutter={[0, 20]} style={{width:"100%"}}>
                                <Col span={24}>
                                    <Row justify={"space-between"}>
                                        <Col span={12}>
                                            {item.logo}
                                            <span style={{
                                                textAlign: 'left',
                                                fontSize: "14px",
                                                fontFamily: "system-ui",
                                                fontWeight: "500",
                                                marginLeft:"3%"
                                            }}>{item.type}</span>
                                        </Col>
                                        <Col>
                                            <Switch onChange={(checked)=>activePost(checked,index)} checked={item.switch}/>
                                        </Col>
                                    </Row>
                                </Col>
                                {item.switch === true &&
                                <Col style={{marginBottom: "2%"}} span={24}>
                                    <Row justify={"space-between"}>
                                        <Col span={8}>
                                            <Row gutter={[0, 20]}>
                                                <Col span={24}>
                                                    <span style={{fontWeight: "600"}}>Planifier  la publication</span>
                                                </Col>
                                                {typePost[index].plan.map((element, indexPlan) => {
                                                        return (
                                                            <Col className={"col-planification"} span={24}>
                                                                <Row gutter={[0, 20]}>
                                                                    <Col span={24}>
                                                                        <Row justify={"space-between"}>
                                                                            <Col span={12}>
                                                                                <Row>
                                                                                    <Col>
                                                                                        <DownOutlined onClick={()=>{activePlan(index,indexPlan)}}/>
                                                                                    </Col>
                                                                                    <Col offset={2}>
                                                                                        <span> Planification {indexPlan +1}</span>
                                                                                    </Col>
                                                                                </Row>
                                                                            </Col>
                                                                            <Col>
                                                                                <CloseOutlined onClick={()=>closePlan(index,indexPlan)}/>
                                                                            </Col>
                                                                        </Row>
                                                                    </Col>
                                                                    {element.active &&
                                                                    <Col span={24}>
                                                                        <Row gutter={[0, 10]}>
                                                                            <Col span={24}>
                                                                                <span>Date de début</span>
                                                                            </Col>
                                                                            <Col span={24}>
                                                                                <DatePicker style={{width: "100%"}}/>
                                                                            </Col>
                                                                        </Row>
                                                                    </Col>
                                                                    }
                                                                    {element.active &&
                                                                    <Col span={24}>
                                                                        <Row gutter={[0, 10]}>
                                                                            <Col span={24}>
                                                                                <span>Date de fin</span>
                                                                            </Col>
                                                                            <Col span={24}>
                                                                                <DatePicker style={{width: "100%"}}/>
                                                                            </Col>
                                                                        </Row>
                                                                    </Col>
                                                                    }
                                                                </Row>
                                                            </Col>
                                                        )
                                                    }
                                                )}
                                                <Col style={{
                                                    border: "1px solid RGBA(0, 0, 0, 0.15)",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center"
                                                }} span={24}>
                                                    <Button  style={{width:"100%"}}onClick={() => addPlan(index)} icon={<PlusOutlined/>}>Ajouter une
                                                        planification</Button>
                                                </Col>
                                            </Row>
                                        </Col>
                                        <Col span={14} >
                                            <Row gutter={[0, 10]} style={{border: "1px solid RGBA(0, 0, 0, 0.15)", padding: "2%"}}>
                                                <Col span={24}>
                                                    <Row justify={"space-between"}>
                                                        <Col span={12}>
                                                            <Row justify={"start"}
                                                                 style={{display: "flex", alignItems: "center"}}>
                                                                <Col>
                                                                    <img style={{width: "24px", height: "24px"}}
                                                                         src={empreint}/>
                                                                </Col>
                                                                <Col offset={1}>
                                                                    <span style={{
                                                                        textAlign: 'left',
                                                                        fontSize: "13px",
                                                                        fontFamily: "system-ui"
                                                                    }}>Empreinte</span><br/><span style={{
                                                                    color: "RGBA(0, 0, 0, 0.25)",
                                                                    fontSize: "11px"
                                                                }}>Environ 1mn</span>
                                                                </Col>
                                                            </Row>
                                                        </Col>
                                                        <Col>
                                                            {item.logo}
                                                        </Col>
                                                    </Row>
                                                </Col>
                                                <Col span={24}>
                                                    Torquem detrexit hosti exercirlus quid ex ea voluptate et accurate
                                                    disseredum.
                                                </Col>
                                                <Col span={24} style={{display: "flex", justifyContent: "center"}}>
                                                    <img
                                                        src={"//test-tv.webtv-solution.com/web/data/vignettes/logoSAB2NjY3ZTg5MmItNGI0MS00YjIyLTgwZGYtNmNkY2NjZTRhZTVishutterstock562442005.jpg"}
                                                        style={{height: "100%", width: "100%"}}/>
                                                </Col>
                                                <Col span={24}>
                                                    <span style={{
                                                        textAlign: 'left',
                                                        fontSize: "13px",
                                                        fontFamily: "system-ui"
                                                    }}>Fundamentals of Webinar</span><br/>
                                                    <span style={{
                                                        color: "RGBA(0, 0, 0, 0.25)",
                                                        fontSize: "11px"
                                                    }}>Empriente.com</span>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                </Col>
                                }
                            </Row>
                        </List.Item>
                    )}
                />
            </Col>
        </Row>
    )
}