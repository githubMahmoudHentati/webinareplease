import React, { useState,useEffect,useRef } from 'react';
import {Row,Col,Switch,List,DatePicker,Button} from 'antd'
import {DownOutlined,CloseOutlined,PlusOutlined,TwitterOutlined,InstagramOutlined} from '@ant-design/icons';
import empreint from "../../assets/logo-empreinte.svg"
import fb from "../../assets/fb.svg"
import fbPost from  "../../assets/facebookPost.svg"
import linkedinPost from  "../../assets/linkedinPost.svg"
import youtubePost from  "../../assets/youtubePost.svg"
import {useSelector} from "react-redux";



export const SocialTools=()=>{
    // use Selector redux
    const darkMode = useSelector((state)=> state.Reducer.DarkMode)

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
        <Row  gutter={[0, 0]}>
            <Col span={24}>
            </Col>
            <Col span={24}>
                <p style={{fontSize: "20px",
                    fontFamily: "system-ui",
                    fontWeight: "500",
                    color:darkMode===false?"":"rgba(255, 255, 255, 0.85"
                }}>
                    Envoi des publications sur les réseaux sociaux
                </p>
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
                                                marginLeft:"3%",
                                                color:darkMode===false?"":"rgba(255, 255, 255, 0.85)"
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
                                                    <span style={{fontWeight: "600" , color:darkMode===false?"":"rgba(255, 255, 255, 0.85)"}}>Planifier  la publication</span>
                                                </Col>
                                                {typePost[index].plan.map((element, indexPlan) => {
                                                        return (
                                                            <Col className={"col-planification"} span={24} style={{border:darkMode===false?"":"1px solid rgba(255, 255, 255, 0.15)"}}>
                                                                <Row gutter={[0, 20]}>
                                                                    <Col span={24}>
                                                                        <Row justify={"space-between"}>
                                                                            <Col span={12}>
                                                                                <Row>
                                                                                    <Col>
                                                                                        <DownOutlined style={{color:darkMode===false?"":"rgba(255, 255, 255, 0.85)"}} onClick={()=>{activePlan(index,indexPlan)}}/>
                                                                                    </Col>
                                                                                    <Col offset={2}>
                                                                                        <span style={{color:darkMode===false?"":"rgba(255, 255, 255, 0.85)"}}> Planification {indexPlan +1}</span>
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
                                                                                <span style={{color:darkMode===false?"":"rgba(255, 255, 255, 0.85)"}}>Date de début</span>
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
                                                                                <span style={{color:darkMode===false?"":"rgba(255, 255, 255, 0.85)"}}>Date de fin</span>
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
                                                    <Button  style={{width:"100%" , background:darkMode===false?"":"rgba(0, 0, 0, 0.04)" ,color:darkMode===false?"":"rgba(255, 255, 255, 0.85)", border:darkMode===false?"":"solid 1px rgba(255, 255, 255, 0.15)"}}  onClick={() => addPlan(index)} icon={<PlusOutlined/>}>
                                                        Ajouter une planification
                                                    </Button>
                                                </Col>
                                            </Row>
                                        </Col>
                                        <Col span={14}  style={{border:darkMode===false?"":"1px solid rgba(255, 255, 255, 0.15)"}}>
                                            <Row gutter={[0, 10]} style={{border: "1px solid RGBA(0, 0, 0, 0.15)", padding: "2%"}}>
                                                <Col span={24}>
                                                    <Row justify={"space-between"}>
                                                        <Col span={12}>
                                                            <Row justify={"start"}
                                                                 style={{display: "flex", alignItems: "center"}}>
                                                                <Col style={{background:darkMode===false?"":"rgba(255, 255, 255, 0.85)",padding:"5px",border:darkMode===false?" solid 1px rgba(0, 0, 0, 0.15)":" solid 1px rgba(255, 255, 255, 0.15)"}}>
                                                                    <img style={{width: "24px", height: "24px"}}
                                                                         src={empreint}/>
                                                                </Col>
                                                                <Col offset={1}>
                                                                    <span style={{
                                                                        textAlign: 'left',
                                                                        fontSize: "13px",
                                                                        fontFamily: "system-ui",
                                                                        color:darkMode===false?"":"rgba(255, 255, 255, 0.85)"
                                                                    }}>Empreinte</span><br/><span style={{
                                                                    fontSize: "11px",
                                                                    color:darkMode===false?"RGBA(0, 0, 0, 0.25)":"rgba(255, 255, 255, 0.85)"
                                                                }}>Environ 1mn</span>
                                                                </Col>
                                                            </Row>
                                                        </Col>
                                                        <Col>
                                                            {item.logo}
                                                        </Col>
                                                    </Row>
                                                </Col>
                                                <Col span={24} style={{color:darkMode===false?"":"rgba(255, 255, 255, 0.85)"}}>
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
                                                        fontFamily: "system-ui",
                                                        color:darkMode===false?"":"rgba(255, 255, 255, 0.85)"
                                                    }}>Fundamentals of Webinar</span><br/>
                                                    <span style={{
                                                        fontSize: "11px",
                                                        color:darkMode===false?"RGBA(0, 0, 0, 0.25)":"rgba(255, 255, 255, 0.85)"
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