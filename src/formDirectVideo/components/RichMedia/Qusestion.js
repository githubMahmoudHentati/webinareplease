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
import { useTranslation } from 'react-i18next';

export const Question = ({ listQuestion }) => {
  const inputRef = React.useRef(null);

  const dispatch = useDispatch();
  const {t} = useTranslation()
  const [fakeList, setFakeList] = useState([]);
  const [questionToEdit, setQuestionToEdit] = useState(null);
  const [localId, setLocalId] = useState(1);
  const [isAddingNewQuestion, setIsAddingNewQuestion] = useState(false);
  const [Inputs, setInputs] = useState({
    nsp: 1,
    choices: [{ response: "" }],
    question: "",
  });
  const darkMode = useSelector((state) => state.Reducer.DarkMode);
  useEffect(() => {
    setFakeList(listQuestion);
  }, []);
  useEffect(() => {
    if (inputRef && isAddingNewQuestion) inputRef.current.focus();
  }, [isAddingNewQuestion]);

  const handleChange = (e) => {
    setInputs((inputs) => ({ ...inputs, [e.target.name]: e.target.value }));
  };
  const handleChangeResponse = (e, key) => {
    Inputs.choices[key].response = e.target.value;
    setInputs({ ...Inputs });
  };
  const handleChangeToEditResponse = (e, firstKey, secondKey) => {
    const newList = fakeList.map((item, index) => {
      if (index === firstKey) {
        return {
          ...item,
          choices: item.choices.map((resp, o) => {
              return {
                ...resp,
                response: o === secondKey ? e.target.value : resp.response,
              };
            
          }),
        };
      }
      return item
      /*return {
        ...ele,
        ...ele.choices.map((item, index) => {
          if (index === secondKey) {
            item.response = e.target.value;
          }
        })
      };*/
    });
    setFakeList(newList);
  };
  const handleChangeToEdit = (e, firstKey, secondKey) => {
    const newList = fakeList.map((item, index) => {
      if (index === firstKey) {
        if (e.target.name === "nsp") {
          return {
            ...item,
            nsp: e.target.value,
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
  };
  const onRemove = (questionId) => {
    dispatch(removeQuestion(questionId));
  };

  const handleAddQuestion = () => {
    const { nsp, question, choices } = Inputs;
    setLocalId(localId + 1);
    dispatch(setQuestionList({ nsp, question, choices, questionId: localId }));
    setFakeList([...fakeList, { nsp, question, choices, questionId: localId }]);
    setInputs({ nsp: 1, choices: [{ response: "" }], question: "" });
    setIsAddingNewQuestion(false);
  };

  const addNewResponse = (firstKey, secondKey, attr) => {
    if (attr === "edit") {
      let oldArray = [...fakeList];
      oldArray[firstKey].choices.push({ response: "" });
      setFakeList(oldArray);
    } else {
      setInputs((old) => ({
        ...old,
        choices: [...old.choices, { response: "" }],
      }));
    }
  };

  const removeResponse = (firstKey, resp, attr) => {
    //to do
    let filtered = [...fakeList];

    if (attr === "edit") {
      filtered = filtered[firstKey].choices.filter((ele) => ele !== resp);
      setFakeList((old) => ({
        ...old,
        choices: filtered,
      }));
    } else {
      filtered = Inputs.choices.filter((ele) => ele !== resp);
      setInputs((old) => ({
        ...old,
        choices: filtered,
      }));
    }
  };
  const handleEditQuestion = () => {
    setQuestionToEdit(null);
    dispatch(editQuestion({ editedListQuestion: [...fakeList] }));
  };

  const handleAbortEdit = () => {
    setQuestionToEdit(null);
    setFakeList(listQuestion);
  };
  const responseList = Inputs.choices;
  console.log("list", listQuestion);
  console.log("listFake", fakeList);
  return (
    <Row gutter={[0, 15]} className="Question">
      <Col span={24}>
        {fakeList.length ? (
          fakeList.map((ele, index) =>
            questionToEdit !== index ? (
              <div className="Question__list-item">
                <div className="Question__list-item__content">
                  <MenuOutlined />
                  <span>
                    {index + 1}
                    {"."}
                  </span>
                  {ele.question}
                </div>
                <div className="Question__list-item__actions">
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
                </div>
              </div>
            ) : (
              <Row className="Question__new-question" gutter={[0, 15]}>
                {" "}
                <Col span={24} className="Question__custom-column">
                  <MenuOutlined />
                  <span>
                    {index + 1}
                    {"."}
                  </span>
                  <Input
                    value={ele.question}
                    onChange={(e) => handleChangeToEdit(e, index)}
                    placeholder="question"
                    className="Question__input"
                    name="question"
                  />
                </Col>
                <Col span={24}>
                  <Radio.Group
                    name="nsp"
                    onChange={(e) => handleChangeToEdit(e, index)}
                    value={ele.nsp}
                  >
                    <Radio value={1}>{t("formDirectVideo.questionsTab.radioBox.span1")}</Radio>
                    <Radio value={2}>{t("formDirectVideo.questionsTab.radioBox.span2")}</Radio>
                    <Radio value={3}>{t("formDirectVideo.questionsTab.radioBox.span3")}</Radio>
                    <Radio value={4}>{t("formDirectVideo.questionsTab.radioBox.span4")}</Radio>
                  </Radio.Group>
                </Col>
                {ele.choices.map((resp, o) => (
                  <Col
                    key={o}
                    span={24}
                    style={{
                      display: ele.nsp > 2 ? "flex" : "none",
                    }}
                  >
                    <Input
                      value={resp.response}
                      onChange={(e) => handleChangeToEditResponse(e, index, o)}
                      placeholder={t("formDirectVideo.questionsTab.inputResponsePlaceholder")}
                      className="Question__input"
                      name="response"
                      suffix={
                        ele.choices.length === o + 1 ? (
                          <PlusCircleOutlined
                            onClick={() => addNewResponse(index, o, "edit")}
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
                      Annuler
                    </Button>
                    <Button
                      className={
                        ele.question.trim().length !== 0
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
                      {"Modifier"}
                    </Button>
                  </Col>
                </Row>
              </Row>
            )
          )
        ) : (
          <div className="Chapters__empty-list">
            <span>{t("formDirectVideo.questionsTab.emptyList")}</span>
          </div>
        )}
      </Col>
      <Col
        className="Question__add-question"
        style={{ display: isAddingNewQuestion ? "none" : "block" }}
      >
        <div onClick={() => setIsAddingNewQuestion(true)}>
          {" "}
          <PlusCircleOutlined /> <span>{t("formDirectVideo.questionsTab.addQuestion")}</span>
        </div>
      </Col>
      <Row
        className="Question__new-question"
        gutter={[0, 15]}
        style={{ display: isAddingNewQuestion === true ? "flex" : "none" }}
      >
        {" "}
        <Col span={24}>
          <div className="Question__input-label">{t("formDirectVideo.questionsTab.inputQuestionLabel")}</div>
          <Input
            ref={inputRef}
            value={Inputs && Inputs.question}
            onChange={handleChange}
            placeholder={t("formDirectVideo.questionsTab.inputQuestionPlaceholder")}
            className="Question__input"
            name="question"
          />
        </Col>
        <Col span={24}>
          <Radio.Group
            name="nsp"
            onChange={handleChange}
            value={Inputs && Inputs.nsp}
          >
           <Radio value={1}>{t("formDirectVideo.questionsTab.radioBox.span1")}</Radio>
           <Radio value={2}>{t("formDirectVideo.questionsTab.radioBox.span2")}</Radio>
           <Radio value={3}>{t("formDirectVideo.questionsTab.radioBox.span3")}</Radio>
           <Radio value={4}>{t("formDirectVideo.questionsTab.radioBox.span4")}</Radio>
          </Radio.Group>
        </Col>
        {Inputs &&
          Inputs.choices.map((ele, o) => (
            <Col
              key={o}
              span={24}
              style={{ display: Inputs && Inputs.nsp > 2 ? "flex" : "none" }}
            >
              <Input
                value={ele.response}
                onChange={(e) => handleChangeResponse(e, o)}
                placeholder={t("formDirectVideo.questionsTab.inputResponsePlaceholder")}
                className="Question__input"
                name="response"
                suffix={
                  responseList.length === o + 1 ? (
                    <PlusCircleOutlined
                      className="list-item-icons"
                      onClick={addNewResponse}
                    />
                  ) : (
                    <DeleteOutlined
                      className="list-item-icons"
                      onClick={() => removeResponse(ele)}
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
              Annuler
            </Button>
            <Button
              className={
                Inputs && Inputs.question && Inputs.question.trim().length !== 0
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
              {"Ajouter"}
            </Button>
          </Col>
        </Row>
      </Row>
    </Row>
  );
};
