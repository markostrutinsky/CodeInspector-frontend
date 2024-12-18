import React from "react";
import styles from "./header.module.css";

interface HeaderProps {
  onAnalyzeFile: () => void;
}

const Header: React.FC<HeaderProps> = ({ onAnalyzeFile }) => {
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
      <button onClick={onAnalyzeFile} className={styles["cta-button"]}>
        Analyze File
      </button>
    </header>
  );
};

export default Header;
