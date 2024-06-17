import { SectionList, Pressable, Text, View } from "react-native";
import { useState, useContext, useEffect } from "react";
import { CategoryContext } from "@/code/data_context";
import * as Haptics from "expo-haptics";
import { Entypo } from "@expo/vector-icons";
import { filterBySearch, makeMissingIngredientDict } from "@/code/recipe_utils";
import { useTranslation } from "react-i18next";
import { Recipes } from "@/types/recipe";
import SearchBar from "../SearchBar";
import ListItem from "./ListItem";
import CheckBox from "../shopping_list/CheckBox";

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
  const [sortByIngredients, setSortByIngredients] = useState(false);

  const { data: categories } = useContext(CategoryContext);
  const [recipesToMissingIngredients, setRecipesToMissingIngredients] =
    useState<{ [name: string]: number }>(
      makeMissingIngredientDict(categories, recipes)
    );

  useEffect(() => {
    setRecipesToMissingIngredients(
      makeMissingIngredientDict(categories, recipes)
    );
  }, [recipes, categories]);

  return (
    <View className="h-[79vh]">
      <SearchBar
        search={search}
        setSearch={setSearch}
        defaultCollapsedCategories={defaultCollapsedCategories}
        setCollapsedCategories={setCollapsedCategories}
      />

      <View className="bg-white rounded-lg p-2 flex-row items-center justify-center gap-x-8">
        <Text>{t("sort_recipes_by_ingredients")}</Text>
        <View className="flex justify-center items-center">
          <CheckBox
            onPress={() => setSortByIngredients(!sortByIngredients)}
            checked={sortByIngredients}
          />
        </View>
      </View>

      <SectionList
        keyboardShouldPersistTaps="always"
        sections={filterBySearch(
          search,
          recipes,
          collapsedCategories,
          sortByIngredients ? recipesToMissingIngredients : undefined
        )}
        renderItem={({ item }) => (
          <ListItem
            recipe={item}
            missingIngredients={recipesToMissingIngredients[item.name]}
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
