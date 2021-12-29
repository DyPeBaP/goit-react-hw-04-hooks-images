import s from "./Modal.module.css";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";
import { useEffect } from "react";

const modalRoot = document.querySelector("#modal-root");

export default function Modal({ onClose, largeImgURL }) {
  useEffect(() => {
    const keyDownHandler = (e) => {
      if (e.code === "Escape") {
        onClose();
        return;
      }
    };
    window.addEventListener("keydown", keyDownHandler);
    return () => {
      window.removeEventListener("keydown", keyDownHandler);
    };
  }, [onClose]);

  const clickOverlay = (e) => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  return createPortal(
    <div className={s.Overlay} onClick={clickOverlay}>
      <div className={s.Modal}>
        <img src={largeImgURL} alt="" />
      </div>
    </div>,
    modalRoot
  );
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  largeImgURL: PropTypes.string.isRequired,
};
