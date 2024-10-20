import React, { useEffect, useState } from 'react';
import { createProvider } from 'zebar';
import styles from './CPU.module.scss';

const CpuProvider = createProvider({
    type: 'cpu',
});

const CPU: React.FC = () => {
    const [output, setOutput] = useState(CpuProvider.output);

    useEffect(() => {
        CpuProvider.onOutput(() => setOutput(CpuProvider.output));
    }, []);

    const radius: number = 15;
    const circumference: number = 2 * Math.PI * radius;
    const offset: number = output ? (circumference * (1 - output.usage / 100)) : 0;

    return (
        <div className={styles.cpu}>
            <span className={styles.percentage}>{output?.usage.toFixed(0)}%</span>
            <div className={styles.iconContainer}>
                <svg className={styles.cpuIcon} viewBox="0 0 24 24">
                    <path d="M8 2C6.89543 2 6 2.89543 6 4V6H4C2.89543 6 2 6.89543 2 8V16C2 17.1046 2.89543 18 4 18H6V20C6 21.1046 6.89543 22 8 22H16C17.1046 22 18 21.1046 18 20V18H20C21.1046 18 22 17.1046 22 16V8C22 6.89543 21.1046 6 20 6H18V4C18 2.89543 17.1046 2 16 2H8ZM16 4H8V6H16V4ZM16 18H8V20H16V18ZM4 16V8H6V16H4ZM18 8H20V16H18V8ZM8 8C8 7.44772 8.44772 7 9 7H15C15.5523 7 16 7.44772 16 8V16C16 16.5523 15.5523 17 15 17H9C8.44772 17 8 16.5523 8 16V8Z" />
                </svg>
                <svg className={styles.cpuCircle} viewBox="0 0 32 32">
                    <circle
                        cx="16"
                        cy="16"
                        r={radius}
                        strokeDasharray={circumference}
                        strokeDashoffset={offset}
                    />
                </svg>
            </div>
        </div>
    )
}

export default CPU;