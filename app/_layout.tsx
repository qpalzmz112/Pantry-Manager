import { Stack } from "expo-router";
import "../global.css";
import { RootSiblingParent } from "react-native-root-siblings";
import { I18nextProvider } from "react-i18next";
import i18n from "../i18n";

export default function RootLayout() {
  return (
    <I18nextProvider i18n={i18n}>
      <RootSiblingParent>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      </RootSiblingParent>
    </I18nextProvider>
  );
}
