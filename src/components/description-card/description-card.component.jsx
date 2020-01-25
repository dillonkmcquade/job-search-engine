import React from "react";

const DescriptionCard = ({
  title,
  logo,
  description,
  company_logo,
  how_to_apply
}) => {
  return (
    <div className="description-card">
      <div>
        <span>{title}</span>
        <span>{company_logo}</span>
      </div>
      <img src={logo} alt="company logo" />

      <p>{description}</p>
      <p>{how_to_apply}</p>
    </div>
  );
}

export default DescriptionCard;
