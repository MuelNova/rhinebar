import React from "react";

import { useProvider } from "../../hooks";
import CircularProgress from "../common/CircularProgress";
import styles from "./Media.module.scss";

const Media = () => {
  const provider = useProvider("media");
  const output = provider?.currentSession;

  if (output === null || output?.title === "") return null;

  const setPlaying = () => {
    provider?.togglePlayPause();
  };

  const percentage = ((output?.position ?? 0) / (output?.endTime ?? 1)) * 100;

  return (
    <div className={styles.media} onClick={() => setPlaying()}>
      <div className={styles.mediaControl}>
        <CircularProgress
          percentage={percentage}
          background={false}
          borderColor="var(--color-text-primary)"
          strokeWidth="0.17em"
        >
          <div
            className={`${styles.controlIcon} nf ${
              output?.isPlaying ? "nf-fa-pause" : `nf-fa-play ${styles.playing}`
            }`}
          ></div>
        </CircularProgress>
      </div>
      <div className={styles.mediaInfo}>
        <p>{`${output?.title} - ${output?.artist}`}</p>
      </div>
    </div>
  );
};

export default Media;
