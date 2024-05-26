import { View } from "react-native";
import { useState, useEffect } from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { CreateButton, AddIngredientModal } from "@/components/index";
import { Categories } from "@/types/ingredients";
import { set_tab } from "@/code/data_functions";
import { IngredientsList, DeleteSomethingModal } from "@/components/index";

export default function Ingredients() {
  useEffect(() => set_tab("Ingredients"));

  const [modalVisible, setModalVisible] = useState(false);
  const [deletingCategory, setDeletingCategory] = useState("");
  const [categories, setCategories] = useState<Categories>({ "": [] });

  const deleteCategory = () => {
    let c = { ...categories };
    c[deletingCategory].map((i) => c[""].push({ ...i, category: "" }));
    delete c[deletingCategory];
    setCategories(c);
  };

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

      {deletingCategory && (
        <DeleteSomethingModal
          name={deletingCategory}
          type="category"
          deleteThing={deleteCategory}
          close={() => setDeletingCategory("")}
        />
      )}

      <IngredientsList
        categories={categories}
        setCategories={(c) => setCategories(c)}
        setDeletingCategory={setDeletingCategory}
      />
    </View>
  );
}
