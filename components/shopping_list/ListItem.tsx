import { Text, View, Pressable } from "react-native";
import { useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import CheckBox from "./CheckBox";
import { Item } from "@/types/shopping_list";
import DeleteSomethingModal from "../DeleteSomethingModal";
import ChangeDateModal from "../ChangeDateModal";

export default function ListItem({
  item,
  updateItem,
}: {
  item: Item;
  updateItem: (itemName: string, field: string, value: any) => void;
}) {
  let { isPurchased } = item;

  const [showingDelete, setShowingDelete] = useState(false);
  const [showDateModal, setShowDateModal] = useState(false);

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

        {item.date ? (
          <Text
            onLongPress={() => {
              setShowDateModal(true);
            }}
            className="mx-4"
          >
            Use by: {item.date}
          </Text>
        ) : item.isGrocery ? (
          <Pressable
            className="mx-4 bg-gray-200 rounded-lg p-1"
            onPress={() => setShowDateModal(true)}
          >
            <Text className="text-center">Add use by date</Text>
          </Pressable>
        ) : null}

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

      {showDateModal && (
        <ChangeDateModal
          addDate={(d) => {
            updateItem(item.name, "date", d);
          }}
          close={() => setShowDateModal(false)}
        />
      )}

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
