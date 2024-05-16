import { Text, View } from "react-native";
import { useState } from "react";
import CheckBox from "./CheckBox";
import { Item } from "@/types/shopping_list";

export default function ListItem({ item }: { item: Item }) {
  const [checked, setChecked] = useState(false);

  return (
    <View className="flex-row items-center py-4">
      <Text>{item.name}</Text>
      <CheckBox
        className="absolute right-2"
        checked={checked}
        onPress={() => {
          setChecked(!checked);
        }}
      />
    </View>
  );
}
