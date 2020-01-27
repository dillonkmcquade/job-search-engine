import React from "react";
import "./job-card.styles.scss";

const JobCard = ({ job, onClickDisplay }) => {
  const { company_logo, title, type, url, company, location } = job;
  return (
    <div className="job-card-container" onClick={() => onClickDisplay({ job })}>
      <div className="job-card-logo">
        <img
          src={
            company_logo
              ? company_logo
              : "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.injdu104Gzp4yDHCLG62OgHaHa%26pid%3DApi&f=1"
          }
          alt="company logo"
        />{" "}
      </div>
      <div className="job-card-info">
        <a href={url}>{title}</a>
        <span>{company}</span>
        <span>{location}</span>
        <span>{type}</span>
      </div>
    </div>
  );
};

export default JobCard;
