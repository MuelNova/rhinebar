import React from "react";
import { useProvider } from "../../hooks";
import styles from "./Hostname.module.scss";

const Hostname = () => {
  const outputMap = {
    host: useProvider("host"),
    glazewm: useProvider("glazewm"),
  };

  const getWorkspaceOrProcess = () => {
    const focusedWorkspace = outputMap.glazewm?.focusedWorkspace;
    const focusedContainer = outputMap.glazewm?.focusedContainer;
    if (
      focusedContainer &&
      focusedContainer.type === "window" &&
      focusedContainer.hasFocus
    ) {
      return focusedContainer.title === "" ? "~" : focusedContainer.title;
    } else if (focusedWorkspace) {
      return "Workspace " + focusedWorkspace.name;
    }
    return "~";
  };

  return (
    <div className={styles.hostname}>
      <p>{outputMap.host?.hostname || "Unknown"}</p>
      <p>{getWorkspaceOrProcess()}</p>
    </div>
  );
};

export default Hostname;
