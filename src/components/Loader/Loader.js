import s from "./Loader.module.css";
import Spinner from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

const Loader = () => {
  return (
    <div className={s.Loader}>
      <Spinner type="Circles" color="#00BFFF" height={80} width={80} />
    </div>
  );
};

export default Loader;