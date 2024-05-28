import { Text, Pressable } from "react-native";
import { useState } from "react";

export default function AddIngredientButton({
  text,
  errorMessage,
  canAddCheck,
  addIngredient,
}: {
  text: string;
  errorMessage: string;
  canAddCheck: () => boolean;
  addIngredient: () => void;
}) {
  const [pressed, setPressed] = useState(false);
  return (
    <>
      <Pressable
        className={`p-2 mx-4 mt-10 ${
          errorMessage == "" ? "bg-gray-100" : "bg-gray-200"
        } border-2 ${
          pressed ? "border-gray-300" : "border-gray-400"
        } rounded-lg max-w-[50vw] flex justify-center`}
        disabled={!(errorMessage == "")}
        onPressIn={() => {
          setPressed(true);
        }}
        onPressOut={() => {
          setPressed(false);
        }}
        onPress={() => {
          if (canAddCheck()) {
            addIngredient();
          }
        }}
      >
        <Text
          className={`${
            pressed
              ? "text-gray-400"
              : errorMessage == ""
              ? "text-black"
              : "text-gray-400"
          } text-xl text-center`}
        >
          {text}
        </Text>
      </Pressable>
    </>
  );
}
