import { Modal, ScrollView } from "react-native";
import { useState, useEffect } from "react";
import { RootSiblingParent } from "react-native-root-siblings";
import { Categories } from "@/types/ingredients";
import LabelledTextInput from "./LabelledTextInput";
import DateInput from "./DateInput";
import CategoryList from "./CategoryList";
import QuantitySetter from "./QuantitySetter";
import AddIngredientButtonPair from "./AddIngredientButtonPair";
import CloseButton from "../../CloseButton";
import string_to_date from "@/code/string_and_date";
import toast from "@/code/toast";

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

  const [date, onChangeDate] = useState("");

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

  // 0: inactive, 1: inactive but show toast after closing modal, 2: active and show toast over modal
  const [rootActive, setRootActive] = useState(0);
  useEffect(() => {
    if (rootActive != 0) {
      toast("Ingredient added!");
      if (rootActive == 1) {
        close();
      }
      setRootActive(0);
    }
  }, [rootActive]);

  return (
    <Modal transparent={false} onRequestClose={close}>
      <RootSiblingParent inactive={rootActive == 2 ? false : true}>
        <ScrollView
          className="w-[100vw] h-[100vh] bg-gray-100 flex-col"
          contentContainerStyle={{
            paddingTop: 175,
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

          {showCategories && (
            <CategoryList
              category={category}
              categories={categories}
              matching_categories={matching_categories}
              onChangeCategory={onChangeCategory}
              setCategories={setCategories}
            />
          )}

          <DateInput
            date={date}
            onChangeDate={onChangeDate}
            setErrorMessage={setErrorMessage}
          />

          <QuantitySetter qty={qty} setQty={setQty} inList={false} />

          <AddIngredientButtonPair
            errorMessage={errorMessage}
            canAddCheck={canAddIngredientCheck}
            addIngredient={() => {
              let newDate = string_to_date(date);
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
              onChangeDate("");
            }}
            close={close}
            doToast={(n: number) => {
              setRootActive(n);
            }}
          />

          <CloseButton close={close} />
        </ScrollView>
      </RootSiblingParent>
    </Modal>
  );
}
