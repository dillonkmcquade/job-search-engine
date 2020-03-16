import React from "react";
import SearchBlob from '../search-blob/search-blob.component';
import LazySpinner from '../lazySpinner/lazy-spinner.component';
import JobCard from '../job-card/job-card.component';
import "./job-list.styles.scss";

const JobList = ({ jobs, isLoading, onClickDisplay }) => {
  return (
    <div className="job-list">
      <p className="subtitle">
        {jobs.jobData ? jobs.jobData.length : "0 "}
        {jobs.jobData.length === 50 ? "+" : null} jobs found.
      </p>
      <div>
        {!isLoading && jobs.jobData.length === 0 ? (
          <SearchBlob />
        ) : isLoading ? (
          <LazySpinner />
        ) : (
          jobs.jobData.map(job => (
            <JobCard key={job.id} job={job} onClickDisplay={onClickDisplay} />
          ))
        )}
      </div>
    </div>
  );
};

export default JobList;
