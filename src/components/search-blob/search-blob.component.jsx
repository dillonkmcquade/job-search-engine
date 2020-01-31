import React from "react";
import "./search-blob.styles.scss";
import { ReactComponent as SearchBlobSVG } from "../../assets/search-blob.svg";

const SearchBlob = () => {
  return (
    <div className="search-blob">
      <SearchBlobSVG className="svg" />
      <span>Search by job description or location ...</span>
    </div>
  );
};

export default SearchBlob;
