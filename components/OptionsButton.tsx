import { Pressable } from "react-native";
import { Entypo } from "@expo/vector-icons";

export default function OptionsButton({
  className,
  onPress,
  onPressIn,
  onPressOut,
}: {
  className: string;
  onPress: () => void;
  onPressIn: () => void;
  onPressOut: () => void;
}) {
  return (
    <Pressable
      className={`${className}`}
      onPress={onPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
    >
      <Entypo name="dots-three-vertical" size={24} color="black" />
    </Pressable>
  );
}
