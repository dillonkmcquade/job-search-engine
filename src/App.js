import React, { useState } from "react";
import JobCard from "./components/job-card/job-card.component";
import "./App.styles.scss";
import DescriptionCard from "./components/description-card/description-card.component";

const App = () => {
  
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [jobs, setJobs] = useState({ jobData: [] });
  const [currentJob, setCurrentJob] = useState({});
  const [isDisplayHidden, toggleHidden] = useState(true);


  const onSubmit = event => {
    event.preventDefault();
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
      })
      .catch(err => console.log(err));
  };

  const onClickDisplay = ({ job }) => {
    console.log("i just ran");
    setCurrentJob({ job });
    isDisplayHidden === true ? toggleHidden(false) : toggleHidden(true);
    console.log(currentJob);
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
        jobs.jobData.map(job => (
          <JobCard
            key={job.id}
            job={job}
            onClick={() => onClickDisplay({ job })}
          />
        ))
      ) : (
        <div>No Results</div>
      )}
      {isDisplayHidden ? <DescriptionCard job={currentJob} /> : null}
    </div>
  );
};

export default App;
