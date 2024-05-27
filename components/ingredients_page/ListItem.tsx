import { Text, View, Pressable, Modal } from "react-native";
import { useState } from "react";
import * as Haptics from "expo-haptics";
import { AntDesign } from "@expo/vector-icons";
import { Ingredient } from "@/types/ingredients";
import DeleteSomethingModal from "../DeleteSomethingModal";
import ChangeDateModal from "../ChangeDateModal";

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
      <View className="flex-row items-center p-2 bg-white">
        <View className="flex-col">
          <Text className="text-xl">{ingredient.name}</Text>

          <View className="flex-row pt-1 items-center">
            <Pressable
              className="pr-1"
              disabled={ingredient.qty == 1}
              onPress={() => updateQty(-1)}
            >
              <AntDesign
                name="minuscircleo"
                size={20}
                color={ingredient.qty == 1 ? "gray" : "black"}
              />
            </Pressable>
            <Text>{`Qty: ${ingredient.qty}`}</Text>
            <Pressable className="pl-1 pr-4" onPress={() => updateQty(1)}>
              <AntDesign name="pluscircleo" size={20} color="black" />
            </Pressable>

            {useByText ? (
              <Text
                onLongPress={() => {
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
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
          close={() => {
            setShowingDelete(false);
          }}
        />
      )}
    </>
  );
}
