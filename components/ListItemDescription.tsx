import { View, TextInput, Keyboard } from "react-native";
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
  const [showIcon, setShowIcon] = useState(text.length == 0);
  Keyboard.addListener("keyboardDidHide", () => setShowIcon(text.length == 0));

  return (
    <View
      className={`flex-row bg-gray-200 rounded-lg items-center p-1 ${className}`}
    >
      <MaterialIcons
        className={`absolute left-2 ${
          showIcon && text.length == 0 ? "" : "invisible"
        }`}
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
      ></TextInput>
    </View>
  );
}
