import { Text, Pressable } from "react-native";
import { useState } from "react";

export default function DeleteCategoryButton({
  text,
  onPress,
}: {
  text: string;
  onPress: () => void;
}) {
  const [pressed, setPressed] = useState(false);
  return (
    <Pressable
      className={`p-3 m-4 ${
        pressed ? "bg-gray-400" : "bg-gray-300"
      } rounded-lg`}
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      onPress={onPress}
    >
      <Text className="text-2xl">{text}</Text>
    </Pressable>
  );
}
