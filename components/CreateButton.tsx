import { Pressable, Text } from "react-native";
import { useState } from "react";

export default function CreateButton({
  text,
  onPress,
}: {
  text: any;
  onPress: () => void;
}) {
  let defaultColor = "bg-gray-300";
  let pressColor = "bg-gray-400";
  const [color, setColor] = useState(defaultColor);

  return (
    <Pressable
      className={`m-3 p-2 ${color} rounded-md`}
      onPress={onPress}
      onPressIn={() => {
        setColor(pressColor);
      }}
      onPressOut={() => {
        setColor(defaultColor);
      }}
    >
      <Text className="font-medium">{text}</Text>
    </Pressable>
  );
}
