import { Text, View, Pressable } from "react-native";
import { useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { Ingredient } from "@/types/ingredients";
import {
  date_to_display_string,
  string_to_date,
  date_to_Date,
  date_to_input_text,
} from "@/code/date_utils";
import DeleteSomethingModal from "../DeleteSomethingModal";
import ChangeDateModal from "../ChangeDateModal";
import ChangeCategoryModal from "../ChangeCategoryModal";
import QuantitySetter from "./add_ingredient_modal/QuantitySetter";
import ListItemDate from "../ListItemDate";
import * as Haptics from "expo-haptics";
import { useTranslation } from "react-i18next";

export default function ListItem({
  ingredient,
  updateCategory,
  updateQty,
  updateDate,
  deleteIngredient,
}: {
  ingredient: Ingredient;
  updateCategory: (c: string) => void;
  updateQty: (n: number) => void;
  updateDate: (d: any) => void;
  deleteIngredient: (n: string) => void;
}) {
  const { t } = useTranslation();
  const [showingDelete, setShowingDelete] = useState(false);
  const [showDateModal, setShowDateModal] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);

  let { useByDate } = ingredient;
  let dateDisplay = date_to_display_string(useByDate);
  const dateInputDate = date_to_input_text(useByDate);

  let bgColor = "bg-white";
  if (useByDate) {
    let num = date_to_Date(useByDate).valueOf();
    if (num < Date.now()) {
      bgColor = "bg-red-300";
    } else if (num < Date.now() + 7 * 24 * 60 * 60 * 1000) {
      bgColor = "bg-amber-200";
    }
  }

  return (
    <>
      <Pressable
        onLongPress={() => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
          setShowCategoryModal(true);
        }}
      >
        <View
          className={`flex-row items-center p-2 mx-1 mb-2 rounded-xl ${bgColor}`}
        >
          <View className="flex-col">
            <Text className="text-xl">{ingredient.name}</Text>

            <View className="flex-row pt-1 items-center">
              <QuantitySetter
                qty={ingredient.qty}
                setQty={(n) => updateQty(n)}
                inList={true}
              />

              <ListItemDate date={dateDisplay} showModal={setShowDateModal} />
            </View>
          </View>

          <Pressable
            className="absolute right-4"
            onPress={() => setShowingDelete(!showingDelete)}
          >
            <AntDesign name="delete" size={22} color="black" />
          </Pressable>
        </View>
      </Pressable>

      {showDateModal && (
        <ChangeDateModal
          givenDate={dateInputDate}
          addDate={(date) => {
            updateDate(date);
          }}
          close={() => setShowDateModal(false)}
        />
      )}

      {showCategoryModal && (
        <ChangeCategoryModal
          placeholder={ingredient.category}
          save={(c) => updateCategory(c)}
          close={() => setShowCategoryModal(false)}
        />
      )}

      {showingDelete && (
        <DeleteSomethingModal
          name={ingredient.name}
          type="ingredient"
          deleteThing={() => {
            deleteIngredient(ingredient.name);
          }}
          shoppingListItem={{
            name: ingredient.name,
            date: null,
            category: ingredient.category,
            qty: 1,
            isGrocery: true,
            isRecurring: false,
            isPurchased: false,
          }}
          close={() => {
            setShowingDelete(false);
          }}
        />
      )}
    </>
  );
}
