import React, { useEffect, useState } from "react";
import { useProvider } from "../../hooks";
import styles from "./Media.module.scss";

const Media = () => {
  const output = useProvider("glazewm");
  const [mediaTitle, setMediaTitle] = useState("");

  const getMediaInfo = () => {
    for (const workspace of output?.allWorkspaces || []) {
      for (const window of workspace.children) {
        if (window.type === "window" && window.processName === "Spotify") {
          return window.title === "Spotify Premium" ? "" : window.title;
        }
      }
    }
    return "";
  };

  useEffect(() => {
    setMediaTitle(getMediaInfo());
  }, [output]);

  return (
    mediaTitle !== "" && (
      <div className={styles.media}>
        <div className={styles.mediaControl + " nf nf-oct-play"}></div>
        <div className={styles.mediaInfo}>
          <p>{mediaTitle}</p>
        </div>
      </div>
    )
  );
};

export default Media;
