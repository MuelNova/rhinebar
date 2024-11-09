import React from "react";
import { useProvider } from "../../hooks";
import styles from "./Battery.module.scss";

const Battery = () => {
  const output = useProvider("battery");

  const getComponent = () => {
    switch (output?.state) {
      case "charging":
        return (
          <div className={`${styles.battery} nf nf-md-lightning_bolt`}></div>
        );
      case "discharging":
        return (
          <div className={`${styles.battery}`}>
            <div
              className={`nf nf-md-battery_${
                output.chargePercent < 10 ? 10 :
                output.chargePercent - (output.chargePercent % 10)
              }`}
            ></div>
            <p className={styles.battery__percentage}>
              {output.chargePercent.toFixed(0)}%
            </p>
          </div>
        );
      case "full":
        return (
          <div className={`${styles.battery} nf nf-md-lightning_bolt`}></div>
        );
    }
    return <></>;
  };

  return getComponent();
};

export default Battery;
