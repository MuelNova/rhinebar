import React, { useEffect, useState, useMemo } from "react";
import { createProvider } from "zebar";

import CircularProgress from "../common/CircularProgress";
import styles from "./CPU.module.scss";

const CpuProvider = createProvider({
  type: "cpu",
});

const RADIUS = 15;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

const CPU: React.FC = () => {
  const [output, setOutput] = useState(CpuProvider.output);

  useEffect(() => {
    CpuProvider.onOutput(() => setOutput(CpuProvider.output));
  }, []);

  const { usage, offset } = useMemo(() => {
    const usage = output?.usage ?? 0;
    const offset = CIRCUMFERENCE * (1 - usage / 100);
    return { usage, offset };
  }, [output]);

  return (
    <div className={styles.cpu}>
      <span className={styles.percentage}>{output?.usage.toFixed(0)}%</span>
      <CircularProgress percentage={usage}>
        <div className="nf nf-oct-cpu" />
      </CircularProgress>
    </div>
  );
};

export default CPU;
