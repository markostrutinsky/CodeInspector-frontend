import styles from "./footer.module.css";
import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles["footer-left"]}>
        <a href="#features">Features</a>
        <a href="#how-it-works">How it Works</a>
        <a href="#about">About</a>
      </div>
      <div className={styles["footer-right"]}>
        <a
          href="https://github.com/yourproject"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>
        <a href="#contact">Contact</a>
      </div>
      <div className={styles.copyright}>
        &copy; 2024 C++ Syntax Analyzer. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
