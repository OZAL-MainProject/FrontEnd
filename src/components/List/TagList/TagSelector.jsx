import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import '../../../style/travelInfopage.scss';
import useMediaQuery from "../../../hooks/useMediaQuery";
import Modal from "../../Modal/Modal";
import { openModal, closeModal } from "../../../RTK/modalSlice";
import TagList from "./TagList";
import ListStyle from '.././List.module.scss'
import { fetchCityName } from "../../../RTK/tour/thunk";

const TagSelector = () => {
  const dispatch = useDispatch();
  const isSmallView = useMediaQuery("(max-width: 800px)");
  const isModalOpen = useSelector((state) => state.modal.modals["tags"]);

  useEffect(() => {
    dispatch(fetchCityName());
  }, []);

  return (
    <>
      {isSmallView ? (
        <>
          <div onClick={() => dispatch(openModal("tags"))}>목록보기</div>
          {isModalOpen && (
            <Modal type="tags">
              <TagList />
              <div onClick={() => dispatch(closeModal("tags"))}>닫기</div>
            </Modal>
          )}
        </>
      ) : (
        <div className={ListStyle['tag-container']}>
          <TagList />
        </div>
      )}
    </>
  );
};

export default TagSelector;
