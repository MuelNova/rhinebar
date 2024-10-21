import React, { useEffect, useState } from 'react';
import { createProvider } from 'zebar';
import styles from './Media.module.scss';

const Provider = createProvider({type: 'glazewm'});

const Media = () => {
    const [output, setOutput] = useState(Provider.output);
    const [mediaTitle, setMediaTitle] = useState('');

    useEffect(() => {
        Provider.onOutput(() => {
            setOutput(Provider.output);
        });
    }, []);

    
    const getMediaInfo = () => {
        for (const workspace of output?.allWorkspaces || []) {
            for (const window of workspace.children) {
                if (window.type === 'window' && window.processName === 'Spotify') {
                    return window.title === 'Spotify Premium' ? '' : window.title;
                }
            }
        }
        return '';
    }

    useEffect(() => {
        setMediaTitle(getMediaInfo());
    }, [output]);

    return (
        mediaTitle !== '' && (
        <div className={styles.media}>
            <div className={styles.mediaControl + ' nf nf-oct-play'}></div>
            <div className={styles.mediaInfo}>
                <p>{mediaTitle}</p>
            </div>
        </div>
        )
    );

};

export default Media;
