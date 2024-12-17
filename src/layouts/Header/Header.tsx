import styles from "./header.module.css";
import React from "react";

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>C++ Syntax Analyzer</div>
      <nav>
        <ul className={styles["nav-links"]}>
          <li>
            <a href="#features">Features</a>
          </li>
          <li>
            <a href="#how-it-works">How it Works</a>
          </li>
          <li>
            <a href="#about">About</a>
          </li>
        </ul>
      </nav>
      <a href="#upload" className={styles["cta-button"]}>
        Analyze File
      </a>
    </header>
  );
};

export default Header;
