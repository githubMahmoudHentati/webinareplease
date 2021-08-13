import React, { useState } from "react";
import { Row, Col, Input } from "antd";
import "./Styles.scss";
import {
  DeleteOutlined,
  EditOutlined,
  CheckCircleOutlined,
  MenuOutlined,PlusCircleOutlined
} from "@ant-design/icons";
import {useDispatch, useSelector} from "react-redux";
import {
  setChapterList, removeChapter, editChapter
} from "../../store/formDirectVideoAction";
import { useTranslation } from 'react-i18next';

export const Chapter = () => {
  const [newChap, setNewChap] = useState("");
  const [chapterToEdit, setChapterToEdit] = useState(null);
  const [localId, setLocalId] = useState(1);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const {listChapter} = useSelector((state) => state.FormDirectVideoReducer.configuration)

  const handleChange = (e) => {
    e.persist();
    setNewChap(e.target.value);
  };
  const handleChangeToEdit = (e, chapter) => {
    
    dispatch(editChapter({event: e, chapter}))
  };
  const onRemove = (chapterId) => {
    dispatch(removeChapter({ chapterId }))
  };

  const onEdit = () => {
    setChapterToEdit(null);
  };
const handleAdd = ()=>{
  if (newChap.trim().length !== 0) {
    setLocalId(localId + 1);
    dispatch(setChapterList({ newChap, localId }))
    setNewChap("");
  }
}
  return (
    <Row gutter={[0, 15]} className="Chapters">
      <Col span={24}>
        {listChapter.length ? listChapter.map((ele, index) =>
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
                    <EditOutlined className="list-item-icons" />
                  </div>
                }
                <div onClick={() => onRemove(ele.id)}>
                  <DeleteOutlined className="list-item-icons" />
                </div>
              </div>
            </div>
          ) : (
            <div className="Chapters__list-item">
              <div className="Chapters__list-item__contentToEdit">
              <MenuOutlined className="list-item-icons" />
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
                      <CheckCircleOutlined className="list-item-icons" />
                    </div>
                  }
                  onKeyPress={(event) => {
                    if (event.key === "Enter" && ele.title.trim().length !== 0) {
                      onEdit()
                    }
                  }}
                />
              </div>
            </div>
          )
        ) : <div className="Chapters__empty-list"><span>{t("formDirectVideo.chaptersTab.emptyList")}</span></div>}
      </Col>
      <Col span={24}>
        <Input
          value={newChap}
          onChange={handleChange}
          onKeyPress={(event) => {
            if (event.key === "Enter" && newChap.trim().length !== 0) {
              setLocalId(localId + 1);
              dispatch(setChapterList({ newChap, localId }))
              setNewChap("");
            }
          }}
          placeholder={t("formDirectVideo.chaptersTab.inputPlaceholder")}
          className="Chapters__input"
          suffix={<PlusCircleOutlined onClick={handleAdd} />}
        />
      </Col>
    </Row>
  );
};
