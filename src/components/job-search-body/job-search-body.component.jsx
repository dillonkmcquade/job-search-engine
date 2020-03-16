import React from "react";
import DescriptionCard from "../description-card/description-card.component";
import JobList from "../job-list/job-list.component";
import "./job-search-body.styles.scss";

const JobSearchBody = ({
  jobs,
  page,
  nextPage,
  previousPage,
  isLoading,
  onClickDisplay,
  isDisplayHidden,
  currentJob,
  closeDescriptionCard
}) => {
  return (
    <div className="job-search-body-container">
      <JobList
        isLoading={isLoading}
        onClickDisplay={onClickDisplay}
        jobs={jobs}
        page={page}
        nextPage={nextPage}
        previousPage={previousPage}
      />
      {isDisplayHidden ? (
        <DescriptionCard
          job={currentJob}
          closeDescriptionCard={closeDescriptionCard}
        />
      ) : null}
    </div>
  );
};

export default JobSearchBody;
