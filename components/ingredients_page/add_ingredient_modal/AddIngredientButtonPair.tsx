import { View, Text } from "react-native";
import AddIngredientButton from "./AddIngredientButton";

export default function AddIngredientButtonPair({
  errorMessage,
  canAddCheck,
  addIngredient,
  close,
}: {
  errorMessage: string;
  canAddCheck: () => boolean;
  addIngredient: () => void;
  close: () => void;
}) {
  return (
    <View className="flex-col items-center">
      <View className="flex-row">
        <AddIngredientButton
          text="Add Ingredient"
          errorMessage={errorMessage}
          canAddCheck={canAddCheck}
          addIngredient={addIngredient}
        />
        <AddIngredientButton
          text="Add Ingredient and Return to List"
          errorMessage={errorMessage}
          canAddCheck={canAddCheck}
          addIngredient={() => {
            addIngredient();
            close();
          }}
        />
      </View>
      {errorMessage != "" && (
        <Text className="text-black pt-2 max-w-[80vw]">{errorMessage}</Text>
      )}
    </View>
  );
}
