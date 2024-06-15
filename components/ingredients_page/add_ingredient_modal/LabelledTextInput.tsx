import { Text, TextInput, KeyboardTypeOptions } from "react-native";

interface LabelledTextInputProps {
  labelText: string;
  inputText: string;
  placeholder?: string;
  keyboardType?: string;
  maxLength?: number;
  paddingTop?: string;
  multiline?: boolean;
  onChangeText: (t: string) => void;
  onPress?: () => void;
  onSubmitEditing?: () => void;
  onEndEditing?: () => void;
  onFocus?: () => void;
  onBlur?: () => void;
}

export default function LabelledTextInput({
  labelText,
  inputText,
  placeholder = "",
  keyboardType = "default",
  maxLength,
  paddingTop = "pt-6",
  multiline = false,
  onChangeText,
  onPress,
  onSubmitEditing,
  onEndEditing,
  onFocus,
  onBlur,
}: LabelledTextInputProps) {
  return (
    <>
      <Text className={`w-[80vw] text-left ${paddingTop}`}>{labelText}</Text>
      <TextInput
        onChangeText={onChangeText}
        onPress={onPress}
        onSubmitEditing={onSubmitEditing}
        onEndEditing={onEndEditing}
        maxLength={maxLength}
        keyboardType={keyboardType as KeyboardTypeOptions}
        value={inputText}
        placeholder={placeholder}
        className="border-2 border-gray-500 rounded-lg p-1 w-[80vw] bg-white text-xl"
        cursorColor="black"
        multiline={multiline}
        onFocus={onFocus}
        onBlur={onBlur}
      />
    </>
  );
}
