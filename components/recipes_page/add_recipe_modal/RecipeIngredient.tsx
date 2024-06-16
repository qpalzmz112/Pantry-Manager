import { View } from "react-native";
import { useState, useContext } from "react";
import { useTranslation } from "react-i18next";
import { CategoryContext } from "@/code/data_context";
import DeleteSomethingModal from "@/components/DeleteSomethingModal";
import Button from "@/components/Button";
import { hasIngredient } from "@/code/recipe_utils";
import ListItemDescription from "@/components/ListItemDescription";

export default function RecipeIngredient({
  name,
  desc,
  setDesc,
  deleteIngredient,
}: {
  name: string;
  desc: string;
  setDesc: (d: string) => void;
  deleteIngredient: () => void;
}) {
  const { t } = useTranslation();

  const { data: categories, update: setCategories } =
    useContext(CategoryContext);
  let bgColor = hasIngredient(categories, name) ? "bg-gray-200" : "bg-red-300";

  let [showDeleteModal, setShowDeleteModal] = useState(false);

  return (
    <View className="flex-row justify-center items-center my-1">
      <Button
        textClass="text-lg"
        pressableClass={`p-2.5 rounded-lg ${bgColor} grow`}
        pressedClass={bgColor == "bg-gray-200" ? "bg-gray-300" : "bg-red-400"}
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
