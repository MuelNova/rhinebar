import React, { useEffect, useState } from 'react';
import { createProvider } from 'zebar';
import styles from './Hostname.module.scss';

const Provider = createProvider({type: 'host'});

const Hostname = () => {
    const [output, setOutput] = useState(Provider.output);

    useEffect(() => {
        Provider.onOutput(() => setOutput(Provider.output));
    }, []);

    return (
    <div className={styles.hostname}>
        <p>{output?.hostname || 'Unknown'}</p>
        <p>{output?.friendlyOsVersion || 'Unknown'}</p>
    </div>
    );
}


export default Hostname;