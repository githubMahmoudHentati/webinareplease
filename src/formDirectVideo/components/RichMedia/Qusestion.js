import React, { useState, useEffect } from "react";
import { Row, Col, Input, Radio, Button } from "antd";
import "./Styles.scss";
import {
  DeleteOutlined,
  EditOutlined,
  MenuOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import { useSelector } from "react-redux";

export const Question = () => {
  const [listQuestion, setQuestions] = useState([]);
  const [listQuestionFake, setQuestionsFake] = useState([]);
  const [questionToEdit, setQuestionToEdit] = useState(null);
  const [localId, setLocalId] = useState(1);
  const [isAddingNewQuestion, setIsAddingNewQuestion] = useState(false);
  const [Inputs, setInputs] = useState({
    nsp: 1,
    choices: [{ response: "" }],
    question: "",
  });
  const darkMode = useSelector((state) => state.Reducer.DarkMode);

  const handleChange = (e) => {
    setInputs((inputs) => ({ ...inputs, [e.target.name]: e.target.value }));
  };
  const handleChangeResponse = (e, key) => {
    Inputs.choices[key].response = e.target.value;
    setInputs({ ...Inputs });
  };
  const handleChangeToEdit = (e, firstKey, secondKey) => {
    let oldArray = [...listQuestionFake];
    if (e.target.name === "question")
      oldArray[firstKey].question = e.target.value;
    if (e.target.name === "nsp") oldArray[firstKey].nsp = e.target.value;
    if (e.target.name === "response")
      oldArray[firstKey].choices[secondKey].response = e.target.value;
    setQuestionsFake(oldArray);
  };
  const onRemove = (questionId) => {
    setQuestions(listQuestion.filter((ele) => ele.id !== questionId));
  };

  const handleAddQuestion = () => {
    const { nsp, question, choices } = Inputs;
    setLocalId(localId + 1);
    setQuestions([...listQuestion, { question, id: localId, choices, nsp }]);
    setInputs({ nsp: 1, choices: [{ response: "" }], question: "" });
    setIsAddingNewQuestion(false);
  };

  const addNewResponse = () => {
    setInputs((old) => ({
      ...old,
      choices: [...old.choices, { response: "" }],
    }));
  };

  const removeResponse = (resp, attr) => {
    //to do
    let filtered = []
    if(attr == 'edit') {
       filtered = listQuestion.choices.filter((ele) => ele !== resp);
       setQuestions((old) => ({
        ...old,
        choices: filtered,
      }));

    }
    else {
      filtered = Inputs.choices.filter((ele) => ele !== resp);
      setInputs((old) => ({
        ...old,
        choices: filtered,
      }));
    }
     
  };
  const handleEditQuestion = () => {
    setQuestionToEdit(null);
    setQuestions(listQuestionFake);
  };

  const handleFakeData = (index) => {
    setQuestionToEdit(index);
    setQuestionsFake(listQuestion);
  };
  const handleAbortEdit = () => {
    setQuestionToEdit(null);
    setQuestions(listQuestion);
  };
  const responseList = Inputs.choices;
  console.log('list', listQuestion)
  console.log('listfake', listQuestionFake)

  return (
    <Row gutter={[0, 15]} className="Question">
      <Col span={24}>
        {listQuestion.map((ele, index) =>
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
                    onClick={() => handleFakeData(index)}
                    style={{
                      display: questionToEdit !== null ? "none" : "block",
                    }}
                  >
                    <EditOutlined />
                  </div>
                }
                <div onClick={() => onRemove(ele.id)}>
                  <DeleteOutlined />
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
                  <Radio value={1}>Oui-Non</Radio>
                  <Radio value={2}>Oui-Non-NSP</Radio>
                  <Radio value={3}>Choix simple</Radio>
                  <Radio value={4}>Choix multiple</Radio>
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
                    onChange={(e) => handleChangeToEdit(e, index, o)}
                    placeholder="Réponse"
                    className="Question__input"
                    name="response"
                    suffix={
                      responseList.length === o + 1 ? (
                        <PlusCircleOutlined onClick={addNewResponse} />
                      ) : (
                        <DeleteOutlined onClick={() => removeResponse(resp, 'edit')} />
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
        )}
      </Col>
      <Col
        className="Question__add-question"
        style={{ display: isAddingNewQuestion ? "none" : "block" }}
      >
        <div onClick={() => setIsAddingNewQuestion(true)}>
          {" "}
          <PlusCircleOutlined /> <span>Ajouter une question</span>
        </div>
      </Col>
      <Row
        className="Question__new-question"
        gutter={[0, 15]}
        style={{ display: isAddingNewQuestion === true ? "flex" : "none" }}
      >
        {" "}
        <Col span={24}>
          <div className="Question__input-label">nouveau question</div>
          <Input
            value={Inputs && Inputs.question}
            onChange={handleChange}
            placeholder="question"
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
            <Radio value={1}>Oui-Non</Radio>
            <Radio value={2}>Oui-Non-NSP</Radio>
            <Radio value={3}>Choix simple</Radio>
            <Radio value={4}>Choix multiple</Radio>
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
                placeholder="Réponse"
                className="Question__input"
                name="response"
                suffix={
                  responseList.length === o + 1 ? (
                    <PlusCircleOutlined onClick={addNewResponse} />
                  ) : (
                    <DeleteOutlined onClick={() => removeResponse(ele)} />
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
