import { Pressable, TextInput, Keyboard } from "react-native";
import { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";

interface props {
  text: string;
  maxWidth: string;
  className?: string;
  setText: (s: string) => void;
}

export default function ListItemDescription({
  text,
  maxWidth,
  className,
  setText,
}: props) {
  const [pressed, setPressed] = useState(false);
  const [showIcon, setShowIcon] = useState(text.length == 0);
  Keyboard.addListener("keyboardDidHide", () => setShowIcon(text.length == 0));

  return (
    <Pressable
      className={`flex-row rounded-lg items-center p-1 ${
        pressed ? "bg-gray-300" : "bg-gray-200"
      } ${className}`}
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
    >
      <MaterialIcons
        className={`absolute left-2 ${
          showIcon && text.length == 0 ? "" : "invisible"
        }`}
        onPressIn={() => setPressed(true)}
        onPressOut={() => setPressed(false)}
        name="notes"
        size={24}
        color="gray"
      />

      <TextInput
        value={text}
        onChangeText={setText}
        className={`text-gray-600 pl-1 pr-2 text-center ${maxWidth}`}
        cursorColor="gray"
        onPress={() => setShowIcon(false)}
        onPressIn={() => setPressed(true)}
        onPressOut={() => setPressed(false)}
      ></TextInput>
    </Pressable>
  );
}
