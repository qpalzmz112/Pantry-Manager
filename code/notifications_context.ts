import { createContext } from "react";
import { Notifications } from "@/types/notifications";

// map ingredient name to its notification ID

export const NotificationsContext = createContext<{
  data: Notifications;
  update: (n: any) => void;
}>({
  data: {},
  update: () => {},
});
