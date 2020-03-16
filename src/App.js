import React, { useState } from "react";
import "./App.styles.scss";
import SearchBlob from "./components/search-blob/search-blob.component";
import JobSearchBody from "./components/job-search-body/job-search-body.component";
import SearchBar from "./components/search-bar/search-bar.component";

const App = () => {
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [jobs, setJobs] = useState({ jobData: [] });
  const [currentJob, setCurrentJob] = useState({});
  const [isDisplayHidden, toggleHidden] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [errorStatus, setErrorStatus] = useState(false);

  const nextPage = () => {
    if (jobs.jobData.length === 50) {
      setPage(page + 1);
      fetchData(page + 1);
    } else if (jobs.jobData.length === 0) {
      return null;
    } else if (jobs.jobData.length > 0 && jobs.jobData.length < 50) {
      return null;
    }
  };

  const previousPage = () => {
    if (page - 1 === 0) {
      return null;
    } else {
      setPage(page - 1);
      fetchData(page - 1);
    }
  };

  const fetchData = pageNumber => {
    setLoading(true);
    fetch("https://job-search-engine-api.herokuapp.com/jobs", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        description: description,
        location: location,
        page: pageNumber
      })
    })
      .then(response => response.json())
      .then(jobData => {
        if (jobData) {
          setJobs({ jobData });
          setLoading(false);
        } else {
          return null;
        }
      })
      .catch(err => console.log(err));
  };

  const onSubmit = event => {
    event.preventDefault();
    if (location === "") {
      return setErrorStatus(true);
    } else {
      fetchData();
      setPage(1);
      setErrorStatus(false);
    }
  };

  const closeDescriptionCard = () => {
    toggleHidden(false);
  };

  const onClickDisplay = ({ job }) => {
    setCurrentJob({ job });
    toggleHidden(true);
  };

  return (
    <div className="App">
      <SearchBar
        onSubmit={onSubmit}
        setDescription={setDescription}
        setLocation={setLocation}
        errorStatus={errorStatus}
        description={description}
        location={location}
      />
      {jobs.jobData.length === 0 ? (
        <SearchBlob />
      ) : (
        <JobSearchBody
          isLoading={isLoading}
          onClickDisplay={onClickDisplay}
          jobs={jobs}
          currentJob={currentJob}
          closeDescriptionCard={closeDescriptionCard}
          isDisplayHidden={isDisplayHidden}
          page={page}
          nextPage={nextPage}
          previousPage={previousPage}
        />
      )}
    </div>
  );
};

export default App;
