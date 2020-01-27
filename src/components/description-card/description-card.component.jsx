import React from "react";
import "./description-card.styles.scss";

const DescriptionCard = ({ job }) => {
  const { title, description, company_logo, how_to_apply } = job.job;
  console.log("description card ran");
  console.log({ job });

  const descriptionTxt = () => {
    return { __html: description };
  };

  const howToApplyTxt = () => {
    return { __html: how_to_apply };
  };
  return (
    <div className="description-card">
      <div className="description-title">
        <h2 style={{ color: "white" }}>{title}</h2>
        <img src={company_logo} alt="company logo" />
      </div>

      <p dangerouslySetInnerHTML={descriptionTxt()}></p>
      <p dangerouslySetInnerHTML={howToApplyTxt()}></p>
    </div>
  );
};

export default DescriptionCard;
