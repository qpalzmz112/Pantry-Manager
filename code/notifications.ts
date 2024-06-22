import * as Notifications from "expo-notifications";
import { useState, useEffect, useRef } from "react";
import { Platform } from "react-native";
import { date } from "@/types/shopping_list";
import { get_data } from "./data_functions";
import { useTranslation } from "react-i18next";
import { Ingredient, Categories } from "@/types/ingredients";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

let t: any;

export default function Notification() {
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef<any>();
  const responseListener = useRef<any>();

  t = useTranslation().t;

  useEffect(() => {
    registerForPushNotificationsAsync().then((token: any) => {
      // if token is null, turn notifs off in settings context
      // when notifs are turned on, request permissions again if not already granted
      setExpoPushToken(token);
    });

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification: any) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {});

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  return null;
}

export async function schedulePushNotificationAllIngredients(
  categories: Categories
) {
  await Notifications.cancelAllScheduledNotificationsAsync();
  let ingredients: Ingredient[] = [];
  Object.keys(categories).map((key) => {
    categories[key].map((ingredient) => {
      if (ingredient.useByDate != null) {
        ingredients.push(ingredient);
      }
    });
  });

  let res = {}; // new value for notifications context
  let promiseArray = ingredients.map(async (ingredient) => {
    let val = await schedulePushNotification(
      ingredient.name,
      ingredient.useByDate!
    );
    if (val != null) {
      res = { ...res, [ingredient.name]: val };
    }
  });
  await Promise.all(promiseArray);
  return res;
}

export async function schedulePushNotification(
  ingredient_name: string,
  date: date
) {
  let settings = await get_data("settings");
  if (
    settings == null ||
    settings.expir_notif_time == null ||
    settings.expir_notif_days == null
  ) {
    console.error("null settings, can't schedule notification");
    return;
  }

  let time = new Date(settings.expir_notif_time);
  let days_before = settings.expir_notif_days;
  let notif_date = new Date(
    date.year,
    date.month - 1,
    date.day,
    time.getHours(),
    time.getMinutes()
  );
  notif_date = new Date(
    notif_date.valueOf() - days_before * 24 * 60 * 60 * 1000
  );

  let num = notif_date.valueOf() - Date.now();
  if (num < 0) {
    // can't schedule a notification in the past
    console.log("can't schedule a notification in the past");
    return;
  }

  num = num / 1000; // milliseconds to seconds

  let translation_key = "notif_text_";
  if (ingredient_name.slice(-1) == "s") {
    translation_key += "plural_";
  } else {
    translation_key += "singular_";
  }
  if (days_before > 1) {
    translation_key += "more";
  } else {
    translation_key += "one";
  }

  //await Notifications.cancelAllScheduledNotificationsAsync();

  const id = await Notifications.scheduleNotificationAsync({
    content: {
      title: t(translation_key, {
        count: days_before,
        ingredient_name: ingredient_name,
      }),
    },
    trigger: {
      seconds: num,
    },
  });
  return [id, notif_date.toString()];
}

async function registerForPushNotificationsAsync() {
  let token;
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;
  if (existingStatus !== "granted") {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }
  if (finalStatus !== "granted") {
    //alert("Failed to get push token for push notification!");
    return;
  }
  token = (await Notifications.getExpoPushTokenAsync()).data;

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
      lockscreenVisibility: Notifications.AndroidNotificationVisibility.PUBLIC,
      bypassDnd: true,
    });
  }

  return token;
}

export async function cancelNotification(notifId: any) {
  await Notifications.cancelScheduledNotificationAsync(notifId);
}
