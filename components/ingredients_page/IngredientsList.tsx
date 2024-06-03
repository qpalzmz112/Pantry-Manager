import { SectionList, Pressable, Text, View, TextInput } from "react-native";
import { useState } from "react";
import * as Haptics from "expo-haptics";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import ListItem from "./ListItem";
import Button from "../Button";
import { Categories } from "@/types/ingredients";
import { filterBySearch } from "@/code/sort_ingredients";
import { useTranslation } from "react-i18next";

export default function IngredientsList({
  categories,
  setCategories,
  setDeletingCategory,
}: {
  categories: Categories;
  setCategories: (c: Categories) => void;
  setDeletingCategory: (c: string) => void;
}) {
  const { t } = useTranslation();
  const defaultCollapsedCategories = Object.fromEntries(
    Object.entries(categories).map((key) => [key, false])
  );
  const [collapsedCategories, setCollapsedCategories] = useState(
    defaultCollapsedCategories
  );
  const [search, setSearch] = useState("");
  return (
    <View className="h-[79vh]">
      <View>
        <View className="flex-row m-2">
          <AntDesign className="mr-2" name="search1" size={24} color="gray" />
          <TextInput
            value={search}
            onChangeText={(t) => {
              if (search == "") {
                setCollapsedCategories(defaultCollapsedCategories);
              }
              setSearch(t);
            }}
            onPress={() => setSearch("")}
            className="w-screen"
            placeholder={t("search")}
            cursorColor="gray"
          />
        </View>

        {search && (
          <Button
            text={t("clear_search")}
            textClass="text-lg text-center"
            pressableClass="w-[80vw] mx-auto bg-gray-300 rounded-lg p-1 mb-2"
            pressedClass="bg-gray-400"
            onPress={() => {
              setSearch("");
              setCollapsedCategories(defaultCollapsedCategories);
            }}
          />
        )}
      </View>

      <SectionList
        keyboardShouldPersistTaps="always"
        sections={filterBySearch(search, categories, collapsedCategories)}
        renderItem={({ item }) => (
          <ListItem
            ingredient={item}
            updateCategory={(c) => {
              let newCategories = { ...categories };
              newCategories[c].push({ ...item, category: c });
              newCategories[item.category] = newCategories[
                item.category
              ].filter((i) => i.name != item.name);
              setCategories(newCategories);
            }}
            updateQty={(n) => {
              let newCategories = { ...categories };
              newCategories[item.category].find(
                (i) => i.name == item.name
              )!.qty = n;
              setCategories(newCategories);
            }}
            updateDate={(date) => {
              let newCategories = { ...categories };
              newCategories[item.category].find(
                (i) => i.name == item.name
              )!.useByDate = date;
              setCategories(newCategories);
            }}
            deleteIngredient={(name) => {
              let newCategories = { ...categories };
              newCategories[item.category] = newCategories[
                item.category
              ].filter((ingredient) => ingredient.name != name);
              setCategories(newCategories);
            }}
          />
        )}
        renderSectionHeader={({ section: { title } }) => (
          <Pressable
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
              let c = { ...collapsedCategories };
              c[title] = !c[title];
              setCollapsedCategories(c);
            }}
            onLongPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
              setDeletingCategory(title);
            }}
          >
            <Text className="text-xl text-white text-center py-2 mb-2 bg-indigo-600">
              {title == "" ? t("uncategorized") : title}
            </Text>
            <Pressable
              className="absolute right-3 top-2"
              hitSlop={30}
              onPress={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                let c = { ...collapsedCategories };
                c[title] = !c[title];
                setCollapsedCategories(c);
              }}
            >
              <Entypo
                name={
                  collapsedCategories[title] ? "chevron-left" : "chevron-down"
                }
                size={24}
                color="white"
              />
            </Pressable>
          </Pressable>
        )}
      />
    </View>
  );
}
