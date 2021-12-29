import s from "./ImageGallery.module.css";
import React from "react";
import propTypes from 'prop-types';
import shortid from "shortid";
import ImageGalleryItem from "../ImageGalleryItem/ImageGalleryItem";

const ImageGallery = ({ images, showImageHandler }) => {
      return (
      <ul className={s.ImageGallery}>
        {images.map(({ id, webformatURL, largeImageURL }, index) => {
          return (
            <ImageGalleryItem
              key={shortid.generate()}
              webformatURL={webformatURL}
              showImageHandle={showImageHandler(largeImageURL)}
              index={index}
            />
          );
        })}
      </ul>
    );
}

ImageGallery.propTypes = {
  images: propTypes.array,
  showImageHandler: propTypes.func,
};

export default ImageGallery;