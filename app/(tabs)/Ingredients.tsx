import { Text, View } from "react-native";
import { useState, useEffect } from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { CreateButton, AddIngredientModal } from "@/components/index";
import { Categories, Ingredient } from "@/types/ingredients";
import { set_tab } from "@/code/data_functions";

export default function Ingredients() {
  useEffect(() => set_tab("Ingredients"));

  const [modalVisible, setModalVisible] = useState(false);
  const [categories, setCategories] = useState<Categories>({ "": [] });

  console.log(categories);

  return (
    <View>
      <StatusBar hidden={false} style="dark" />
      <Stack.Screen
        options={{
          headerRight: () => (
            <CreateButton
              text="Add Ingredient"
              onPress={() => {
                setModalVisible(true);
              }}
            />
          ),
        }}
      />

      {modalVisible && (
        <AddIngredientModal
          categories={categories}
          setCategories={setCategories}
          close={() => {
            setModalVisible(false);
          }}
        />
      )}
    </View>
  );
}
