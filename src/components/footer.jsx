import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareGithub } from '@fortawesome/free-brands-svg-icons';

const Footer = ({}) => {
  return (
    <footer>
      <nav className="nav-footer__link mt-2 flex justify-end text-white">
        <a
          href="https://github.com/phelied/weathy"
          target="_blank"
          rel="noreferrer"
        >
            me
          <FontAwesomeIcon icon={faSquareGithub} />
        </a>
      </nav>
    </footer>
  );
};

export default Footer;
