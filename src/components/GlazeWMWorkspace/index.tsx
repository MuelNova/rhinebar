import React, { useEffect, useRef } from "react";
import { useProvider } from "../../hooks";
import styles from "./GlazeWMWorkspace.module.scss";

const GlazeWMWorkspace = () => {
  const output = useProvider("glazewm");
  const focusIndicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const focusedWorkspace = output?.focusedWorkspace;
    if (focusedWorkspace && focusIndicatorRef.current) {
      const focusedElement = document.getElementById(
        `workspace-${focusedWorkspace.name}`
      );
      const frameElement = document.querySelector(`.${styles.workspaceFrame}`);
      if (focusedElement && frameElement) {
        const frameRect = frameElement.getBoundingClientRect();
        const rect = focusedElement.getBoundingClientRect();

        focusIndicatorRef.current.style.left = `${
          rect.left - frameRect.left
        }px`;
        focusIndicatorRef.current.style.top = `${rect.top - frameRect.top}px`;
        focusIndicatorRef.current.style.width = `${rect.width}px`;
        focusIndicatorRef.current.style.height = `${rect.height}px`;
      }
    }
  }, [output]);

  return (
    <div className={styles.workspaceFrame}>
      {output?.allWorkspaces.map((workspace) => (
        <div
          id={`workspace-${workspace.name}`}
          key={workspace.name}
          className={styles.workspace}
          onClick={() => {
            output?.runCommand(`focus --workspace ${workspace.name}`);
          }}
        >
          <p>{workspace.name}</p>
        </div>
      ))}
      <div
        className={
          styles.tilingDirection +
          " nf " +
          (output?.tilingDirection === "vertical"
            ? "nf-md-swap_vertical"
            : "nf-md-swap_horizontal")
        }
        onClick={() => {
          output?.runCommand("toggle-tiling-direction");
        }}
      />
      <div ref={focusIndicatorRef} className={styles.focusIndicator}></div>
    </div>
  );
};

export default GlazeWMWorkspace;
