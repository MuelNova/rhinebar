import React from "react";
import styles from "./CircularProgress.module.scss";

interface CircularProgressProps {
  percentage: number;
  radius?: number;
  children?: React.ReactNode;
}

const CircularProgress: React.FC<CircularProgressProps> = ({
  percentage,
  radius = 15,
  children,
}) => {
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - percentage / 100);

  return (
    <div className={styles.circularProgress}>
      {children}
      <svg className={styles.circle} viewBox="0 0 32 32">
        <circle
          cx={radius + 1}
          cy={radius + 1}
          r={radius}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </svg>
    </div>
  );
};

export default CircularProgress;
