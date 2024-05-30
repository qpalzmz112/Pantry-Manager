import { Pressable, Platform } from "react-native";
import { useState } from "react";
import { Feather } from "@expo/vector-icons";

export default function CloseButton({ close }: { close: () => void }) {
  const [pressed, setPressed] = useState(false);
  return (
    <Pressable
      className={`absolute ${
        Platform.OS == "ios" ? "top-10" : "top-0"
      } right-0 m-2`}
      onPressIn={() => {
        setPressed(true);
      }}
      onPressOut={() => {
        setPressed(false);
      }}
      onPress={() => {
        close();
      }}
    >
      <Feather name="x-square" size={36} color={pressed ? "gray" : "black"} />
    </Pressable>
  );
}
