import React, { useEffect, useState } from "react";
import { createProvider } from "zebar";
import styles from "./CPU.module.scss";

const CpuProvider = createProvider({
  type: "cpu",
});

const CPU: React.FC = () => {
  const [output, setOutput] = useState(CpuProvider.output);

  useEffect(() => {
    CpuProvider.onOutput(() => setOutput(CpuProvider.output));
  }, []);

  const radius: number = 15;
  const circumference: number = 2 * Math.PI * radius;
  const offset: number = output ? circumference * (1 - output.usage / 100) : 0;

  return (
    <div className={styles.cpu}>
      <span className={styles.percentage}>{output?.usage.toFixed(0)}%</span>
      <div className={styles.iconContainer}>
        <div className={styles.cpuIcon + " nf nf-oct-cpu"} />

        <svg className={styles.cpuCircle} viewBox="0 0 32 32">
          <circle
            cx="16"
            cy="16"
            r={radius}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
          />
        </svg>
      </div>
    </div>
  );
};

export default CPU;
