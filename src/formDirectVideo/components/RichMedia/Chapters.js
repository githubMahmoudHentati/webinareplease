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
  setChapterList, removeChapter, editChapter, sortChapters
} from "../../store/formDirectVideoAction";
import { useTranslation } from 'react-i18next';
import SortableList, { SortableItem } from "react-easy-sort";
import {arrayMoveImmutable} from "array-move";

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
  const onSortEnd = async (oldIndex, newIndex) => {
    //await setFakeList((array) => arrayMoveImmutable(array, oldIndex, newIndex));
    await dispatch(sortChapters({"oldIndexChapters":oldIndex, "newIndexChapters":newIndex }));
  };
  return (
    <Row gutter={[0, 15]} className="Chapters">
      <Col span={24}>
        <SortableList
            onSortEnd={onSortEnd}
        >
        {listChapter.length ? listChapter.map((ele, index) =>
          chapterToEdit !== ele ? (
              <SortableItem key={ele.id}>
            <div className="Chapters__list-item">
              <Row className="Chapters__list-item__content" style={{ width: "100%" }}>
              <Col xs={{ span: 5 }} lg={{ span: 2}} md={{span: 3}} xxl={{span: 2}}>
                <MenuOutlined className={"menuOutlinedIcon"}/>{" "}
                <span>
                  {index + 1}
                  {"."}
                </span></Col>
                <Col xs={{ span: 14 }} lg={{ span: 19}} md={{span: 17}} xxl={{span: 20}} className="text-overflow">
                <span>{ele.title}</span>
                </Col>
                <Col xs={{ span: 4 }} lg={{ span: 3}} md={{span: 4}} xxl={{span: 2}} className="Chapters__list-item__actions">
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
                </Col> 
                           </Row>
                           </div>
              </SortableItem>
          ) : (
            <div className="Chapters__list-item">
              <Row className="Chapters__list-item__contentToEdit" style={{ width: "100%" }}>
              <Col xs={{ span: 5 }} lg={{ span: 2}} md={{span: 3}} xxl={{span: 2}}>
              <MenuOutlined className="list-item-icons" />
                <span>
                  {index + 1}
                  {"."}
                </span>
                </Col>
                <Col xs={{ span: 19 }} lg={{ span: 22}} md={{span: 21}} xxl={{span: 22}}>
                <Input
                  value={ele.title}
                  onChange={(event) => handleChangeToEdit(event, ele)}
                  placeholder="Nouveau chapitre"
                  className="Chapters__input-edit Chapters__input"
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
                </Col>
              </Row>
            </div>
          )
        ) : <div className="empty-list"><span>{t("formDirectVideo.chaptersTab.emptyList")}</span></div>}
        </SortableList>
      </Col>
      <Col span={24} className="custom-column">
        <Input
          value={newChap}
          onChange={handleChange}
          onKeyPress={(event) => {
            console.log("sssssssssssssssssss",event.key)
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
