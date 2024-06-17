import { Text, Pressable, View } from "react-native";
import { useState } from "react";
import { Recipe } from "@/types/recipe";
import * as Haptics from "expo-haptics";
import { AntDesign } from "@expo/vector-icons";
import ChangeCategoryModal from "../ChangeCategoryModal";
import DeleteSomethingModal from "../DeleteSomethingModal";
import AddRecipeModal from "./add_recipe_modal/AddRecipeModal";
import { useTranslation } from "react-i18next";

export default function ListItem({
  recipe,
  missingIngredients,
  updateCategory,
  deleteRecipe,
}: {
  recipe: Recipe;
  missingIngredients: number;
  updateCategory: (c: string) => void;
  deleteRecipe: (n: string) => void;
}) {
  const { t } = useTranslation();
  const [showingDelete, setShowingDelete] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  return (
    <>
      <Pressable
        onPress={() => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
          setShowInfoModal(true);
        }}
        onLongPress={() => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
          setShowCategoryModal(true);
        }}
      >
        <View
          className={`flex-row items-center p-2 mx-1 mb-2 rounded-xl ${
            missingIngredients ? "bg-gray-200" : "bg-white"
          }`}
        >
          <View className="flex-col">
            <Text className="text-xl">{recipe.name}</Text>
            <Text className="text-md text-gray-500">{`${t(
              "missing_ingredients"
            )} ${missingIngredients}`}</Text>
          </View>

          <Pressable
            className="absolute right-4"
            onPress={() => setShowingDelete(!showingDelete)}
          >
            <AntDesign name="delete" size={22} color="black" />
          </Pressable>
        </View>
      </Pressable>

      {showInfoModal && (
        <AddRecipeModal close={() => setShowInfoModal(false)} recipe={recipe} />
      )}

      {showCategoryModal && (
        <ChangeCategoryModal
          recipe={true}
          placeholder={recipe.category}
          save={(c) => updateCategory(c)}
          close={() => setShowCategoryModal(false)}
        />
      )}

      {showingDelete && (
        <DeleteSomethingModal
          name={recipe.name}
          type="recipe"
          deleteThing={() => {
            deleteRecipe(recipe.name);
          }}
          close={() => {
            setShowingDelete(false);
          }}
        />
      )}
    </>
  );
}
