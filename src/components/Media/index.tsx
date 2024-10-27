import React, { useEffect, useState, useCallback } from "react";
import { useProvider } from "../../hooks";
import styles from "./Media.module.scss";

const Media = () => {
  const output = useProvider("glazewm");
  const [mediaTitle, setMediaTitle] = useState("");

  const getMediaInfo = useCallback(() => {
    for (const workspace of output?.allWorkspaces || []) {
      for (const window of workspace.children) {
        if (window.type === "window" && window.processName === "Spotify") {
          return window.title === "Spotify Premium" ? "" : window.title;
        }
      }
    }
    return "";
  }, [output]);

  useEffect(() => {
    setMediaTitle(getMediaInfo());
  }, [getMediaInfo]);

  if (mediaTitle === "") return null;

  return (
    <div className={styles.media}>
      <div className={styles.mediaControl + " nf nf-oct-play"}></div>
      <div className={styles.mediaInfo}>
        <p>{mediaTitle}</p>
      </div>
    </div>
  );
};

export default Media;
