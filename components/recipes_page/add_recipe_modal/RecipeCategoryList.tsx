import { View, Text, Pressable, Keyboard } from "react-native";
import * as Haptics from "expo-haptics";
import Category from "@/components/ingredients_page/add_ingredient_modal/Category";
import { Recipes } from "@/types/recipe";

export default function RecipeCategoryList({
  category,
  recipes,
  matching_categories,
  setCategory,
  setRecipes,
}: {
  category: string;
  recipes: Recipes;
  matching_categories: string[];
  setCategory: (c: string) => void;
  setRecipes: (c: Recipes) => void;
}) {
  return (
    <>
      {matching_categories.length > 0 && (
        <View className="w-[80vw] flex-row flex-wrap">
          {matching_categories.map((name) => (
            <Category
              key={name}
              name={name}
              onChangeCategory={setCategory}
              deleteCategory={() => {
                let r = { ...recipes };
                r[name].map((i) => r[""].push({ ...i, category: "" }));
                delete r[name];
                setRecipes(r);
              }}
            />
          ))}
        </View>
      )}

      {category.length > 0 && !Object.keys(recipes).includes(category) && (
        <Pressable
          className="bg-gray-300 p-2 m-1 rounded-lg"
          onPress={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
            Keyboard.dismiss();
            let r = { ...recipes };
            r = { ...recipes, [category]: [] };
            setRecipes(r);
          }}
        >
          <Text className="text-xl">Add new category: {category}</Text>
        </Pressable>
      )}
    </>
  );
}
