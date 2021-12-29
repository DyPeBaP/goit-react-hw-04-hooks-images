import s from "./Button.module.css";
import React from "react";
import PropTypes from "prop-types";

function Button({ loadMoreHandler }) {
    return (
      <button
        type="button"
        className={s.Button}
        onClick={loadMoreHandler}
      >
        Load more
      </button>
    );
  }

Button.propType = {
  loadMoreHandler: PropTypes.func.isRequired,
};

export default Button;