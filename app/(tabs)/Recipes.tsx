import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import { useEffect, useState, useContext } from "react";
import { useIsFocused } from "@react-navigation/native";
import { set_tab } from "@/code/data_functions";
import { SettingsButton, Button, AddRecipeModal } from "@/components/index";
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
  console.log(recipes);

  const [addModalVisible, setAddModalVisible] = useState(false);

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

      {/* <IngredientsList
        categories={categories}
        setCategories={setCategories}
        setDeletingCategory={setDeletingCategory}
      /> */}

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
