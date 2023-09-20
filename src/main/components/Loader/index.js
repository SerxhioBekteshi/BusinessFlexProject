import React from "react";
import "./style.css";
import CircularProgress from "@mui/material/CircularProgress";

const Loader = () => (
  <div className="fallback-spinner">
    <div className="loading">
      <CircularProgress color="secondary" />
    </div>
  </div>
);
export default Loader;
