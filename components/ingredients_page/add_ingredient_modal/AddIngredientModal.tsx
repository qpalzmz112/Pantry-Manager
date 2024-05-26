import {
  Text,
  Modal,
  Pressable,
  ScrollView,
  Keyboard,
  View,
} from "react-native";
import { useState } from "react";
import { Categories } from "@/types/ingredients";
import LabelledTextInput from "./LabelledTextInput";
import DateInput from "./DateInput";
import Category from "./Category";
import QuantitySetter from "./QuantitySetter";
import AddIngredientButtonPair from "./AddIngredientButtonPair";
import CloseButton from "./CloseButton";

export default function AddIngredientModal({
  close,
  categories,
  setCategories,
}: {
  close: () => void;
  categories: Categories;
  setCategories: (c: Categories) => void;
}) {
  const [name, onChangeName] = useState("");
  const [category, onChangeCategory] = useState("");
  const [showCategories, setShowCategories] = useState(false);

  const emptyDate = "MM-DD-YY";
  const [date, onChangeDate] = useState(emptyDate);

  const [qty, setQty] = useState(1);

  const [errorMessage, setErrorMessage] = useState("");

  let matching_categories = showCategories
    ? Object.keys(categories).filter(
        (name) =>
          name.toLowerCase().includes(category.toLowerCase()) && name != ""
      )
    : [];

  const ingredientNameExists = () => {
    let res = false;
    Object.keys(categories).map((c) => {
      categories[c].map((ingredient) => {
        if (ingredient.name == name) {
          res = true;
        }
      });
    });
    return res;
  };

  const canAddIngredientCheck = () => {
    if (name == "") {
      setErrorMessage("Please enter a name.");
      return false;
    } else if (ingredientNameExists()) {
      setErrorMessage("You've already added an ingredient with this name.");
      return false;
    } else if (category != "" && !Object.keys(categories).includes(category)) {
      setErrorMessage(
        "Please enter the name of an existing category or leave the category field blank."
      );
      return false;
    } else if (date.length > 0 && date.length < 8) {
      setErrorMessage("Please enter a full date or no date.");
      return false;
    }
    return true;
  };

  return (
    <Modal transparent={false} onRequestClose={close}>
      <ScrollView
        className="w-[100vw] h-[100vh] bg-gray-100 flex-col"
        contentContainerStyle={{
          paddingTop: 225,
          alignItems: "center",
          justifyContent: "center",
        }}
        keyboardShouldPersistTaps="always"
      >
        <LabelledTextInput
          labelText="Item name:"
          inputText={name}
          onChangeText={(text) => {
            onChangeName(text);
            setErrorMessage("");
          }}
        />

        <LabelledTextInput
          labelText="Category (optional):"
          inputText={category}
          onChangeText={(text) => {
            onChangeCategory(text);
            setErrorMessage("");
          }}
          onPress={() => {
            setShowCategories(true);
            onChangeCategory("");
            setErrorMessage("");
          }}
          onEndEditing={() => {
            setShowCategories(false);
          }}
        />

        {showCategories && matching_categories.length > 0 && (
          <View className="w-[80vw] flex-row flex-wrap">
            {matching_categories.map((name) => (
              <Category
                key={name}
                name={name}
                onChangeCategory={onChangeCategory}
                deleteCategory={() => {
                  let c = { ...categories };
                  c[name].map((i) => c[""].push({ ...i, category: "" }));
                  delete c[name];
                  setCategories(c);
                }}
              />
            ))}
          </View>
        )}

        {showCategories &&
          matching_categories.length == 0 &&
          category.length > 0 && (
            <Pressable
              className="bg-gray-300 p-2 m-1 rounded-lg"
              onPress={() => {
                Keyboard.dismiss();
                setCategories({ ...categories, [category]: [] });
              }}
            >
              <Text className="text-xl">Add new category: {category}</Text>
            </Pressable>
          )}

        <DateInput
          date={date}
          onChangeDate={onChangeDate}
          setErrorMessage={setErrorMessage}
          emptyDate={emptyDate}
        />

        <QuantitySetter qty={qty} setQty={setQty} />

        <AddIngredientButtonPair
          errorMessage={errorMessage}
          canAddCheck={canAddIngredientCheck}
          addIngredient={() => {
            let month, day, year;
            [month, day, year] = date.split("-");
            let newDate =
              date == "" || date == emptyDate
                ? null
                : new Date(
                    2000 + parseInt(year),
                    parseInt(month) - 1,
                    parseInt(day)
                  );
            let c = { ...categories };
            c[category].push({
              name: name,
              qty: qty,
              useByDate: newDate,
              category: category,
            });
            setCategories(c);
            onChangeName("");
            onChangeCategory("");
            setQty(1);
            onChangeDate(emptyDate);
            setErrorMessage("Success!");
          }}
          close={close}
        />

        <CloseButton close={close} />
      </ScrollView>
    </Modal>
  );
}
