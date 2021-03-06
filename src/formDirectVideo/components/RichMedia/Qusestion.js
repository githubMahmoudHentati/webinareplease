import React, { useState, useEffect } from "react";
import { Row, Col, Input, Radio, Button } from "antd";
import "./Styles.scss";
import {
  DeleteOutlined,
  EditOutlined,
  MenuOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  setQuestionList,
  removeQuestion,
  editQuestion, sortQuestion,
} from "../../store/formDirectVideoAction";
import { useTranslation } from "react-i18next";
import SortableList, { SortableItem } from "react-easy-sort";
import {arrayMoveImmutable} from "array-move";
import {FormDirectVideoReducer} from "../../store/formDirectVideoReducer";
export const Question = ({ listQuestion }) => {
  const listQustionRedux = useSelector((state) => state.FormDirectVideoReducer.configuration.listQuestion);
  const inputRef = React.useRef(null);

  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [fakeList, setFakeList] = useState([]);
  const [questionToEdit, setQuestionToEdit] = useState(null);
  const [localId, setLocalId] = useState(1);
  const [isAddingNewQuestion, setIsAddingNewQuestion] = useState(false);
  const [isEditQuestion , setIsEditQuestion] = useState(false);
  const [isFullInput , setIsFullInput] = useState("");
  const [Inputs, setInputs] = useState({
    nsp: 1,
    //choices: [{ response: "" }],
    choices: { response:[""] },
    question: "",
  });
  const [fakeListBeforeEdit ,  SetFakeListBeforeEdit] = useState([]);
  const [annulerEdit , setAnnulerEdit] = useState(false)
  const [isEditing, setIsEditing] = useState(false);
  const darkMode = useSelector((state) => state.Reducer.DarkMode);

  console.log("listQustionRedux",isAddingNewQuestion)

  useEffect(() => {
    setFakeList(listQustionRedux);
  }, [listQustionRedux]);

  useEffect(() => {
    if (inputRef && isAddingNewQuestion) inputRef.current.focus();
  }, [isAddingNewQuestion]);

  const handleChange = (e) => {
    setInputs((inputs) => ({ ...inputs, [e.target.name]: e.target.value }));
    setIsFullInput(e.target.value)
  };
  const handleChangeResponse = (e, key) => {
    console.log("ertgqfsdcwxbccnc",key)
    Inputs.choices.response[key] = e.target.value;
    setInputs({ ...Inputs });
  };
  const handleChangeToEditResponse = (e, firstKey, secondKey) => {
    const newList = fakeList.map((item, index) => {
      if (index === firstKey) {

          return {
            ...item,
            ...item.choices,
            response: item.choices.response.map((resp , o)=>{
               return {
                 ...resp ,
                 resp : o ===secondKey ? [item.choices.response[secondKey] = e.target.value ] : [resp]
               }
            } )
          };

      }
      return item;
    });
    setIsEditing(true);
    setFakeList(newList);
  };
  console.log(annulerEdit)
  const handleChangeToEdit = (e, firstKey, secondKey) => {

    const newList = fakeList.map((item, index) => {
      if (index === firstKey) {
        if (e.target.name === "nsp") {
          return {
            ...item,
            nsp: e.target.value,
            choices: {response:item.choices.response.length === 0 ? [...item.choices.response, ""]  : [...item.choices.response]}
          };
        }
        if (e.target.name === "question") {
          return {
            ...item,
            question: e.target.value,
          };
        }
      }

      return item;
    });

    setFakeList(newList);
    setIsEditing(true);
  };
  const onRemove = (questionId) => {
    dispatch(removeQuestion(questionId));
  };

  const handleAddQuestion = () => {
    const { nsp, question, choices } = Inputs;

    setLocalId(localId + 1);
    dispatch(setQuestionList({ nsp, question, choices: {response:[...choices.response.filter(ele => ele.length > 0)]}, questionId: localId }));
    setFakeList([...fakeList, { nsp, question, choices: {response:[...choices.response.filter(ele => ele.length > 0)]}, questionId: localId }]);
    setInputs({ nsp: 1, choices: { response: [""] }, question: "" });
    setIsAddingNewQuestion(false);
  };
  const handleAddQuestionKey = (e) =>{
    if(e.key === "Enter"){
      const { nsp, question, choices } = Inputs;

      setLocalId(localId + 1);
      dispatch(setQuestionList({ nsp, question, choices: [...choices.filter(ele => ele.response.length > 0)], questionId: localId }));
      setFakeList([...fakeList, { nsp, question, choices: [...choices.filter(ele => ele.response.length > 0)], questionId: localId }]);
      setInputs({ nsp: 1, choices: { response:[""] }, question: "" });
      setIsAddingNewQuestion(true);
    }
  }

  const addNewResponse = (firstKey, attr) => {
    if (attr === "edit") {
      let oldArray = [...fakeList];
      oldArray[firstKey].choices.response.push( "" );
      setFakeList(oldArray);
      setIsEditing(true);
    } else {
      setInputs((old) => ({
        ...old,
      //  choices: [...old.choices, { response: "" }],
        choices: {response: [...old.choices.response, ""] }
      }));
    }
  };
  const addNewResponseKey = (e,firstKey, attr)=>{
    if(e.key === "Enter"){
      if (attr === "edit") {
        let oldArray = [...fakeList];
        oldArray[firstKey].choices.push({ response: "" });
        setFakeList(oldArray);
        setIsEditing(true);
      } else {
        setInputs((old) => ({
          ...old,
          //choices: [...old.choices, { response: "" }],
          choices: {response: [...old.choices.response, ""] }
        }));
      }
    }
  }

  const removeResponse = (firstKey, resp, attr) => {
    let filtered = [...fakeList];

    if (attr === "edit") {
      const newList = filtered.map((item, index) => {
        if (index === firstKey) {
          return {
            ...item,
            choices:{response: item.choices?.response.filter((ele) => ele !== resp)}
          };
        }
        return item;
      });
      setFakeList(newList);
      setIsEditing(true);
    } else {
      filtered = Inputs.choices?.response.filter((ele) => ele !== resp);
      setInputs((old) => ({
        ...old,
        choices: {response: filtered},
      }));
    }
  };
  const handleAbortEdit = (o) => {
    setQuestionToEdit(null);
    setFakeList(listQustionRedux);
    setIsEditing((old) => !old);

  };
  const handleAbortEditkey = (e , index) =>{
    console.log("iueiazueyiazuiazueyiazukjhd5646",e)
    if(e.key === "Enter"){
      setQuestionToEdit(null);
      setFakeList(listQuestion);
      setIsEditing((old) => !old);
    }
  }
  const handleEditQuestion = () => {
    setQuestionToEdit(null);
    dispatch(editQuestion({ editedListQuestion: [...fakeList] }));
    setIsEditing((old) => !old);
  };
  const handleEditQuestionKey = (e) =>{
    if(e.key === "Enter"){
      setQuestionToEdit(null);
      dispatch(editQuestion({ editedListQuestion: [...fakeList] }));
      setIsEditing((old) => !old);
    }
  }
  const handleEditQuestionIcon = () =>{
     SetFakeListBeforeEdit(listQustionRedux)
  }

  const checkResponseStatus = (check, responses) =>{
    switch(check){
      case 1 : return true;
      case 2 : return true;
      case 3: return responses && responses.filter(ele => ele.length !== 0).length > 0 ?  true : false;
      case 4 : return responses && responses.filter(ele => ele.length !== 0).length > 1 ?  true : false;;
      default : return
    }
  }
  const responseList = Inputs.choices?.response;

  const onSortEnd = async (oldIndex, newIndex) => {
     await setFakeList((array) => arrayMoveImmutable(array, oldIndex, newIndex));
     await dispatch(sortQuestion({oldIndex, newIndex }));
  };

  return (
      <Row gutter={[0, 15]} className="Question">
        <Col span={24}>
          <SortableList
              onSortEnd={onSortEnd}
          >
          {fakeList.length ? (
              fakeList.map((ele, index) =>
                  questionToEdit !== index  ? (
                      <SortableItem key={ele.id}>
                      <div className="Question__list-item">
                        <Row
                            className="Question__list-item__content"
                            style={{ width: "100%" }}
                        >
                          <Col xs={{ span: 5 }} lg={{ span: 2}} md={{span: 3}} xxl={{span: 2}}>
                            <MenuOutlined className={"menuOutlinedIcon"}/>
                            <span>
                      {index + 1}
                              {"."}
                    </span>
                          </Col>
                          <Col xs={{ span: 14 }} lg={{ span: 19}} md={{span: 17}} xxl={{span: 20}} className="text-overflow">
                            <span>{ele.question}</span>
                          </Col>
                          <Col xs={{ span: 4 }} lg={{ span: 3}} md={{span: 4}} xxl={{span: 2}} className="Question__list-item__actions">
                            {
                              <div
                                  onClick={() => setQuestionToEdit(index)}
                                  style={{
                                    display: questionToEdit !== null ? "none" : "block",
                                  }}
                              >
                                <EditOutlined className="list-item-icons" onClick={()=>{setIsEditQuestion(true);handleEditQuestionIcon()}}/>
                              </div>
                            }
                            <div onClick={() => onRemove(ele)}>
                              <DeleteOutlined className="list-item-icons" />
                            </div>
                          </Col>
                        </Row>
                      </div>
                      </SortableItem>
                  ) : (
                      <Row className="Question__new-question" gutter={[0, 15]}
                      style={{display:isAddingNewQuestion === true && isEditQuestion === false ? "none" : "flex"}}
                      >
                        <Row style={{width: '100%'}} className="Question__custom-column">
                          <Col xs={{ span: 5 }} lg={{ span: 2}} md={{span: 3}} xxl={{span: 2}}>
                            <MenuOutlined />
                            <span>
                    {index + 1}
                              {"."}
                  </span></Col>
                          <Col xs={{ span: 19 }} lg={{ span: 22}} md={{span: 21}} xxl={{span: 22}} className="text-overflow">
                            <Input
                                value={ele.question}
                                onChange={(e) => handleChangeToEdit(e, index)}
                                onKeyPress={(e)=>handleAbortEditkey(e,index)}
                                autocomplete="off"
                                placeholder="question"
                                className="Question__input"
                                name="question"
                            /></Col>
                        </Row>
                        <Row style={{width: '100%'}}>
                          <Radio.Group
                              name="nsp"
                              onChange={(e) => handleChangeToEdit(e, index)}
                              value={ele.nsp}
                              className="Question__grp-radio"
                          >
                            <Radio value={1}>
                              {t("formDirectVideo.questionsTab.radioBox.span1")}
                            </Radio>
                            <Radio value={2}>
                              {t("formDirectVideo.questionsTab.radioBox.span2")}
                            </Radio>
                            <Radio value={3}>
                              {t("formDirectVideo.questionsTab.radioBox.span3")}
                            </Radio>
                            <Radio value={4}>
                              {t("formDirectVideo.questionsTab.radioBox.span4")}
                            </Radio>
                          </Radio.Group>
                        </Row>
                        {ele.choices.response.map((resp, o) => (
                            <Col
                                key={o}
                                span={24}
                                style={{
                                  display: ele.nsp > 2 ? "flex" : "none",
                                }}
                                className="custom-column"
                            >
                              <Input
                                  value={resp}
                                  onChange={(e) => handleChangeToEditResponse(e, index, o)}
                                  onKeyPress={(e)=>addNewResponseKey(e,index, "edit")}
                                  placeholder={t(
                                      "formDirectVideo.questionsTab.inputResponsePlaceholder"
                                  )}
                                  autocomplete="off"
                                  className="Question__input"
                                  name="response"
                                  suffix={
                                    ele.choices?.response.length === o + 1 ? (
                                        <PlusCircleOutlined
                                            onClick={() => addNewResponse(index, "edit")}
                                            className={(resp.length === 0 ? "d-none" : "d-block")}
                                        />
                                    ) : (
                                        <DeleteOutlined
                                            className="list-item-icons"
                                            onClick={() => removeResponse(index, resp, "edit")}
                                        />
                                    )
                                  }
                              />
                            </Col>
                        ))}
                        <Row
                            className="Question__actions"
                            gutter={[0, 15]}
                            justify="end"
                            style={{ width: "100%" }}
                        >
                          <Col>
                            <Button
                                onClick={()=> handleAbortEdit(index)}
                                className="Question__actions-abort"
                                style={{
                                  fontFamily: "SF Pro Display",
                                  fontWeight: "normal",
                                  color:
                                      darkMode === false ? "" : "rgba(255, 255, 255, 0.85)",
                                  background:
                                      darkMode === false ? "" : "rgba(255, 255, 255, 0.04)",
                                  border:
                                      darkMode === false
                                          ? ""
                                          : "1px solid rgba(255, 255, 255, 0.15)",
                                }}
                            >
                              {t("ShowVideo.Cancel")}
                            </Button>
                            <Button
                                className={
                                  ele.question.length !== 0 && isEditing && checkResponseStatus(ele.nsp, ele.choices?.response)
                                      ? ""
                                      : "Question__actions-disabled"
                                }
                                onClick={handleEditQuestion}
                                type={"primary"}
                            >
                              {t("formDirectVideo.Update")}
                            </Button>
                          </Col>
                        </Row>
                      </Row>
                  )
              )
          ) : (
              <div className="empty-list">
                <span>{t("formDirectVideo.questionsTab.emptyList")}</span>
              </div>
          )}
          </SortableList>
        </Col>
        <Col
            className="Question__add-question"
            //style={{ display: isAddingNewQuestion  ? "none" : "block" }}
        >
        <span onClick={() => {setIsAddingNewQuestion(true);setIsEditQuestion(false);setQuestionToEdit(null)} }>
          {" "}
          <PlusCircleOutlined />{" "}
          <span>{t("formDirectVideo.questionsTab.addQuestion")}</span>
        </span>
        </Col>
        <Row
            className="Question__new-question rowAddQuestion"
            gutter={[0, 15]}
            style={{
              display: isAddingNewQuestion === true && isEditQuestion === false  ? "flex" : "none",
              width: "100%",
            }}
        >
          {" "}
          <Col span={24} className="custom-column">
            <div className="Question__input-label">
              {t("formDirectVideo.questionsTab.inputQuestionLabel")}
            </div>
            <Input
                ref={inputRef}
                value={Inputs && Inputs.question}
                onChange={handleChange}
                onKeyPress={handleAddQuestionKey}
                placeholder={t(
                    "formDirectVideo.questionsTab.inputQuestionPlaceholder"
                )}
                className="Question__input"
                name="question"
                autocomplete="off"
            />
          </Col>
          <Col span={24}>
            <Radio.Group
                name="nsp"
                onChange={handleChange}
                value={Inputs && Inputs.nsp}
                className="Question__grp-radio"
            >
              <Radio value={1}>
                {t("formDirectVideo.questionsTab.radioBox.span1")}
              </Radio>
              <Radio value={2}>
                {t("formDirectVideo.questionsTab.radioBox.span2")}
              </Radio>
              <Radio value={3}>
                {t("formDirectVideo.questionsTab.radioBox.span3")}
              </Radio>
              <Radio value={4}>
                {t("formDirectVideo.questionsTab.radioBox.span4")}
              </Radio>
            </Radio.Group>
          </Col>
          {Inputs &&
          Inputs.choices.response.map((ele, o) => (
              <Col
                  key={o}
                  span={24}
                  style={{ display: Inputs && Inputs.nsp > 2 ? "flex" : "none" }}
              >
                <Input
                    value={ele}
                    onChange={(e) => handleChangeResponse(e, o)}
                    onKeyPress={addNewResponseKey}
                    placeholder={t(
                        "formDirectVideo.questionsTab.inputResponsePlaceholder"
                    )}
                    autocomplete="off"
                    className="Question__input"
                    name="response"
                    suffix={
                      responseList.length === o + 1 ? (
                          <PlusCircleOutlined
                              className={"list-item-icons " + (ele.length === 0 ? "d-none" : "d-block")}
                              onClick={addNewResponse}
                          />
                      ) : (
                          <DeleteOutlined
                              className="list-item-icons"
                              onClick={() => removeResponse({} ,ele)}
                          />
                      )
                    }
                />
              </Col>
          ))}
          <Row
              className="Question__actions"
              gutter={[0, 15]}
              justify="end"
              style={{ width: "100%" }}
          >
            <Col>
              <Button
                  onClick={() => setIsAddingNewQuestion(false)}
                  className="Question__actions-abort"
                  style={{
                    fontFamily: "SF Pro Display",
                    fontWeight: "normal",
                    color: darkMode === false ? "" : "rgba(255, 255, 255, 0.85)",
                    background:
                        darkMode === false ? "" : "rgba(255, 255, 255, 0.04)",
                    border:
                        darkMode === false
                            ? ""
                            : "1px solid rgba(255, 255, 255, 0.15)",
                  }}
              >
                {t("ShowVideo.Cancel")}
              </Button>
              <Button
                  className={
                    Inputs && Inputs.question && Inputs.question.length !== 0 && checkResponseStatus(Inputs.nsp, Inputs.choices?.response)
                        ? ""
                        : "Question__actions-disabled"
                  }
                  onClick={handleAddQuestion}
                  type={"primary"}
              >
                {t("ShowVideo.Add")}
              </Button>
            </Col>
          </Row>
        </Row>
      </Row>
  );
};
