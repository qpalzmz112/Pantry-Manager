import { Text, TextInput, KeyboardTypeOptions } from "react-native";

interface LabelledTextInputProps {
  labelText: string;
  inputText: string;
  keyboardType?: string;
  maxLength?: number;
  onChangeText: (t: string) => void;
  onPress?: () => void;
  onEndEditing?: () => void;
}

export default function LabelledTextInput({
  labelText,
  inputText,
  keyboardType = "default",
  maxLength,
  onChangeText,
  onPress,
  onEndEditing,
}: LabelledTextInputProps) {
  return (
    <>
      <Text className="w-[80vw] text-left pt-6 ">{labelText}</Text>
      <TextInput
        onChangeText={onChangeText}
        onPress={onPress}
        onEndEditing={onEndEditing}
        maxLength={maxLength}
        keyboardType={keyboardType as KeyboardTypeOptions}
        value={inputText}
        className="border-2 border-gray-500 rounded-lg p-1 w-[80vw] bg-white text-2xl"
        cursorColor="black"
      />
    </>
  );
}
