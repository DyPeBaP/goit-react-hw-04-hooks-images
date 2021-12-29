import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Searchbar from "./components/Searchbar/Searchbar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import Button from "./components/Button/Button";
import Modal from "./components/Modal/Modal";
import Loader from "./components/Loader/Loader";

import fetchImages from "./service/Api";

export default function App() {
  const [images, setImages] = useState([]);
  const [searchImage, setSearchImage] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [error, setError] = useState("");

  const [largeImgURL, setLargeImgURL] = useState("");
  const [maxPages, setMaxPages] = useState(null);

  useEffect(() => {
    if (!searchImage) return;

    const searchImagesHandler = async () => {
      try {
        setIsLoading(true);
        const { hits, totalHits } = await fetchImages(searchImage, page);
        if (!hits.length) {
          toast.info(`Nothing found for ${searchImage}!`, {
            position: "top-right",
            autoClose: 3000,
            theme: "dark",
          });
        }
        setImages((images) => [...images, ...hits]);
        setMaxPages(totalHits);
      } catch (error) {
        console.error(error);
        setError(() => error.toString());
      } finally {
        setIsLoading(false);
      }
    };

    searchImagesHandler();
  }, [page, searchImage]);

  useEffect(() => {
    if (images.length > 12) {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [images.length]);

  const showImageHandler = (imageUrl) => () => {
    setLargeImgURL(imageUrl);
    setOpenModal(true);
  };

  const scrollToHandler = () => {
    const top = document.documentElement.scrollHeight - 150;

    setTimeout(() => {
      window.scrollTo({
        top,
        behavior: "smooth",
      });
    }, 500);
  };

  const loadMoreHandler = () => {
    setPage((page) => page + 1);
    scrollToHandler();
  };

  const onSubmitHandler = (searchString) => {
    setSearchImage(searchString);
    setImages([]);
    setPage(1);
  };

  const closeModal = () => {
    setOpenModal(!openModal);
  };

  return (
    <div>
      <ToastContainer autoClose={3000} />
      <Searchbar onSubmit={onSubmitHandler} />

      {error ? (
        <p>{error}</p>
      ) : (
        <ImageGallery
          images={images}
          showImageHandler={showImageHandler}
          scrollToHandler={scrollToHandler}
        />
      )}
      {openModal && (
        <Modal largeImgURL={largeImgURL} onClose={closeModal}></Modal>
      )}
      {isLoading && <Loader />}
      {page < maxPages && <Button loadMoreHandler={loadMoreHandler} />}
    </div>
  );
}
