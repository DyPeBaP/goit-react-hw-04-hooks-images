import s from "./Searchbar.module.css";
import { toast } from "react-toastify";
import PropTypes from 'prop-types';
import { useState } from "react";

function Searchbar({ onSubmit }) {
  const [value, setValue] = useState("");

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (value.trim() === "") {
      toast.error("Please enter your search term!", {
        position: "top-right",
        autoClose: 3000,
        theme: "dark",
      });
      return;
    }
    onSubmit(value);
    setValue("");
  };

  return (
    <header className={s.Searchbar}>
      <form onSubmit={handleSubmit}>
        <button type="submit" className={s.SearchButton}>
          Search
        </button>
        <input
          className={s.SearchForm}
          type="text"
          autoComplete="off"
          placeholder="Search images and photos"
          onChange={handleChange}
          value={value}
        />
      </form>
    </header>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;