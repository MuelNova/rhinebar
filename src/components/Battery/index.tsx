import React, { useEffect, useState } from "react";
import { createProvider } from "zebar";
import styles from "./Battery.module.scss";

const Provider = createProvider({type: 'battery'});

const Battery = () => {
    const [output, setOutput] = useState(Provider.output);

    useEffect(() => Provider.onOutput(() => setOutput(Provider.output)));

    const getComponent = () => {
        console.log(output);
        switch(output?.state) {
            case 'charging':
                return <div className={`${styles.battery} nf nf-md-lightning_bolt`}></div>
            case 'discharging':
                return (
                <div className={`${styles.battery}`}>
                    <div className={`nf nf-md-battery_${output.chargePercent - output.chargePercent % 10}`}></div>
                    <p className={styles.battery__percentage}>{output.chargePercent.toFixed(0)}%</p>
                </div>
                );
            case 'full':
                return <div className={`${styles.battery} nf nf-md-battery_charging_100`}></div>
        }
        return <></>
    }

    return getComponent();
}

export default Battery;