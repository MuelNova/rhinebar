import React from "react";
import { NetworkOutput } from "zebar";
import { useProvider } from "../../hooks";
import styles from "./Network.module.scss";

const strengthToIcon = (strength: number) => {
  if (strength >= 85) return "nf-md-wifi_strength_4";
  if (strength >= 65) return "nf-md-wifi_strength_3";
  if (strength >= 40) return "nf-md-wifi_strength_2";
  if (strength >= 25) return "nf-md-wifi_strength_1";
  return "nf-md-wifi_strength_outline";
};

interface NetworkProps {
  output: NetworkOutput | null;
  showName?: boolean;
}

const WiFi: React.FC<NetworkProps> = ({ output, showName = true }) => {
  return (
    <div className={styles.wifi}>
      <div
        className={`${styles.wifiStrength} nf ${strengthToIcon(
          output?.defaultGateway?.signalStrength || 0
        )}`}
      />
      {showName && (
        <p className={styles.wifiName}>{output?.defaultGateway?.ssid}</p>
      )}
    </div>
  );
};

// TODO: Implement Ethernet
const Ethernet: React.FC<NetworkProps> = () => {
  return <></>;
};

const Network = ({ showName = true }: { showName?: boolean }) => {
  const output = useProvider("network");

  const Component = output?.defaultInterface?.type === "wifi" ? WiFi : Ethernet;

  return <Component output={output} showName={showName} />;
};

export default Network;
