import { View, Text, Pressable, Keyboard } from "react-native";
import Category from "./Category";
import { Categories } from "@/types/ingredients";

export default function CategoryList({
  category,
  categories,
  matching_categories,
  onChangeCategory,
  setCategories,
}: {
  category: string;
  categories: Categories;
  matching_categories: string[];
  onChangeCategory: (c: string) => void;
  setCategories: (c: Categories) => void;
}) {
  if (matching_categories.length > 0) {
    return (
      <View className="w-[80vw] flex-row flex-wrap">
        {matching_categories.map((name) => (
          <Category
            key={name}
            name={name}
            onChangeCategory={onChangeCategory}
            deleteCategory={() => {
              let c = { ...categories };
              c[name].map((i) => c[""].push({ ...i, category: "" }));
              delete c[name];
              setCategories(c);
            }}
          />
        ))}
      </View>
    );
  } else if (category.length > 0) {
    return (
      <Pressable
        className="bg-gray-300 p-2 m-1 rounded-lg"
        onPress={() => {
          Keyboard.dismiss();
          let c = { ...categories };
          c = { ...categories, [category]: [] };
          setCategories(c);
        }}
      >
        <Text className="text-xl">Add new category: {category}</Text>
      </Pressable>
    );
  }
}
