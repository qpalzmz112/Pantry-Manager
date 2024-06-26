import { View, Text, Pressable, Keyboard, ScrollView } from "react-native";
import * as Haptics from "expo-haptics";
import Category from "./Category";

export default function CategoryList({
  category,
  categories,
  matching_categories,
  setCategory,
  setCategories,
}: {
  category: string;
  categories: any;
  matching_categories: string[];
  setCategory: (c: string) => void;
  setCategories: (c: any) => void;
}) {
  return (
    <ScrollView
      className="max-h-[25vh] bg-white rounded-lg max-w-[80vw] h-auto grow-0"
      keyboardShouldPersistTaps="always"
    >
      {matching_categories.length > 0 && (
        <View className="w-[80vw] flex-row flex-wrap">
          {matching_categories.map((name) => (
            <Category
              key={name}
              name={name}
              onChangeCategory={setCategory}
              deleteCategory={() => {
                let c = { ...categories };
                c[name].map((i: any) => c[""].push({ ...i, category: "" }));
                delete c[name];
                setCategories(c);
              }}
            />
          ))}
        </View>
      )}

      {category.length > 0 && !Object.keys(categories).includes(category) && (
        <Pressable
          className="bg-gray-300 p-2 m-1 rounded-lg"
          onPress={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
            Keyboard.dismiss();
            let c = { ...categories };
            c = { ...categories, [category]: [] };
            setCategories(c);
          }}
        >
          <Text className="text-xl">Add new category: {category}</Text>
        </Pressable>
      )}
    </ScrollView>
  );
}
