import { Text, View, Pressable } from "react-native";
import { useState } from "react";
import * as Haptics from "expo-haptics";
import { AntDesign } from "@expo/vector-icons";
import CheckBox from "./CheckBox";
import { Item } from "@/types/shopping_list";
import DeleteSomethingModal from "../DeleteSomethingModal";
import ChangeDateModal from "../ChangeDateModal";
import QuantitySetter from "../ingredients_page/add_ingredient_modal/QuantitySetter";

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
        className={`flex-row items-center p-2 mx-1 mb-2 rounded-xl ${
          isPurchased ? "bg-black opacity-40" : "bg-white"
        }`}
      >
        <View className="flex-col">
          <Text className="text-xl mr-3 pb-1">{item.name}</Text>

          <View className="flex-row">
            <QuantitySetter
              qty={item.qty}
              setQty={(n) => updateItem(item.name, "qty", n)}
              inList={true}
            />

            {item.date ? (
              <Text
                onLongPress={() => {
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
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
          </View>
        </View>
        <View className="absolute right-2 flex-row items-center">
          <CheckBox
            checked={isPurchased}
            onPress={() => updateItem(item.name, "isPurchased", !isPurchased)}
          />
          <Pressable
            className="pl-2"
            onPress={() => setShowingDelete(!showingDelete)}
          >
            <AntDesign name="delete" size={24} color="black" />
          </Pressable>
        </View>
      </View>

      {showDateModal && (
        <ChangeDateModal
          givenDate={
            item.date
              ? item.date.slice(0, 6) + item.date.slice(8, 10)
              : undefined
          }
          addDate={(d) => {
            updateItem(
              item.name,
              "date",
              d == "" || d == "MM-DD-YY"
                ? ""
                : d.slice(0, 6) + "20" + d.slice(6, 8)
            );
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
