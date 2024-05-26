import { View, SectionList, Pressable, Text } from "react-native";
import { useState } from "react";
import { Entypo } from "@expo/vector-icons";
import ListItem from "./ListItem";
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
  const [collapsedCategories, setCollapsedCategories] = useState(
    Object.fromEntries(Object.entries(categories).map((key) => [key, false]))
  );

  const DATA = Object.keys(categories)
    .filter((k) => categories[k].length > 0)
    .map((category) => {
      return {
        title: category,
        data: collapsedCategories[category] ? [] : categories[category],
      };
    });

  return (
    <SectionList
      sections={DATA}
      renderItem={({ item }) => (
        <ListItem
          ingredient={item}
          updateQty={(n) => {
            let newCategories = { ...categories };
            newCategories[item.category].find(
              (i) => i.name == item.name
            )!.qty += n;
            setCategories(newCategories);
          }}
          deleteIngredient={(name) => {
            let newCategories = { ...categories };
            newCategories[item.category] = newCategories[item.category].filter(
              (ingredient) => ingredient.name != name
            );
            setCategories(newCategories);
          }}
        />
      )}
      ItemSeparatorComponent={() => (
        <View className="w-max bg-gray-400 h-[.3vh]" />
      )}
      renderSectionHeader={({ section: { title } }) => (
        <Pressable
          onLongPress={() => {
            setDeletingCategory(title);
          }}
        >
          <Text className="text-xl font-medium text-center border-b-2 py-2 bg-slate-300">
            {title == "" ? "Uncategorized" : title}
          </Text>
          <Pressable
            className="absolute right-3 top-2"
            onPress={() => {
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
              color="black"
            />
          </Pressable>
        </Pressable>
      )}
    />
  );
}
