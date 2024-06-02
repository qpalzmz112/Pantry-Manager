import { Text, View, Pressable } from "react-native";
import { useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { Ingredient } from "@/types/ingredients";
import string_to_date, { date_to_string } from "@/code/string_and_date";
import DeleteSomethingModal from "../DeleteSomethingModal";
import ChangeDateModal from "../ChangeDateModal";
import ChangeCategoryModal from "../ChangeCategoryModal";
import QuantitySetter from "./add_ingredient_modal/QuantitySetter";
import ListItemDate from "../ListItemDate";
import * as Haptics from "expo-haptics";

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
  updateDate: (d: Date | null) => void;
  deleteIngredient: (n: string) => void;
}) {
  const [showingDelete, setShowingDelete] = useState(false);
  const [showDateModal, setShowDateModal] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);

  let { useByDate } = ingredient;
  let useByText = useByDate ? date_to_string(useByDate) : "";

  let bgColor = "bg-white";
  if (useByDate) {
    let num = new Date(useByDate).valueOf();
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

              <ListItemDate date={useByText} showModal={setShowDateModal} />
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
          givenDate={useByText.slice(0, 6) + useByText.slice(8, 10)}
          addDate={(date) => {
            updateDate(string_to_date(date));
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
            date: "",
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
