import React from "react";
import './pageination-bar.styles.scss';

const PageinationBar = ({page, nextPage, previousPage}) => {
  return (
    <div className="pagination">
      <span className="pageination-btn" onClick={() => previousPage()}>
        &#10092; Previous
      </span>
      <span className="current-page">Page {page}</span>
      <span className="pageination-btn" onClick={() => nextPage()}>
        Next &#10093;
      </span>
    </div>
  );
};

export default PageinationBar;
