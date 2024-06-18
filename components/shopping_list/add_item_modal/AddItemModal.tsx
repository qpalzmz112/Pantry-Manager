import {
  Text,
  View,
  Modal,
  Pressable,
  KeyboardAvoidingView,
} from "react-native";
import { useState, useContext, useEffect } from "react";
import { CategoryContext } from "@/code/data_context";
import { Feather } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Item } from "@/types/shopping_list";
import CheckBox from "../CheckBox";
import AddButtonPair from "../../AddButtonPair";
import LabelledTextInput from "@/components/ingredients_page/add_ingredient_modal/LabelledTextInput";
import CategoryList from "@/components/ingredients_page/add_ingredient_modal/CategoryList";
import QuantitySetter from "@/components/ingredients_page/add_ingredient_modal/QuantitySetter";
import CloseButton from "@/components/CloseButton";
import toast from "@/code/toast";
import { RootSiblingParent } from "react-native-root-siblings";
import { useTranslation } from "react-i18next";

export default function AddItemModal({
  close,
  addItem,
  nameAlreadyExists,
}: {
  close: () => void;
  addItem: (item: Item) => void;
  nameAlreadyExists: (name: string) => boolean;
}) {
  const { t } = useTranslation();
  const [itemName, onChangeItemName] = useState("");

  const [category, setCategory] = useState("");
  const [showCategories, setShowCategories] = useState(false);

  const [desc, setDesc] = useState("");

  const { data: categories, update: setCategories } =
    useContext(CategoryContext);

  const [isGrocery, setIsGrocery] = useState(true);
  const [isRecurring, setIsRecurring] = useState(false);
  const [showingInfo, setShowingInfo] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  let matching_categories = showCategories
    ? Object.keys(categories).filter(
        (name) =>
          name.toLowerCase().includes(category.toLowerCase()) && name != ""
      )
    : [];

  const canAddItemCheck = () => {
    if (nameAlreadyExists(itemName)) {
      setErrorMessage(t("error_name_exists"));
      return false;
    } else if (itemName.length == 0) {
      setErrorMessage(t("error_empty_name"));
      return false;
    } else if (category != "" && !Object.keys(categories).includes(category)) {
      setErrorMessage(t("error_category"));
      return false;
    }
    return true;
  };

  // 0: inactive, 1: inactive but show toast after closing modal, 2: active and show toast over modal
  const [rootActive, setRootActive] = useState(0);
  useEffect(() => {
    if (rootActive != 0) {
      toast(t("item_added"));
      if (rootActive == 1) {
        close();
      }
      setRootActive(0);
    }
  }, [rootActive]);

  return (
    <Modal transparent={false} onRequestClose={close}>
      <RootSiblingParent inactive={rootActive == 2 ? false : true}>
        <View className="w-[100vw] h-[100vh] bg-gray-100 flex-col justify-center items-center">
          <KeyboardAvoidingView
            behavior="position"
            contentContainerStyle={{
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <LabelledTextInput
              labelText={t("item_name")}
              inputText={itemName}
              onChangeText={(text) => {
                onChangeItemName(text);
                setErrorMessage("");
              }}
            />

            <LabelledTextInput
              labelText={t("item_desc")}
              inputText={desc}
              onChangeText={setDesc}
            />

            <LabelledTextInput
              labelText={t("category_input")}
              inputText={category}
              onChangeText={(text) => {
                setCategory(text);
                setErrorMessage("");
              }}
              onPress={() => {
                setShowCategories(true);
                setCategory("");
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
                setCategory={setCategory}
                setCategories={setCategories}
              />
            )}
          </KeyboardAvoidingView>

          <View className="w-[80vw] flex items-left mt-4">
            <Text>{t("is_grocery")}</Text>
            <CheckBox
              onPress={() => {
                setIsGrocery(!isGrocery);
              }}
              checked={isGrocery}
            ></CheckBox>
          </View>

          <View className="w-[80vw] flex items-left mt-4">
            <View className="flex-row">
              <Text>{t("is_recurring")}</Text>
              <Pressable onPress={() => setShowingInfo(!showingInfo)}>
                <Feather name="info" size={20} color="black" className="pl-2" />
              </Pressable>
            </View>

            {showingInfo && (
              <View className="bg-white p-2 my-1 rounded-lg flex">
                <Text
                  className="leading-6 text-center text-gray-500"
                  onPress={() => {
                    setShowingInfo(false);
                  }}
                >
                  {t("recurring_info")}
                </Text>
                <Text className="grow text-center">
                  {<MaterialIcons name="loop" size={24} color="gray" />}
                </Text>
              </View>
            )}

            <CheckBox
              onPress={() => {
                setIsRecurring(!isRecurring);
              }}
              checked={isRecurring}
            ></CheckBox>
          </View>

          <AddButtonPair
            type="item"
            errorMessage={errorMessage}
            canAddCheck={canAddItemCheck}
            add={() => {
              addItem({
                name: itemName,
                category: category,
                date: null,
                desc: desc,
                isGrocery: isGrocery,
                isRecurring: isRecurring,
                isPurchased: false,
              });
              onChangeItemName("");
              setIsGrocery(true);
              setIsRecurring(false);
            }}
            doToast={(n: number) => {
              setRootActive(n);
            }}
          />

          <CloseButton close={close} />
        </View>
      </RootSiblingParent>
    </Modal>
  );
}
