import React, { useEffect, useState } from 'react';
import { createProviderGroup } from 'zebar';
import styles from './Hostname.module.scss';

const Providers = createProviderGroup({
    host: {type: 'host'},
    glazewm: {type: 'glazewm'},
});

const Hostname = () => {
    const [outputMap, setOutputMap] = useState(Providers.outputMap);

    useEffect(() => {
        Providers.onOutput(() => setOutputMap(Providers.outputMap));
    }, []);

    const getWorkspaceOrProcess = () => {
        const focusedWorkspace = outputMap.glazewm?.focusedWorkspace;
        const focusedContainer = outputMap.glazewm?.focusedContainer;
        if (focusedContainer && focusedContainer.type === 'window' && focusedContainer.hasFocus) {
            return focusedContainer.title === '' ? '~' : focusedContainer.title;
        } else if (focusedWorkspace) {
            return 'Workspace ' + focusedWorkspace.name;
        }
        return '~';
    }

    return (
    <div className={styles.hostname}>
        <p>{outputMap.host?.hostname || 'Unknown'}</p>
        <p>{getWorkspaceOrProcess()}</p>
    </div>
    );
}


export default Hostname;