import { Modal, View, Text } from "react-native";
import { useState, useContext } from "react";
import { CategoryContext } from "@/code/data_context";
import LabelledTextInput from "./ingredients_page/add_ingredient_modal/LabelledTextInput";
import Button from "./Button";
import CloseButton from "./CloseButton";
import CategoryList from "./ingredients_page/add_ingredient_modal/CategoryList";
import toast from "@/code/toast";
import { useTranslation } from "react-i18next";

interface props {
  placeholder?: string;
  save: (c: string) => void;
  close: () => void;
}

export default function ChangeCategoryModal({
  placeholder = "",
  save,
  close,
}: props) {
  const { t } = useTranslation();
  const { data: categories, update: setCategories } =
    useContext(CategoryContext);
  const [category, setCategory] = useState("");
  const [showCategories, setShowCategories] = useState(false);
  const [error, setError] = useState("");

  let matching_categories = showCategories
    ? Object.keys(categories).filter(
        (name) =>
          name.toLowerCase().includes(category.toLowerCase()) && name != ""
      )
    : [];

  return (
    <Modal animationType="slide" onRequestClose={close}>
      <View className="h-[100vh] w-[100vw] flex-col items-center justify-center">
        <LabelledTextInput
          labelText={t("category")}
          inputText={category}
          placeholder={placeholder}
          onChangeText={setCategory}
          onPress={() => {
            setShowCategories(true);
            setCategory("");
            setError("");
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
            onChangeCategory={setCategory}
            setCategories={setCategories}
          />
        )}

        <Button
          text={t("save")}
          textClass="text-xl"
          pressableClass="bg-gray-300 p-2 mt-6 rounded-lg"
          pressedClass="bg-gray-400"
          onPress={() => {
            if (category != "" && !Object.keys(categories).includes(category)) {
              setError(t("error_category"));
              return;
            }
            save(category);
            toast(t("category_updated"));
            close();
          }}
        />
        {error && <Text className="text-black pt-2 max-w-[80vw]">{error}</Text>}

        <CloseButton close={close} />
      </View>
    </Modal>
  );
}
