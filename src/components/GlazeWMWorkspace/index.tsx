import React, { useEffect, useState, useRef } from 'react';
import { createProvider } from 'zebar';

import styles from './GlazeWMWorkspace.module.scss';

const GlazeWMProvider = createProvider({type: 'glazewm'});

const GlazeWMWorkspace = () => {
    const [output, setOutput] = useState(GlazeWMProvider.output);
    const focusIndicatorRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        GlazeWMProvider.onOutput(() => setOutput(GlazeWMProvider.output));
    }, []);

    useEffect(() => {
        const focusedWorkspace = output?.focusedWorkspace;
        if (focusedWorkspace && focusIndicatorRef.current) {
            const focusedElement = document.getElementById(`workspace-${focusedWorkspace.name}`);
            const frameElement = document.querySelector(`.${styles.workspaceFrame}`);
            if (focusedElement && frameElement) {
                const frameRect = frameElement.getBoundingClientRect();
                const rect = focusedElement.getBoundingClientRect();
                
                focusIndicatorRef.current.style.left = `${rect.left - frameRect.left}px`;
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
            <div ref={focusIndicatorRef} className={styles.focusIndicator}></div>
        </div>
    );
};

export default GlazeWMWorkspace;