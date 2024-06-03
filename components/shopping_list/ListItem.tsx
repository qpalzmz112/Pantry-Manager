import { Text, View, Pressable } from "react-native";
import { useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import CheckBox from "./CheckBox";
import ListItemDate from "../ListItemDate";
import { Item } from "@/types/shopping_list";
import DeleteSomethingModal from "../DeleteSomethingModal";
import ChangeDateModal from "../ChangeDateModal";
import ChangeCategoryModal from "../ChangeCategoryModal";
import QuantitySetter from "../ingredients_page/add_ingredient_modal/QuantitySetter";
import { useTranslation } from "react-i18next";
import { date_to_display_string } from "@/code/date_utils";

export default function ListItem({
  item,
  updateItem,
}: {
  item: Item;
  updateItem: (itemName: string, field: string, value: any) => void;
}) {
  const { t } = useTranslation();
  const displayDate = date_to_display_string(item.date);

  let { isPurchased } = item;

  const [showingDelete, setShowingDelete] = useState(false);
  const [showDateModal, setShowDateModal] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);

  return (
    <Pressable
      onPress={() => updateItem(item.name, "isPurchased", !isPurchased)}
      onLongPress={() => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
        setShowCategoryModal(true);
      }}
    >
      <View
        className={`flex-row items-center p-2 mx-1 mb-2 rounded-xl ${
          isPurchased ? "bg-black opacity-40" : "bg-white"
        }`}
      >
        <View className="flex-col">
          <View className="flex-row">
            <Text className="text-xl mr-3">{item.name}</Text>
            {item.isRecurring && (
              <MaterialIcons name="loop" size={22} color="black" />
            )}
          </View>

          <Text className="text-gray-500">
            {item.category ? item.category : t("uncategorized")}
          </Text>

          <View className={`flex-row ${item.date ? "mt-1" : ""}`}>
            <QuantitySetter
              qty={item.qty}
              setQty={(n) => updateItem(item.name, "qty", n)}
              inList={true}
            />

            <ListItemDate
              date={displayDate}
              showModal={setShowDateModal}
              isGrocery={item.isGrocery}
            />
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
          givenDate={item.date}
          addDate={(d) => {
            updateItem(item.name, "date", d);
          }}
          close={() => setShowDateModal(false)}
        />
      )}

      {showCategoryModal && (
        <ChangeCategoryModal
          save={(c) => updateItem(item.name, "category", c)}
          close={() => setShowCategoryModal(false)}
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
