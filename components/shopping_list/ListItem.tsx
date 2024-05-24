import { Text, View, Pressable } from "react-native";
import { useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import CheckBox from "./CheckBox";
import { Item } from "@/types/shopping_list";

export default function ListItem({
  item,
  updateItem,
}: {
  item: Item;
  updateItem: (itemName: string, field: string, value: any) => void;
}) {
  let { isPurchased } = item;
  const [showingDelete, setShowingDelete] = useState(false);

  return (
    <Pressable
      onPress={() => updateItem(item.name, "isPurchased", !isPurchased)}
    >
      <View
        className={`flex-row items-center p-2 ${
          isPurchased ? "bg-black opacity-40" : "bg-white"
        }`}
      >
        <View className="flex-col">
          <Text className="text-xl">{item.name}</Text>
        </View>

        <View className="absolute right-2 flex-row">
          <CheckBox
            checked={isPurchased}
            onPress={() => updateItem(item.name, "isPurchased", !isPurchased)}
          />
          <Pressable
            className="pt-2 pl-2"
            onPress={() => setShowingDelete(!showingDelete)}
          >
            <AntDesign name="delete" size={20} color="black" />
          </Pressable>
        </View>
      </View>

      {showingDelete && (
        <View className="flex-col items-center py-2">
          <Text className="">Delete this item?</Text>
          <View className="flex-row">
            <Pressable
              className="border-b-2 border-gray-500 mx-2"
              onPress={() => updateItem(item.name, "", null)}
            >
              <Text style={{ paddingVertical: 2, paddingHorizontal: 10 }}>
                Yes
              </Text>
            </Pressable>
            <Pressable
              className="border-b-2 border-gray-500 mx-2"
              onPress={() => setShowingDelete(false)}
            >
              <Text style={{ paddingVertical: 2, paddingHorizontal: 10 }}>
                No
              </Text>
            </Pressable>
          </View>
        </View>
      )}
    </Pressable>
  );
}
