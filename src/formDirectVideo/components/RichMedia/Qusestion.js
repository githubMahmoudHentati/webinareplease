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
  editQuestion,
} from "../../store/formDirectVideoAction";
import { useTranslation } from "react-i18next";

export const Question = ({  }) => {
  const inputRef = React.useRef(null);

  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [fakeList, setFakeList] = useState([]);
  const [questionToEdit, setQuestionToEdit] = useState(null);
  const [localId, setLocalId] = useState(1);
  const [isAddingNewQuestion, setIsAddingNewQuestion] = useState(false);
  const [Inputs, setInputs] = useState({
    nsp: 1,
    response: [ "" ],
    question: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const darkMode = useSelector((state) => state.Reducer.DarkMode);
  const  listQuestion  = useSelector(
      (state) => state.FormDirectVideoReducer.configuration.listQuestion
  );
  console.log("eeeeeeeeeeeeeeeeeeeee",listQuestion)
  useEffect(() => {
    setFakeList(listQuestion);
  }, [listQuestion]);
  useEffect(() => {
    if (inputRef && isAddingNewQuestion) inputRef.current.focus();
  }, [isAddingNewQuestion]);

  const handleChange = (e) => {
    setInputs((inputs) => ({ ...inputs, [e.target.name]: e.target.value }));
  };
  const handleChangeResponse = (e, key) => {
    Inputs.response[key] = e.target.value;
    setInputs({ ...Inputs });
  };
  const handleChangeToEditResponse = (e, firstKey, secondKey) => {
    console.log("helloEdit",firstKey)
    const newList = fakeList.map((item, index) => {
      if (index === firstKey) {
          item.response[secondKey] = e.target.value
      }
      return item;
    });
    setIsEditing(true);
    setFakeList(newList);
  };
  const handleChangeToEdit = (e, firstKey, secondKey) => {
    const newList = fakeList.map((item, index) => {
      if (index === firstKey) {
        if (e.target.name === "nsp") {
          return {
            ...item,
            nsp: e.target.value,
            response: item.response.length === 0 ? [...item.response,  ""]  : [...item.response]
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
    const { nsp, question, response } = Inputs;

    setLocalId(localId + 1);
    dispatch(setQuestionList({ nsp, question, response: [...response.filter(ele => ele.trim().length > 0)], questionId: localId }));
    setFakeList([...fakeList, { nsp, question, response: [...response.filter(ele => ele.trim().length > 0)], questionId: localId }]);
    setInputs({ nsp: 1, response: [ "" ], question: "" });
    setIsAddingNewQuestion(false);
  };

  const addNewResponse = (firstKey, attr) => {
    if (attr === "edit") {
      let oldArray = [...fakeList];
      oldArray[firstKey].response.push( "" );
      setFakeList(oldArray);
      setIsEditing(true);
    } else {
      setInputs((old) => ({
        ...old,
        response: [...old.response, ""],
      }));
    }
  };

  const removeResponse = (firstKey, resp, attr) => {
    let filtered = [...fakeList];

    if (attr === "edit") {
      const newList = filtered.map((item, index) => {
        if (index === firstKey) {
          return {
            ...item,
            response: item.response.filter((ele) => ele !== resp),
          };
        }
        return item;
      });
      setFakeList(newList);
      setIsEditing(true);
    } else {
      filtered = Inputs.response.filter((ele) => ele !== resp);
      setInputs((old) => ({
        ...old,
        response: filtered,
      }));
    }
  };
  const handleEditQuestion = () => {
    setQuestionToEdit(null);
    dispatch(editQuestion({ editedListQuestion: [...fakeList] }));
    setIsEditing((old) => !old);
  };

  const handleAbortEdit = () => {
    setQuestionToEdit(null);
    setFakeList(listQuestion);
    setIsEditing((old) => !old);
  };

  const checkResponseStatus = (check, responses) =>{
    switch(check){
      case 1 : return true;
      case 2 : return true;
      case 3: return responses && responses.filter(ele => ele.trim().length !== 0).length > 0 ?  true : false;
      case 4 : return responses && responses.filter(ele => ele.trim().length !== 0).length > 1 ?  true : false;;
      default : return
    }
  }
  const responseList = Inputs.response;
  console.log('tttttttttttttttt', fakeList)
  return (
      <Row gutter={[0, 15]} className="Question">
        <Col span={24}>
          {fakeList.length ? (
              fakeList.map((ele, index) =>
                  questionToEdit !== index ? (
                      <div className="Question__list-item">
                        <Row
                            className="Question__list-item__content"
                            style={{ width: "100%" }}
                        >
                          <Col xs={{ span: 5 }} lg={{ span: 2}} md={{span: 3}} xxl={{span: 2}}>
                            <MenuOutlined />
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
                                <EditOutlined className="list-item-icons" />
                              </div>
                            }
                            <div onClick={() => onRemove(ele.id)}>
                              <DeleteOutlined className="list-item-icons" />
                            </div>
                          </Col>
                        </Row>
                      </div>
                  ) : (
                      <Row className="Question__new-question" gutter={[0, 15]}>
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
                        {ele.response.map((resp, o) => (
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
                                  placeholder={t(
                                      "formDirectVideo.questionsTab.inputResponsePlaceholder"
                                  )}
                                  className="Question__input"
                                  name="response"
                                  suffix={
                                    ele.response.length === o + 1 ? (
                                        <PlusCircleOutlined
                                            onClick={() => addNewResponse(index, "edit")}
                                            className={(resp.trim().length === 0 ? "d-none" : "d-block")}
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
                                onClick={handleAbortEdit}
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
                                  ele.question.trim().length !== 0 && isEditing && checkResponseStatus(ele.nsp, ele.response)
                                      ? ""
                                      : "Question__actions-disabled"
                                }
                                onClick={handleEditQuestion}
                                type={"primary"}
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
        </Col>
        <Col
            className="Question__add-question"
            style={{ display: isAddingNewQuestion ? "none" : "block" }}
        >
        <span onClick={() => setIsAddingNewQuestion(true)}>
          {" "}
          <PlusCircleOutlined />{" "}
          <span>{t("formDirectVideo.questionsTab.addQuestion")}</span>
        </span>
        </Col>
        <Row
            className="Question__new-question"
            gutter={[0, 15]}
            style={{
              display: isAddingNewQuestion === true ? "flex" : "none",
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
                placeholder={t(
                    "formDirectVideo.questionsTab.inputQuestionPlaceholder"
                )}
                className="Question__input"
                name="question"
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
          Inputs.response.map((ele, o) => (
              <Col
                  key={o}
                  span={24}
                  style={{ display: Inputs && Inputs.nsp > 2 ? "flex" : "none" }}
              >
                <Input
                    value={ele}
                    onChange={(e) => handleChangeResponse(e, o)}
                    placeholder={t(
                        "formDirectVideo.questionsTab.inputResponsePlaceholder"
                    )}
                    className="Question__input"
                    name="response"
                    suffix={
                      responseList.length === o + 1 ? (
                          <PlusCircleOutlined
                              className={"list-item-icons " + (ele.trim().length === 0 ? "d-none" : "d-block")}
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
                    Inputs && Inputs.question && Inputs.question.trim().length !== 0 && checkResponseStatus(Inputs.nsp, Inputs.response)
                        ? ""
                        : "Question__actions-disabled"
                  }
                  onClick={handleAddQuestion}
                  type={"primary"}
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
                {t("ShowVideo.Add")}
              </Button>
            </Col>
          </Row>
        </Row>
      </Row>
  );
};

