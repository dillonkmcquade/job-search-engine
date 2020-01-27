import React from "react";
import "./description-card.styles.scss";
import LocationOnIcon from "@material-ui/icons/LocationOn";

const DescriptionCard = ({ job, closeDescriptionCard }) => {
  const { title, description, company_logo, how_to_apply, location } = job.job;

  const descriptionTxt = () => {
    return { __html: description };
  };

  const howToApplyTxt = () => {
    return { __html: how_to_apply };
  };
  return (
    <div className="description-card">
      <p
        style={{ cursor: "pointer", position: "absolute", top: "-5px" }}
        onClick={() => closeDescriptionCard()}
      >
        &#10005;
      </p>
      <div className="description-title">
        <div>
          <h2 style={{ color: "white" }}>{title}</h2>
          <p>
            <LocationOnIcon fontSize="small" />
            {location}
          </p>
        </div>
        <img
          src={
            company_logo
              ? company_logo
              : "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.injdu104Gzp4yDHCLG62OgHaHa%26pid%3DApi&f=1"
          }
          alt="company logo"
        />
      </div>
      <div className="description-txt">
        <p dangerouslySetInnerHTML={descriptionTxt()}></p>
        <p dangerouslySetInnerHTML={howToApplyTxt()}></p>
      </div>
    </div>
  );
};

export default DescriptionCard;
