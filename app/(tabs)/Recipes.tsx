import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import { useEffect, useState, useContext } from "react";
import { useIsFocused } from "@react-navigation/native";
import { set_tab } from "@/code/data_functions";
import {
  SettingsButton,
  Button,
  AddRecipeModal,
  DeleteSomethingModal,
  RecipeList,
} from "@/components/index";
import { Entypo } from "@expo/vector-icons";
import { RecipeContext } from "@/code/data_context";

export default function Recipes() {
  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused) {
      set_tab("Recipes");
    }
  });

  const { data: recipes, update: setRecipes } = useContext(RecipeContext);

  const [addModalVisible, setAddModalVisible] = useState(false);

  const [deletingCategory, setDeletingCategory] = useState("");
  const deleteCategory = () => {
    let r = { ...recipes };
    r[deletingCategory].map((i) => r[""].push({ ...i, category: "" }));
    delete r[deletingCategory];
    setRecipes(r);
  };

  return (
    <View>
      <StatusBar hidden={false} style="dark" />
      <Stack.Screen options={{ headerRight: () => <SettingsButton /> }} />

      {addModalVisible && (
        <AddRecipeModal
          close={() => {
            setAddModalVisible(false);
          }}
        />
      )}

      {deletingCategory && (
        <DeleteSomethingModal
          name={deletingCategory}
          type="recipe_category"
          deleteThing={deleteCategory}
          close={() => setDeletingCategory("")}
        />
      )}

      <RecipeList
        recipes={recipes}
        setRecipes={setRecipes}
        setDeletingCategory={setDeletingCategory}
      />

      <View className="w-[100vw] flex-row justify-center">
        <Button
          text={<Entypo name="plus" size={24} color="black" />}
          pressableClass="m-1 bg-gray-300 rounded-3xl w-[45vw]"
          pressedClass="bg-gray-400"
          textClass="text-center text-xl py-2 font-medium"
          onPress={() => {
            setAddModalVisible(true);
          }}
        />
      </View>
    </View>
  );
}
