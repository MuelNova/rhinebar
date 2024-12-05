import { useState, useEffect } from "react";
import { createProviderGroup } from "zebar";

const Providers = createProviderGroup({
  cpu: { type: "cpu" },
  memory: { type: "memory" },
  battery: { type: "battery" },
  network: { type: "network" },
  date: { type: "date" },
  glazewm: { type: "glazewm" },
  host: { type: "host" },
  media: { type: "media" },
});

export function useProvider<T extends keyof (typeof Providers)["outputMap"]>(
  type: T
) {
  const [output, setOutput] = useState(Providers.outputMap);

  useEffect(() => {
    Providers.onOutput(() => setOutput(Providers.outputMap));
  }, []);

  return output[type];
}
