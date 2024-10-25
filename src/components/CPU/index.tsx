import React from "react";
import { useProvider } from "../../hooks";

import CircularProgress from "../common/CircularProgress";
import styles from "./CPU.module.scss";

const CPU: React.FC = () => {
  const output = useProvider("cpu");

  return (
    <div className={styles.cpu}>
      <span className={styles.percentage}>{output?.usage.toFixed(0)}%</span>
      <CircularProgress percentage={output?.usage ?? 0}>
        <div className="nf nf-oct-cpu" />
      </CircularProgress>
    </div>
  );
};

export default CPU;
