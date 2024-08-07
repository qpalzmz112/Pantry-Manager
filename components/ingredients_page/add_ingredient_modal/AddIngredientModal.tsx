import {
  Modal,
  ScrollView,
  KeyboardAvoidingView,
  Text,
  View,
} from "react-native";
import { useState, useEffect, useContext } from "react";
import { RootSiblingParent } from "react-native-root-siblings";
import { Categories } from "@/types/ingredients";
import { date } from "@/types/shopping_list";
import { NotificationsContext } from "@/code/notifications_context";
import LabelledTextInput from "./LabelledTextInput";
import DateInput from "./DateInput";
import CategoryList from "./CategoryList";
import AddButtonPair from "@/components/AddButtonPair";
import CloseButton from "../../CloseButton";
import toast from "@/code/toast";
import { useTranslation } from "react-i18next";
import { schedulePushNotification } from "@/code/notifications";

export default function AddIngredientModal({
  close,
  categories,
  setCategories,
}: {
  close: () => void;
  categories: Categories;
  setCategories: (c: Categories) => void;
}) {
  const { t } = useTranslation();

  const [name, onChangeName] = useState("");
  const [category, onChangeCategory] = useState("");
  const [showCategories, setShowCategories] = useState(false);

  const [date, setDate] = useState<date | null>(null);
  const [desc, setDesc] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  const { data: notifications, update: setNotifications } =
    useContext(NotificationsContext);

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
      setErrorMessage(t("error_ingredient_no_name"));
      return false;
    } else if (ingredientNameExists()) {
      setErrorMessage(t("error_ingredient_name_exists"));
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
      toast(t("toast_ingredient_added"));
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
            className="flex-col"
            contentContainerStyle={{
              alignItems: "center",
              justifyContent: "center",
            }}
            keyboardVerticalOffset={40}
          >
            <LabelledTextInput
              labelText={t("item_name")}
              inputText={name}
              onChangeText={(text) => {
                onChangeName(text);
                setErrorMessage("");
              }}
            />

            <LabelledTextInput
              labelText={t("item_desc")}
              inputText={desc}
              onChangeText={(text) => {
                setDesc(text);
              }}
            />

            <LabelledTextInput
              labelText={t("category_input")}
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
                setCategory={onChangeCategory}
                setCategories={setCategories}
              />
            )}
          </KeyboardAvoidingView>

          <DateInput date={date} onChangeDate={setDate} />

          {date && (
            <View className="flex-row gap-2 max-w-[80vw]">
              <Text className="bg-amber-200 p-2 rounded-lg text-center flex-1">
                {t("expiring_soon")}
              </Text>
              <Text className="bg-red-300 p-2 rounded-lg text-center flex-1">
                {t("expired")}
              </Text>
            </View>
          )}

          <AddButtonPair
            type="ingredient"
            errorMessage={errorMessage}
            canAddCheck={canAddIngredientCheck}
            add={() => {
              let c = { ...categories };
              c[category].push({
                name: name,
                desc: desc,
                useByDate: date,
                category: category,
              });
              // make appropriate notification if date != null
              if (date != null) {
                schedulePushNotification(name, date).then((val) => {
                  if (val == null) {
                    return;
                  }
                  let id = val[0];
                  let notif_date = val[1];
                  setNotifications({
                    ...notifications,
                    [name]: [id, `${notif_date}`],
                  });
                });
              }

              setCategories(c);
              onChangeName("");
              onChangeCategory("");
              setDesc("");
              setDate(null);
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
