import React, { useState } from "react";
import JobCard from "./components/job-card/job-card.component";
import "./App.styles.scss";
import LazySpinner from "./components/lazySpinner/lazy-spinner.component";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import DescriptionCard from "./components/description-card/description-card.component";
import ErrorBoundary from "./components/ErrorBoundary";
import PageinationBar from "./components/pageination-bar/pageination-bar.component";
import SearchBlob from "./components/search-blob/search-blob.component";

const useStyles = makeStyles(theme => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: 200
    }
  }
}));

const App = () => {
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [jobs, setJobs] = useState({ jobData: [] });
  const [currentJob, setCurrentJob] = useState({});
  const [isDisplayHidden, toggleHidden] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  const classes = useStyles();

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
    setLoading(true);
    fetchData();
    setPage(1);
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
      <form
        className={`${classes.root} search-bar`}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="outlined-basic"
          label="Job Description"
          variant="outlined"
          value={description}
          onChange={event => setDescription(event.target.value)}
        />
        <TextField
          id="outlined-basic"
          label="Location"
          variant="outlined"
          value={location}
          onChange={event => setLocation(event.target.value)}
        />
        <input
          className="submit-btn"
          type="submit"
          value="Find Jobs"
          onClick={onSubmit}
        />
      </form>
      <p style={{ padding: "10px" }}>
        {jobs.jobData ? jobs.jobData.length : "0 "}
        {jobs.jobData.length === 50 ? "+" : null} jobs found.
      </p>
      <ErrorBoundary>
        {!jobs.jobData.length ? (
          <SearchBlob />
        ) : isLoading ? (
          <LazySpinner />
        ) : (
          jobs.jobData.map(job => (
            <JobCard key={job.id} job={job} onClickDisplay={onClickDisplay} />
          ))
        )}
      </ErrorBoundary>

      {isDisplayHidden ? (
        <DescriptionCard
          job={currentJob}
          closeDescriptionCard={closeDescriptionCard}
        />
      ) : null}
      <PageinationBar
        page={page}
        nextPage={nextPage}
        previousPage={previousPage}
      />
    </div>
  );
};

export default App;
