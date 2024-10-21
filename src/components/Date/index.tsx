import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { createProvider, DateOutput } from 'zebar';
import styles from './Date.module.scss';

const Provider = createProvider({type: 'date'});

interface DateProps {
    showTime?: boolean;
    showSeconds?: boolean;
    showDate?: boolean;
    dateFormat?: string;
    use12Hours?: boolean;
}

interface GadgetProps extends DateProps {
    output: DateOutput | null;
}

const Time: React.FC<GadgetProps> = ({
    output,
    use12Hours = false,
    showSeconds = false
}) => {
    const t = new Intl.DateTimeFormat('zh-CN', {
        hour12: use12Hours,
        hour: '2-digit',
        minute: '2-digit',
        second: showSeconds ? '2-digit' : undefined
    });
    return <p className={styles.time}>{t.format(output?.new)}</p>
}

const DateComponent: React.FC<GadgetProps> = ({
    output,
    dateFormat = 'EEEE, MM/dd'
}) => {
    return <p className={styles.dateComponent}>{format(output?.new!, dateFormat)}</p>;
};

const Date: React.FC<DateProps> = ({ 
    showTime = true,
    showSeconds = false,
    showDate = true,
    dateFormat = 'EEEE,MM/dd',
    use12Hours = false,
}) => {
    const [output, setOutput] = useState(Provider.output);

    useEffect(() => Provider.onOutput(() => setOutput(Provider.output)));

    return (
        <div className={styles.date}>
            {showTime && <Time output={output} use12Hours={use12Hours} showSeconds={showSeconds} />}
            {showDate && <DateComponent output={output} dateFormat={dateFormat} />}
        </div>
    )
}

export default Date;