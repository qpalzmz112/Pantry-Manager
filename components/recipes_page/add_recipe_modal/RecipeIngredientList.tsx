import { FlatList, View } from "react-native";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Entypo } from "@expo/vector-icons";
import LabelledTextInput from "@/components/ingredients_page/add_ingredient_modal/LabelledTextInput";
import RecipeIngredient from "./RecipeIngredient";
import Button from "@/components/Button";

export default function RecipeIngredientList({
  ingredients,
  setIngredients,
}: {
  ingredients: string[];
  setIngredients: (s: string[]) => void;
}) {
  let { t } = useTranslation();
  let [input, setInput] = useState("");
  let [showIngredients, setShowIngredients] = useState(true);

  return (
    <>
      <View className="max-h-[45vh] w-[80vw] mt-4 rounded-lg">
        <LabelledTextInput
          labelText={t("recipe_ingredients")}
          placeholder={t("add_recipe_ingredient")}
          inputText={input}
          onChangeText={setInput}
          onSubmitEditing={() => {
            if (input == "") {
              return;
            }
            if (ingredients.includes(input)) {
              return;
            }
            setIngredients([...ingredients, input]);
            setInput("");
            setShowIngredients(true);
          }}
          paddingTop="pt-0"
        />
        <FlatList
          className="bg-white rounded-lg mt-2"
          data={
            ingredients.length > 0
              ? ["button"].concat(showIngredients ? ingredients : [])
              : []
          }
          renderItem={({ item, index }) => {
            if (index == 0) {
              return (
                <Button
                  text={
                    <Entypo
                      name={showIngredients ? "chevron-down" : "chevron-right"}
                      size={24}
                      color="black"
                    />
                  }
                  onPress={() => setShowIngredients(!showIngredients)}
                />
              );
            }
            return (
              <RecipeIngredient
                name={item}
                deleteIngredient={() =>
                  setIngredients(ingredients.filter((i) => i != item))
                }
              />
            );
          }}
        />
      </View>
    </>
  );
}
