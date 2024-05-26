import { Pressable, Text } from "react-native";
import { useState } from "react";

export default function AddItemButton({
  text,
  errorMessage,
  canAddItemCheck,
  addItem,
}: {
  text: string;
  errorMessage: string;
  canAddItemCheck: () => boolean;
  addItem: () => void;
}) {
  const [pressed, setPressed] = useState(false);

  return (
    <Pressable
      className={`p-2 ${
        errorMessage == "" ? "bg-white" : "bg-gray-200"
      } border-2 ${
        pressed ? "border-gray-300" : "border-gray-500"
      } rounded-md mx-4 max-w-[40vw] flex justify-center`}
      disabled={!(errorMessage == "")}
      onPressIn={() => {
        setPressed(true);
      }}
      onPressOut={() => {
        setPressed(false);
      }}
      onPress={() => {
        if (!canAddItemCheck()) {
          return;
        }
        addItem();
      }}
    >
      <Text
        className={`text-center ${
          pressed
            ? "text-gray-300"
            : errorMessage == ""
            ? "text-black"
            : "text-gray-400"
        }`}
      >
        {text}
      </Text>
    </Pressable>
  );
}
