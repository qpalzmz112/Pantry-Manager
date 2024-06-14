import { Text } from "react-native";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import DeleteSomethingModal from "@/components/DeleteSomethingModal";
import Button from "@/components/Button";

export default function RecipeIngredient({
  name,
  deleteIngredient,
}: {
  name: string;
  deleteIngredient: () => void;
}) {
  const { t } = useTranslation();
  let [showDeleteModal, setShowDeleteModal] = useState(false);

  return (
    <>
      <Button
        textClass="text-lg"
        pressableClass="p-2 bg-gray-200 rounded-lg m-1"
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
