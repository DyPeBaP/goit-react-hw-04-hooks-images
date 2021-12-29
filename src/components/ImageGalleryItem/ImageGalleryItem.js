import s from "./ImageGalleryItem.module.css";
import React from "react";
import PropTypes from "prop-types";

const ImageGalleryItem = ({ webformatURL, showImageHandle }) => {
      return (
      <li className={s.ImageGalleryItem}>
        <img
          src={webformatURL}
          alt=""
          className={s.ImageGalleryItemImage}
          onClick={showImageHandle}
        />
      </li>
    );
  };

ImageGalleryItem.propType = {
  webformatURL: PropTypes.string.isRequired,
  showImageHandle: PropTypes.func.isRequired,
};

export default ImageGalleryItem;