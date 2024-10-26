import React from "react";
import CPU from "./components/CPU";
import Background from "./components/Background";
import GlazeWMWorkspace from "./components/GlazeWMWorkspace";
import Hostname from "./components/Hostname";
import Media from "./components/Media";
import Network from "./components/Network";
import Date from "./components/Date";
import Battery from "./components/Battery";
import Memory from "./components/Memory";
import styles from "./App.module.scss";
import "./App.scss";

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <div className="bar">
          <Background />
          <div className="bar-overlay">
            {/* TODO: Refactor these components to be more flexible */}
            <Hostname />
            <Media />
            <div className={styles.workspace}>
              <GlazeWMWorkspace />
            </div>
            <div className={styles.date}>
              <Date />
              <div className={styles.battery}>
                <Battery />
              </div>
            </div>
            <div className={styles.cpu}>
              <CPU />
            </div>
            <div className={styles.memory}>
              <Memory fixed={0} />
            </div>
            {/* Done */}
            <div className={styles.network}>
              <Network showName={false} />
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default App;
