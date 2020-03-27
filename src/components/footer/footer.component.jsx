import React from "react";
import "./footer.styles.scss";

const Footer = () => {
  return (
    <footer className="footer-container">
      <span>
        © 2020 Job Search Engine |{" "}
        <a
          className="link-container"
          href="https://www.dmcquade.dev"
        >
          Site by Dillon McQuade
        </a>
      </span>
    </footer>
  );
};

export default Footer;
