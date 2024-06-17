import { FlatList, View, Text } from "react-native";
import { useState, useContext, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Entypo } from "@expo/vector-icons";
import { ItemContext, CategoryContext } from "@/code/data_context";
import LabelledTextInput from "@/components/ingredients_page/add_ingredient_modal/LabelledTextInput";
import RecipeIngredient from "./RecipeIngredient";
import Button from "@/components/Button";
import { RecipeIngredient as RecipeIngredientT } from "@/types/recipe";
import {
  missingIngredients,
  ingredientsInShoppingList,
} from "@/code/recipe_utils";
import * as Haptics from "expo-haptics";

export default function RecipeIngredientList({
  ingredients,
  setIngredients,
  doToast,
}: {
  ingredients: RecipeIngredientT[];
  setIngredients: (s: RecipeIngredientT[]) => void;
  doToast: (n: number) => void;
}) {
  let { t } = useTranslation();
  const [input, setInput] = useState("");
  const [showIngredients, setShowIngredients] = useState(true);

  const { data: categories, update: setCategories } =
    useContext(CategoryContext);

  const { data: items, update: setItems } = useContext(ItemContext);

  const [inShoppingList, setInShoppingList] = useState<RecipeIngredientT[]>(
    ingredientsInShoppingList(items, ingredients)
  );

  const [missingIngredientList, setMissingIngredientList] = useState<
    RecipeIngredientT[]
  >(missingIngredients(categories, ingredients, inShoppingList));

  useEffect(
    () => setInShoppingList(ingredientsInShoppingList(items, ingredients)),
    [ingredients, items]
  );
  useEffect(
    () =>
      setMissingIngredientList(
        missingIngredients(categories, ingredients, inShoppingList)
      ),
    [inShoppingList, ingredients]
  );

  const addMissingIngredients = () => {
    let newItems = [...items];
    missingIngredientList.map((i) =>
      newItems.push({
        name: i.name,
        desc: i.desc,
        category: "",
        date: null,
        isGrocery: true,
        isRecurring: false,
        isPurchased: false,
      })
    );
    setItems(newItems);
    doToast(3);
  };

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
            if (ingredients.map((i) => i.name).includes(input)) {
              return;
            }
            setIngredients([...ingredients, { name: input, desc: "" }]);
            setInput("");
            setShowIngredients(true);
          }}
          paddingTop="pt-0"
        />
        <FlatList
          className="bg-white rounded-lg mt-2"
          data={
            ingredients.length > 0
              ? [{ name: "", desc: "" }].concat(
                  showIngredients ? ingredients : []
                )
              : []
          }
          renderItem={({ item, index }) => {
            if (index == 0) {
              return (
                <View
                  className={`flex-row items-center ${
                    showIngredients ? "justify-center" : ""
                  }`}
                >
                  <Button
                    text={
                      <Entypo
                        name={
                          showIngredients ? "chevron-down" : "chevron-right"
                        }
                        size={26}
                        color="black"
                      />
                    }
                    pressableClass={
                      showIngredients ? "absolute left-0" : "py-2"
                    }
                    onPress={() => {
                      setShowIngredients(!showIngredients);
                      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                    }}
                  />
                  {showIngredients && (
                    <Button
                      text={t("add_recipe_ingredients")}
                      textClass="text-center"
                      pressableClass="bg-gray-200 p-1 rounded-lg m-2"
                      pressedClass="bg-gray-300"
                      onPress={() => addMissingIngredients()}
                    />
                  )}
                </View>
              );
            }
            return (
              <RecipeIngredient
                inShoppingList={inShoppingList
                  .map((i) => i.name)
                  .includes(item.name)}
                missing={missingIngredientList
                  .map((i) => i.name)
                  .includes(item.name)}
                name={item.name}
                desc={item.desc}
                setDesc={(d: string) => {
                  let newIngredients = [...ingredients];
                  newIngredients.find((i) => i.name == item.name)!.desc = d;
                  setIngredients(newIngredients);
                }}
                deleteIngredient={() =>
                  setIngredients(ingredients.filter((i) => i != item))
                }
              />
            );
          }}
        />
      </View>
      {showIngredients && (
        <View className="flex-row gap-2 mt-2">
          <Text className="bg-amber-200 p-2 rounded-lg text-center flex-1">
            {t("in_list")}
          </Text>
          <Text className="bg-red-300 p-2 rounded-lg text-center align-middle flex-1">
            {t("missing")}
          </Text>
        </View>
      )}
    </>
  );
}
