import { createContext } from "react";

interface Settings {
  sort_shopping_list: boolean;
  notifs_on: boolean;
  expir_notif_days: number;
  expir_notif_time: number;
}

const default_time = () => {
  let d = new Date();
  d.setHours(10, 0, 0);
  return d.valueOf();
};

export const SettingsContext = createContext<{
  data: Settings;
  update: (s: any) => void;
}>({
  // default settings; notifs_on gets set to false if user declines notification prompt
  data: {
    sort_shopping_list: true,
    notifs_on: true,
    expir_notif_days: 3,
    expir_notif_time: default_time(),
  },
  update: () => {},
});
