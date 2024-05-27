import { Text, View, Pressable, Modal } from "react-native";
import { useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { Ingredient } from "@/types/ingredients";
import DeleteSomethingModal from "../DeleteSomethingModal";

export default function ListItem({
  ingredient,
  updateQty,
  deleteIngredient,
}: {
  ingredient: Ingredient;
  updateQty: (n: number) => void;
  deleteIngredient: (n: string) => void;
}) {
  const [showingDelete, setShowingDelete] = useState(false);

  let { useByDate } = ingredient;
  let useByText;
  if (useByDate == null) {
    useByText = "";
  } else {
    if (typeof useByDate == "string") {
      // JSON can't serialize dates
      useByDate = new Date(useByDate);
    }
    useByText = `${
      useByDate.getMonth() + 1
    }-${useByDate.getDate()}-${useByDate.getFullYear()}`;
  }

  return (
    <>
      <View className="flex-row items-center p-2 bg-white">
        <View className="flex-col">
          <Text className="text-xl">{ingredient.name}</Text>

          <View className="flex-row pt-1 items-center">
            <Pressable
              className="pr-1"
              disabled={ingredient.qty == 1}
              onPress={() => updateQty(-1)}
            >
              <AntDesign
                name="minuscircleo"
                size={20}
                color={ingredient.qty == 1 ? "gray" : "black"}
              />
            </Pressable>
            <Text>{`Qty: ${ingredient.qty}`}</Text>
            <Pressable className="pl-1 pr-4" onPress={() => updateQty(1)}>
              <AntDesign name="pluscircleo" size={20} color="black" />
            </Pressable>

            {useByText && (
              <View className="flex-row items-center py-1">
                <Text className="text-sm  pr-2">Use By: {useByText}</Text>
              </View>
            )}
          </View>
        </View>

        <Pressable
          className="absolute right-4"
          onPress={() => setShowingDelete(!showingDelete)}
        >
          <AntDesign name="delete" size={22} color="black" />
        </Pressable>
      </View>

      {showingDelete && (
        <DeleteSomethingModal
          name={ingredient.name}
          type="ingredient"
          deleteThing={() => {
            deleteIngredient(ingredient.name);
          }}
          close={() => {
            setShowingDelete(false);
          }}
        />
      )}
    </>
  );
}
