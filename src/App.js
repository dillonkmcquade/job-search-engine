import React, { useState } from "react";
import JobCard from "./components/job-card/job-card.component";

import "./App.styles.scss";

const App = () => {
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [jobs, setJobs] = useState({jobData: []});

  const onSubmit = event => {
    console.log(jobs);
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
        console.log(jobData)
      })
      .catch(err => console.log(err));
    console.log(jobs);
  };
  return (
    <div className="App">
      <form className='search-bar'>
        <input
          className='description'
          type="text"
          value={description}
          placeholder='Search by job description'
          onChange={event => setDescription(event.target.value)}
          required
        />
        <input
          className='description'
          type="text"
          value={location}
          placeholder='Search by location'
          onChange={event => setLocation(event.target.value)}
          required
        />
        <input className='submit-btn'type="submit" value="Submit" onClick={onSubmit} />
      </form>
      {jobs.jobData ? (
        jobs.jobData.map(({ id, ...otherProps }) => (
          <JobCard key={id} {...otherProps} />
        ))
      ) : (
        <div>No Results</div>
      )}
    </div>
  );
};

export default App;
