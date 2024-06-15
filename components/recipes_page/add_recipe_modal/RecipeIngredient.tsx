import { useState, useContext } from "react";
import { useTranslation } from "react-i18next";
import { CategoryContext } from "@/code/data_context";
import DeleteSomethingModal from "@/components/DeleteSomethingModal";
import Button from "@/components/Button";
import { hasIngredient } from "@/code/recipe_utils";

export default function RecipeIngredient({
  name,
  deleteIngredient,
}: {
  name: string;
  deleteIngredient: () => void;
}) {
  const { t } = useTranslation();

  const { data: categories, update: setCategories } =
    useContext(CategoryContext);
  let bgColor = hasIngredient(categories, name) ? "bg-gray-200" : "bg-red-300";

  let [showDeleteModal, setShowDeleteModal] = useState(false);

  return (
    <>
      <Button
        textClass="text-lg"
        pressableClass={`p-2 rounded-lg m-1 ${bgColor}`}
        pressedClass="bg-gray-300"
        text={name}
        onPress={() => setShowDeleteModal(true)}
      />
      {showDeleteModal && (
        <DeleteSomethingModal
          name={name}
          type="recipe_ingredient"
          deleteThing={() => deleteIngredient()}
          close={() => setShowDeleteModal(false)}
        />
      )}
    </>
  );
}
