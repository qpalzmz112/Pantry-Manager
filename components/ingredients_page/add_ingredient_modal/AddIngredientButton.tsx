import { Text, Pressable, View } from "react-native";
import { useState } from "react";
import { Ingredient } from "@/types/ingredients";

export default function AddIngredientButton({
  errorMessage,
  canAddCheck,
  addIngredient,
}: {
  errorMessage: string;
  canAddCheck: () => boolean;
  addIngredient: () => void;
}) {
  const [pressed, setPressed] = useState(false);
  return (
    <>
      <Pressable
        className={`p-2 mt-10 ${
          errorMessage == "" ? "bg-gray-100" : "bg-gray-200"
        } border-2 ${
          pressed ? "border-gray-300" : "border-gray-400"
        } rounded-md`}
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
          } text-xl`}
        >
          Add Ingredient
        </Text>
      </Pressable>
      {errorMessage != "" && (
        <Text className="text-black pt-2 max-w-[80vw]">{errorMessage}</Text>
      )}
    </>
  );
}
