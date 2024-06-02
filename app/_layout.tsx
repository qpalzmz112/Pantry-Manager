import { Stack } from "expo-router";
import "../global.css";
import { RootSiblingParent } from "react-native-root-siblings";

export default function RootLayout() {
  return (
    <RootSiblingParent>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </RootSiblingParent>
  );
}
