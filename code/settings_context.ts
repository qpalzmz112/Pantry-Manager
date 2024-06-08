import { createContext } from "react";

interface Settings {
  notifs_on: boolean;
  expir_notif_days: number;
  expir_notif_time: number;
}

const default_time = () => {
  let d = new Date();
  d.setUTCHours(10);
  d.setUTCMinutes(0);
  return d.valueOf();
};

export const SettingsContext = createContext<{
  data: Settings;
  update: (s: any) => void;
}>({
  data: {
    notifs_on: true,
    expir_notif_days: 3,
    expir_notif_time: default_time(),
  },
  update: () => {},
});
