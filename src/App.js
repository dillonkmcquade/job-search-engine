import React, { useState, lazy, Suspense } from "react";
import JobCard from "./components/job-card/job-card.component";
import "./App.styles.scss";
import LazySpinner from "./components/lazySpinner/lazy-spinner.component";

const DescriptionCard = lazy(() =>
  import("./components/description-card/description-card.component")
);

const App = () => {
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [jobs, setJobs] = useState({ jobData: [] });
  const [currentJob, setCurrentJob] = useState({});
  const [isDisplayHidden, toggleHidden] = useState(false);
  const [isLoading, setLoading] = useState(false);

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

  const onClickDisplay = ({ job }) => {
    setCurrentJob({ job });
    toggleHidden(true);
  };

  return (
    <div className="App">
      <form className="search-bar">
        <input
          className="description"
          type="text"
          value={description}
          placeholder="Search by job description"
          onChange={event => setDescription(event.target.value)}
          required
        />
        <input
          className="description"
          type="text"
          value={location}
          placeholder="Search by location"
          onChange={event => setLocation(event.target.value)}
          required
        />
        <input
          className="submit-btn"
          type="submit"
          value="Submit"
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
          <DescriptionCard job={currentJob} />
        </Suspense>
      ) : null}
    </div>
  );
};

export default App;
