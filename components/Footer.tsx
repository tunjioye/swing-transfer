import React from "react";
import { FaEnvelope, FaGithub } from "react-icons/fa";
import { publicRuntimeConfig } from "@/config";

function Footer() {
  return (
    <footer className="container">
      <nav>
        <ul>
          <li>&copy; 2023 {publicRuntimeConfig.APP_NAME}</li>
        </ul>
        <ul>
          <li>
            <a href="https://github.com/tunjioye/swing-transfer" target="_blank" rel="noreferrer">
              <FaGithub />
            </a>
          </li>
          <li>
            <a href="mailto:oyenirantunji2339@gmail.com" target="_blank" rel="noreferrer">
              <FaEnvelope />
            </a>
          </li>
        </ul>
      </nav>
    </footer>
  );
}

export default Footer;
