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
import RoomIcon from "@material-ui/icons/Room";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles(theme => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: 200,
      backgroundColor: "#96A1D3",
      color: "white"
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
  const [errorStatus, setErrorStatus] = useState(false);

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
    if (location === "") {
      return setErrorStatus(true);
    } else {
      setLoading(true);
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
      <form
        className={`${classes.root} search-bar`}
        noValidate
        autoComplete="off"
      >
        <TextField
          className={classes.margin}
          id="outlined-basic"
          label="Job Description"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            )
          }}
          variant="filled"
          size="small"
          value={description}
          onChange={event => setDescription(event.target.value)}
        />
        <TextField
          required
          id="input-with-icon-textfield"
          label="Location"
          variant="filled"
          size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <RoomIcon />
              </InputAdornment>
            )
          }}
          error={errorStatus}
          helperText={errorStatus ? "Field required" : null}
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
      <p className="subtitle" style={{ padding: "10px" }}>
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
      {!jobs.jobData.length ? null : jobs.jobData.length === 50 || page > 1 ? (
        <PageinationBar
          jobs={jobs}
          page={page}
          nextPage={nextPage}
          previousPage={previousPage}
        />
      ) : null}
    </div>
  );
};

export default App;
