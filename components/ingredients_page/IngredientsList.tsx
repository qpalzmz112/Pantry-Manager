import { SectionList, Pressable, Text, View } from "react-native";
import { useState } from "react";
import * as Haptics from "expo-haptics";
import { Entypo } from "@expo/vector-icons";
import ListItem from "./ListItem";
import { filterBySearch } from "@/code/sort_ingredients";
import { useTranslation } from "react-i18next";
import SearchBar from "../SearchBar";
import { Categories } from "@/types/ingredients";

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
      <SearchBar
        search={search}
        setSearch={setSearch}
        defaultCollapsedCategories={defaultCollapsedCategories}
        setCollapsedCategories={setCollapsedCategories}
      />

      <SectionList
        keyboardShouldPersistTaps="always"
        sections={filterBySearch(search, categories, collapsedCategories)}
        renderItem={({ item }) => (
          <ListItem
            ingredient={item}
            updateCategory={(c) => {
              if (c == item.category) {
                return;
              }
              let newCategories = { ...categories };
              newCategories[c].push({ ...item, category: c });
              newCategories[item.category] = newCategories[
                item.category
              ].filter((i) => i.name != item.name);
              setCategories(newCategories);
            }}
            updateDesc={(d: string) => {
              let newCategories = { ...categories };
              newCategories[item.category].find(
                (i) => i.name == item.name
              )!.desc = d;
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
