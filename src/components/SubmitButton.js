import React from "react";
import Spinner from "./Spinner";
import "./SubmitButton.scss";

const SubmitButton = ({ children, loading }) => (
  <button className="submit-button" type="submit">
    {loading ? <Spinner /> : children}
  </button>
);

export default SubmitButton;
