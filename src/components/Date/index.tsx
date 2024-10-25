import React from "react";
import { format } from "date-fns";
import { DateOutput } from "zebar";
import { useProvider } from "../../hooks";
import styles from "./Date.module.scss";

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
  showSeconds = false,
}) => {
  if (!output?.new) return <></>;
  const t = new Intl.DateTimeFormat("zh-CN", {
    hour12: use12Hours,
    hour: "2-digit",
    minute: "2-digit",
    second: showSeconds ? "2-digit" : undefined,
  });
  return <p className={styles.time}>{t.format(output?.new)}</p>;
};

const Date: React.FC<GadgetProps> = ({
  output,
  dateFormat = "EEEE, MM/dd",
}) => {
  if (!output?.new) return <></>;
  return (
    <p className={styles.dateComponent}>{format(output?.new, dateFormat)}</p>
  );
};

const DateComponent: React.FC<DateProps> = ({
  showTime = true,
  showSeconds = false,
  showDate = true,
  dateFormat = "EEEE,MM/dd",
  use12Hours = false,
}) => {
  const output = useProvider("date");

  return (
    <div className={styles.date}>
      {showTime && (
        <Time
          output={output}
          use12Hours={use12Hours}
          showSeconds={showSeconds}
        />
      )}
      {showDate && <Date output={output} dateFormat={dateFormat} />}
    </div>
  );
};

export default DateComponent;
