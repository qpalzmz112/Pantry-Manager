import { View } from "react-native";
import { useState, useEffect, useContext } from "react";
import { useIsFocused } from "@react-navigation/native";
import { CategoryContext } from "@/code/data_context";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { CreateButton, AddIngredientModal } from "@/components/index";
import { set_tab } from "@/code/data_functions";
import { IngredientsList, DeleteSomethingModal } from "@/components/index";

export default function Ingredients() {
  const [modalVisible, setModalVisible] = useState(false);
  const [deletingCategory, setDeletingCategory] = useState("");

  const { data: categories, update: setCategories } =
    useContext(CategoryContext);

  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused) {
      set_tab("Ingredients");
    }
  });

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
        setCategories={setCategories}
        setDeletingCategory={setDeletingCategory}
      />
    </View>
  );
}
