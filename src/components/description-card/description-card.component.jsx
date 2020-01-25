import React from "react";
import './description-card.styles.scss';

const DescriptionCard = ({
  title,
  description,
  company_logo,
  how_to_apply
}) => {
  return (
    <div className="description-card">
      <div>
        <span>TITLE</span>
        <span>logo</span>
      </div>
     {/* <img src={logo} alt="company logo" /> */}

      <p>IPSUM Lorem, ipsum dolor sit amet consectetur adipisicing elit. Totam veniam quisquam ex obcaecati possimus perferendis quam esse doloribus, consequatur id unde vel placeat culpa voluptatum veritatis incidunt debitis facere exercitationem.</p>
      <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quis ducimus non doloribus eligendi veritatis! Suscipit, blanditiis dolorum quos animi voluptatum, ratione sit facere mollitia consequatur unde dicta at alias? Animi.</p>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas culpa officia eveniet ut eum cumque quam excepturi hic. Facilis odit ipsam doloremque debitis repellat repudiandae, culpa aperiam adipisci eveniet est?Lorem ipsum dolor sit, amet consectetur adipisicing elit. Neque consequatur earum, placeat dolores nam odio ipsam corporis quos itaque aliquam voluptates deserunt harum velit mollitia ducimus expedita numquam delectus rerum.</p>
    </div>
  );
}

export default DescriptionCard;
