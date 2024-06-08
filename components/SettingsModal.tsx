import { Modal, View, Text, Switch } from "react-native";
import { useState, useContext } from "react";
import * as Notifications from "expo-notifications";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
import DateTimePicker from "@react-native-community/datetimepicker";
import { CategoryContext } from "@/code/data_context";
import { SettingsContext } from "@/code/settings_context";
import { NotificationsContext } from "@/code/notifications_context";
import QuantitySetter from "./ingredients_page/add_ingredient_modal/QuantitySetter";
import CloseButton from "./CloseButton";
import Button from "./Button";
import { schedulePushNotificationAllIngredients } from "@/code/notifications";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function SettingsModal({ close }: { close: () => void }) {
  const { t } = useTranslation();

  const { data: categories, update: setCategories } =
    useContext(CategoryContext);
  const { data: settings, update: setSettings } = useContext(SettingsContext);
  const { data: notifications, update: setNotifications } =
    useContext(NotificationsContext);

  const [showTime, setShowTime] = useState(false);
  const [time, setTime] = useState<Date>(new Date(settings.expir_notif_time));

  return (
    <Modal onRequestClose={close}>
      <View className="w-screen h-screen flex items-center justify-center">
        <Text className="text-lg">{t("notif_switch_label")}</Text>
        <Switch
          value={settings.notifs_on}
          onValueChange={(val) => {
            setSettings({ ...settings, notifs_on: val });
            if (val) {
              // for each ingredient with a date, add the appropriate notification
              schedulePushNotificationAllIngredients(categories).then((val) =>
                setNotifications(val)
              );
            } else {
              Notifications.cancelAllScheduledNotificationsAsync();
              setNotifications({});
            }
          }}
          className="mb-10"
          style={{ transform: [{ scaleX: 1.15 }, { scaleY: 1.15 }] }}
        />

        <View
          className={`flex items-center justify-center ${
            settings.notifs_on ? "" : "invisible"
          }`}
        >
          <Text className="max-w-[80vw] text-center text-lg">
            {t("info_1")}
          </Text>
          <QuantitySetter
            qty={settings.expir_notif_days}
            setQty={(n) => {
              // for all ingredients, update notification accordingly
              schedulePushNotificationAllIngredients(categories).then((val) =>
                setNotifications(val)
              );
              let newSettings = { ...settings, expir_notif_days: n };
              setSettings(newSettings);
            }}
            inList={false}
            text=""
          />

          <Text className="max-w-[80vw] text-center text-lg mt-10">
            {t("info_2")}
          </Text>
          <Button
            text={i18next.t("intlDateTime", {
              val: time.getTime(),
              formatParams: {
                val: {
                  timeStyle: "short",
                },
              },
            })}
            textClass="text-lg"
            pressableClass="p-2 m-6 bg-gray-200 rounded-lg"
            pressedClass="bg-gray-400"
            onPress={() => setShowTime(true)}
          />
        </View>

        {showTime && (
          <DateTimePicker
            mode="time"
            value={new Date()}
            onChange={(e, time) => {
              if (e.type == "dismissed") {
                setShowTime(false);
              } else if (e.type == "set") {
                setShowTime(false);
                const t = time!.valueOf();
                setTime(new Date(t));
                let newSettings = { ...settings, expir_notif_time: t };
                setSettings(newSettings);

                // update all push notifications
                schedulePushNotificationAllIngredients(categories).then((val) =>
                  setNotifications(val)
                );
              }
            }}
          />
        )}
      </View>
      <CloseButton close={close} />
    </Modal>
  );
}
