import { Text, View, Pressable, Modal } from "react-native";
import { useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import CheckBox from "./CheckBox";
import { Item } from "@/types/shopping_list";
import DeleteSomethingModal from "../DeleteSomethingModal";

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
        <Text className="text-xl">{item.name}</Text>

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
        <DeleteSomethingModal
          name={item.name}
          type="item"
          deleteThing={() => updateItem(item.name, "", null)}
          close={() => setShowingDelete(false)}
        />
      )}
    </Pressable>
  );
}
