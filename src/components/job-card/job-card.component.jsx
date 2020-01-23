import React from "react";
import "./job-card.styles.scss";

const JobCard = ({
  company_logo,
  title,
  type,
  url,
  company,
  location
}) => {

  return (
    <div className="job-card-container">
      <div
        className="job-card-logo"
        style={{ backgroundImage: `url(${company_logo})` }}
      />
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
