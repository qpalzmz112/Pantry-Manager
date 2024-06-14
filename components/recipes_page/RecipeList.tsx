import { SectionList, Pressable, Text, View } from "react-native";
import { useState } from "react";
import * as Haptics from "expo-haptics";
import { Entypo } from "@expo/vector-icons";
import { filterBySearch } from "@/code/recipe_utils";
import { useTranslation } from "react-i18next";
import { Recipes } from "@/types/recipe";
import SearchBar from "../SearchBar";
import ListItem from "./ListItem";

export default function RecipeList({
  recipes,
  setRecipes,
  setDeletingCategory,
}: {
  recipes: Recipes;
  setRecipes: (c: Recipes) => void;
  setDeletingCategory: (c: string) => void;
}) {
  const { t } = useTranslation();
  const defaultCollapsedCategories = Object.fromEntries(
    Object.entries(recipes).map((key) => [key, false])
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
        sections={filterBySearch(search, recipes, collapsedCategories)}
        renderItem={({ item }) => (
          <ListItem
            recipe={item}
            updateCategory={(c) => {
              if (c == item.category) {
                return;
              }
              let newRecipes = { ...recipes };
              if (!(c in newRecipes)) {
                newRecipes[c] = [];
              }
              newRecipes[c].push({ ...item, category: c });
              newRecipes[item.category] = newRecipes[item.category].filter(
                (i) => i.name != item.name
              );
              setRecipes(newRecipes);
            }}
            deleteRecipe={(name) => {
              let newRecipes = { ...recipes };
              newRecipes[item.category] = newRecipes[item.category].filter(
                (recipe) => recipe.name != name
              );
              setRecipes(newRecipes);
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
