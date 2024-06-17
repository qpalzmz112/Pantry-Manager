import { View } from "react-native";
import { useState } from "react";
import DeleteSomethingModal from "@/components/DeleteSomethingModal";
import Button from "@/components/Button";
import ListItemDescription from "@/components/ListItemDescription";

export default function RecipeIngredient({
  name,
  desc,
  inShoppingList,
  missing,
  setDesc,
  deleteIngredient,
}: {
  name: string;
  desc: string;
  inShoppingList: boolean;
  missing: boolean;
  setDesc: (d: string) => void;
  deleteIngredient: () => void;
}) {
  let bgColor = missing
    ? "bg-red-300"
    : inShoppingList
    ? "bg-amber-200"
    : "bg-gray-200";

  let [showDeleteModal, setShowDeleteModal] = useState(false);

  return (
    <View className="flex-row justify-center items-center my-1">
      <Button
        textClass="text-lg"
        pressableClass={`p-1.5 rounded-lg ${bgColor} grow shrink`}
        pressedClass={
          missing
            ? "bg-red-400"
            : inShoppingList
            ? "bg-amber-300"
            : "bg-gray-300"
        }
        text={name}
        onPress={() => setShowDeleteModal(true)}
      />
      <ListItemDescription
        text={desc}
        setText={setDesc}
        maxWidth="max-w-[30vw]"
      />
      {showDeleteModal && (
        <DeleteSomethingModal
          name={name}
          type="recipe_ingredient"
          deleteThing={() => deleteIngredient()}
          close={() => setShowDeleteModal(false)}
        />
      )}
    </View>
  );
}
