import { Text, View, Pressable } from "react-native";
import { useState } from "react";
import * as Haptics from "expo-haptics";
import { AntDesign } from "@expo/vector-icons";
import { Ingredient } from "@/types/ingredients";
import DeleteSomethingModal from "../DeleteSomethingModal";
import ChangeDateModal from "../ChangeDateModal";
import QuantitySetter from "./add_ingredient_modal/QuantitySetter";

export default function ListItem({
  ingredient,
  updateQty,
  updateDate,
  deleteIngredient,
}: {
  ingredient: Ingredient;
  updateQty: (n: number) => void;
  updateDate: (d: Date | null) => void;
  deleteIngredient: (n: string) => void;
}) {
  const [showingDelete, setShowingDelete] = useState(false);
  const [showDateModal, setShowDateModal] = useState(false);

  let { useByDate } = ingredient;
  let useByText;
  if (useByDate == null) {
    useByText = "";
  } else {
    if (typeof useByDate == "string") {
      // JSON can't serialize dates
      useByDate = new Date(useByDate);
    }
    useByText = `${
      useByDate.getMonth() + 1
    }-${useByDate.getDate()}-${useByDate.getFullYear()}`;
  }

  return (
    <>
      <View className="flex-row items-center p-2 mx-1 mb-2 rounded-xl bg-white">
        <View className="flex-col">
          <Text className="text-xl">{ingredient.name}</Text>

          <View className="flex-row pt-1 items-center">
            <QuantitySetter
              qty={ingredient.qty}
              setQty={(n) => updateQty(n)}
              inList={true}
            />

            {useByText ? (
              <Text
                onLongPress={() => {
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
                  setShowDateModal(true);
                }}
                className="mx-4"
              >
                Use by: {useByText}
              </Text>
            ) : (
              <Pressable
                className="mx-4 bg-gray-200 rounded-lg p-1"
                onPress={() => setShowDateModal(true)}
              >
                <Text className="text-center">Add use by date</Text>
              </Pressable>
            )}
          </View>
        </View>

        <Pressable
          className="absolute right-4"
          onPress={() => setShowingDelete(!showingDelete)}
        >
          <AntDesign name="delete" size={22} color="black" />
        </Pressable>
      </View>

      {showDateModal && (
        <ChangeDateModal
          givenDate={useByText.slice(0, 6) + useByText.slice(8, 10)}
          addDate={(date) => {
            let month, day, year;
            [month, day, year] = date.split("-");
            let newDate =
              date == "" || date == "MM-DD-YY"
                ? null
                : new Date(
                    2000 + parseInt(year),
                    parseInt(month) - 1,
                    parseInt(day)
                  );
            updateDate(newDate);
          }}
          close={() => setShowDateModal(false)}
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
