import { Text, View, Modal } from "react-native";
import { useState, useContext } from "react";
import toast from "@/code/toast";
import { ItemContext, CategoryContext } from "@/code/data_context";
import {} from "@/code/date_utils";
import { Item } from "@/types/shopping_list";
import CloseButton from "../CloseButton";
import Button from "../Button";
import { useTranslation } from "react-i18next";

export default function AddItemModal({ close }: { close: () => void }) {
  const { t } = useTranslation();
  const [status, setStatus] = useState("");
  const { data: items, update: setItems } = useContext(ItemContext);
  const { data: categories, update: setCategories } =
    useContext(CategoryContext);

  const ingredientNameExists = (name: string) => {
    let res = null;
    Object.keys(categories).map((c) => {
      categories[c].map((ingredient, index) => {
        if (ingredient.name == name) {
          res = [c, index];
        }
      });
    });
    return res;
  };

  const addPurchased = (i: Item[]) => {
    let newCategories = { ...categories };
    i.map((item) => {
      let x = ingredientNameExists(item.name);
      if (x != null) {
        newCategories[x[0]][x[1]].qty += item.qty;
      } else {
        newCategories[item.category].push({
          name: item.name,
          qty: item.qty,
          useByDate: item.date,
          category: item.category,
        });
      }
    });
    setCategories(newCategories);
  };

  const updateItems = (toRemove: Item[], toUpdate: Item[]) => {
    let newItems = [...items];
    toRemove.map(
      (item) => (newItems = newItems.filter((i) => i.name != item.name))
    );
    toUpdate.map((item) => {
      newItems = newItems.map((i) => {
        if (i.name == item.name) {
          return {
            name: i.name,
            category: i.category,
            isPurchased: false,
            isGrocery: i.isGrocery,
            isRecurring: true,
            date: null,
            qty: i.qty,
          };
        } else {
          return i;
        }
      });
    });
    setItems(newItems);
  };

  const clearList = () => {
    let purchased = items.filter((i) => i.isPurchased && i.isGrocery); // all of these are getting added to categories
    let toRemove = purchased.filter((i) => !i.isRecurring); // all of these are getting removed from items
    let toUpdate = purchased.filter((i) => i.isRecurring); // all of these are staying but getting updated

    addPurchased(purchased);
    updateItems(toRemove, toUpdate);

    close();
    toast(t("clear_list_success"));
  };

  return (
    <Modal transparent={false} onRequestClose={close}>
      <View className="w-[100vw] h-[100vh] bg-gray-100 flex-col justify-center items-center">
        <Text className="w-[80vw] text-lg text-center mb-6">
          {t("clear_list_info_start")} {"\n\n"} {t("clear_list_info_end")}
        </Text>
        <View className="flex-row">
          <Button
            text={t("yes")}
            pressableClass="bg-gray-300 p-3 m-3 rounded-2xl"
            pressedClass="bg-gray-400"
            textClass="text-xl"
            onPress={() => clearList()}
          />
          <Button
            text={t("no")}
            pressableClass="bg-gray-300 p-3 m-3 rounded-2xl"
            pressedClass="bg-gray-400"
            textClass="text-xl"
            onPress={close}
          />
        </View>
        {status && <Text className="text-xl">{status}</Text>}
        <CloseButton close={close} />
      </View>
    </Modal>
  );
}
