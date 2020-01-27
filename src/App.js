import React, { useState, lazy, Suspense, useEffect } from "react";
import JobCard from "./components/job-card/job-card.component";
import "./App.styles.scss";
import LazySpinner from "./components/lazySpinner/lazy-spinner.component";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";

const DescriptionCard = lazy(() =>
  import("./components/description-card/description-card.component")
);

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

  const classes = useStyles();

  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:3001/initialJobs", {
      method: "get",
      headers: { "Content-Type": "application/json" }
    })
      .then(res => res.json())
      .then(jobData => {
        setJobs({ jobData });
        setLoading(false);
      })
      .catch(err => console.log("error fetching jobs"));
  }, []);

  const onSubmit = event => {
    event.preventDefault();
    setLoading(true);
    fetch("http://localhost:3001/jobs", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        description: description,
        location: location
      })
    })
      .then(response => response.json())
      .then(jobData => {
        setJobs({ jobData });
        setLoading(false);
      })
      .catch(err => console.log(err));
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
        {jobs.jobData ? jobs.jobData.length : "0 "} jobs found.
      </p>
      {jobs.jobData ? (
        isLoading === true ? (
          <LazySpinner />
        ) : (
          jobs.jobData.map(job => (
            <JobCard key={job.id} job={job} onClickDisplay={onClickDisplay} />
          ))
        )
      ) : null}
      {isDisplayHidden ? (
        <Suspense fallback={LazySpinner}>
          <DescriptionCard
            job={currentJob}
            closeDescriptionCard={closeDescriptionCard}
          />
        </Suspense>
      ) : null}
    </div>
  );
};

export default App;
