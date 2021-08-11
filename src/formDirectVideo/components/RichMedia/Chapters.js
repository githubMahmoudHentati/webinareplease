import React, { useState } from "react";
import { Row, Col, Input } from "antd";
import "./Styles.scss";
import {
  DeleteOutlined,
  EditOutlined,
  CheckCircleOutlined,
  MenuOutlined,
} from "@ant-design/icons";

export const Chapter = () => {
  const [listChapter, setChapters] = useState([]);
  const [newChap, setNewChap] = useState("");
  const [chapterToEdit, setChapterToEdit] = useState(null);
  const [localId, setLocalId] = useState(1);
  const handleChange = (e) => {
    e.persist();
    setNewChap(e.target.value);
  };
  const handleChangeToEdit = (e, chapter) => {
    let oldArray = [...listChapter];
    let objIndex = oldArray.findIndex((obj) => obj.id === chapter.id);
    oldArray[objIndex].title = e.target.value;
    setChapters(oldArray);
  };
  const onRemove = (chapterId) => {
    setChapters(listChapter.filter((ele) => ele.id !== chapterId));
  };

  const onEdit = () => {
    setChapterToEdit(null);
  };

  return (
    <Row gutter={[0, 15]} className="Chapters">
      <Col span={24}>
        {listChapter.map((ele, index) =>
          chapterToEdit !== ele ? (
            <div className="Chapters__list-item">
              <div className="Chapters__list-item__content">
                <MenuOutlined />{" "}
                <span>
                  {index + 1}
                  {"."}
                </span>
                <span>{ele.title}</span>
              </div>
              <div className="Chapters__list-item__actions">
                {
                  <div
                    onClick={() => setChapterToEdit(ele)}
                    style={{
                      display: chapterToEdit !== null ? "none" : "block",
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
            <div className="Chapters__list-item">
              <div className="Chapters__list-item__contentToEdit">
              <MenuOutlined />
                <span>
                  {index + 1}
                  {"."}
                </span>
                <Input
                  value={ele.title}
                  onChange={(event) => handleChangeToEdit(event, ele)}
                  placeholder="Nouveau chapitre"
                  className="Chapters__input-edit"
                  suffix={
                    <div onClick={onEdit}>
                      <CheckCircleOutlined />
                    </div>
                  }
                />
              </div>
            </div>
          )
        )}
      </Col>
      <Col span={24}>
        <Input
          value={newChap}
          onChange={handleChange}
          onKeyPress={(event) => {
            if (event.key === "Enter" && newChap.trim().length !== 0) {
              setLocalId(localId + 1);
              setChapters([...listChapter, { title: newChap, id: localId }]);
              setNewChap("");
            }
          }}
          placeholder="Nouveau chapitre"
          className="Chapters__input"
        />
      </Col>
    </Row>
  );
};
