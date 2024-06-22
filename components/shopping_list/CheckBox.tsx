import { Text, Pressable } from "react-native";

interface CheckBoxProps {
  onPress: () => void;
  checked?: boolean;
  className?: string;
}

const bgColor = "bg-white";
const borderColor = "border-gray-500";

export default function CheckBox({
  onPress,
  checked = false,
  className = "",
}: CheckBoxProps) {
  return (
    <Pressable
      className={`border-2 rounded-lg ${borderColor} ${bgColor} flex items-center justify-center ${className} self-start`}
      onPress={() => {
        onPress();
      }}
    >
      <Text className={`text-3xl px-1 ${checked ? "" : "invisible"}`}>✓</Text>
    </Pressable>
  );
}
