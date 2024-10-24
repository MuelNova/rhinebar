import React, { useEffect, useState } from "react";
import { createProvider } from "zebar";
import styles from "./Memory.module.scss";

const Provider = createProvider({ type: "memory" });

interface MemoryProps {
  showDetail?: boolean;
  unit?: "bytes" | "kb" | "mb" | "gb" | "tb";
  fixed?: number;
  showUnit?: boolean;
}

const Memory = ({
  showDetail = false,
  unit = "gb",
  fixed = 1,
  showUnit = false,
}: MemoryProps) => {
  const [output, setOutput] = useState(Provider.output);

  useEffect(() => Provider.onOutput(() => setOutput(Provider.output)));

  const Circle = () => {
    const radius: number = 15;
    const circumference: number = 2 * Math.PI * radius;
    const offset: number = output
      ? circumference * (1 - output.usage / 100)
      : 0;

    return (
      <svg className={styles.memoryCircle} viewBox="0 0 32 32">
        <circle
          cx="16"
          cy="16"
          r={radius}
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={offset}
        />
      </svg>
    );
  };

  const toReadableBytes = (bytes: number) => {
    let value: number;

    switch (unit) {
      case "kb":
        value = bytes / 1024;
        break;
      case "mb":
        value = bytes / 1024 / 1024;
        break;
      case "gb":
        value = bytes / 1024 / 1024 / 1024;
        break;
      case "tb":
        value = bytes / 1024 / 1024 / 1024 / 1024;
        break;
      default:
        value = bytes;
    }
    return value.toFixed(fixed) + (showUnit ? unit.toUpperCase() : "");
  };

  const toReadableUsage = (usage: number) => {
    return usage.toFixed(fixed) + "%";
  };

  return (
    <div className={styles.memory}>
      <span>
        {output
          ? showDetail
            ? toReadableBytes(output?.usedMemory!)
            : toReadableUsage(output?.usage!)
          : ""}
      </span>
      <div className={styles.memoryIconContainer}>
        <div className={`${styles.memoryIcon} nf nf-fa-memory`}></div>
        <Circle />
      </div>
    </div>
  );
};

export default Memory;
