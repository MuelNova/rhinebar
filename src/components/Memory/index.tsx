import React, { useEffect, useState } from "react";
import { createProvider } from "zebar";
import CircularProgress from "../common/CircularProgress";
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
      <span className={styles.percentage}>
        {output
          ? showDetail
            ? toReadableBytes(output?.usedMemory!)
            : toReadableUsage(output?.usage!)
          : ""}
      </span>
      <CircularProgress percentage={output?.usage ?? 0}>
        <div className="nf nf-fa-memory" />
      </CircularProgress>
    </div>
  );
};

export default Memory;
