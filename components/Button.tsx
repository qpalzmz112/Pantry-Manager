import { Pressable, Text } from "react-native";
import { useState } from "react";

interface props {
  text: string;
  textClass: string;
  pressableClass: string;
  pressedClass: string;
  onPress: () => void;
  disabled?: boolean;
}

export default function Button({
  text,
  textClass,
  pressableClass,
  pressedClass,
  onPress,
  disabled = false,
}: props) {
  const [pressed, setPressed] = useState(false);
  return (
    <Pressable
      className={pressableClass + ` ${pressed ? pressedClass : ""}`}
      disabled={disabled}
      onPress={onPress}
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
    >
      <Text className={textClass}>{text}</Text>
    </Pressable>
  );
}
