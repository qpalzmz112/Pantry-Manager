import { View } from "react-native";
import { useState, useEffect, useContext } from "react";
import { useIsFocused } from "@react-navigation/native";
import { CategoryContext } from "@/code/data_context";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Entypo } from "@expo/vector-icons";
import {
  AddIngredientModal,
  IngredientsList,
  DeleteSomethingModal,
  Button,
} from "@/components/index";
import { set_tab } from "@/code/data_functions";
import { SettingsButton } from "@/components/index";

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
    <View className="h-screen flex-col flex-initial gap-1">
      <StatusBar hidden={false} style="dark" />
      <Stack.Screen options={{ headerRight: () => <SettingsButton /> }} />

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

      <View className="w-[100vw] flex-row justify-center mt-auto mb-1">
        <Button
          text={<Entypo name="plus" size={24} color="black" />}
          pressableClass="m-1 bg-gray-300 rounded-3xl w-[45vw]"
          pressedClass="bg-gray-400"
          textClass="text-center text-xl py-2 font-medium"
          onPress={() => {
            setModalVisible(true);
          }}
        />
      </View>
    </View>
  );
}
