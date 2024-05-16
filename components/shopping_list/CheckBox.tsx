import { Text, Pressable } from "react-native";

interface CheckBoxProps {
  onPress: () => void;
  checked?: boolean;
  className: string;
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
      className={`border-2 ${borderColor} ${bgColor} w-[10vw] h-[10vw] flex items-center justify-center ${className}`}
      onPress={() => {
        onPress();
      }}
    >
      <Text className="text-3xl">{checked ? "✓" : null}</Text>
    </Pressable>
  );
}
