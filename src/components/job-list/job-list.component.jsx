import React from "react";
import LazySpinner from '../lazySpinner/lazy-spinner.component';
import JobCard from '../job-card/job-card.component';
import PageinationBar from '../pageination-bar/pageination-bar.component';
import "./job-list.styles.scss";
import Footer from "../footer/footer.component";

const JobList = ({ page, nextPage, previousPage, jobs, isLoading, onClickDisplay }) => {
  return (
    <div className="job-list">
      <p className="subtitle">
        {jobs.jobData ? jobs.jobData.length : "0 "}
        {jobs.jobData.length === 50 ? "+" : null} jobs found.
      </p>
      <div>
        {isLoading ? (
          <LazySpinner />
        ) : (
          jobs.jobData.map(job => (
            <JobCard key={job.id} job={job} onClickDisplay={onClickDisplay} />
          ))
        )}
      </div>
      {!jobs.jobData.length ? null : jobs.jobData.length === 50 || page > 1 ? (
        <PageinationBar
          jobs={jobs}
          page={page}
          nextPage={nextPage}
          previousPage={previousPage}
        />
      ) : null}
      <Footer />
    </div>
  );
};

export default JobList;
