import { Text, View, Modal } from "react-native";
import { useState, useContext } from "react";
import { ItemContext, CategoryContext } from "@/code/data_context";
import string_to_date from "@/code/string_to_date";
import { Item } from "@/types/shopping_list";
import CloseButton from "../CloseButton";
import Button from "../Button";

export default function AddItemModal({ close }: { close: () => void }) {
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

  const itemToIngredient = (item: Item) => {
    if (!item.isPurchased) {
      return;
    }
    if (item.isGrocery) {
      let newCategories = { ...categories };
      let x = ingredientNameExists(item.name);
      if (x != null) {
        newCategories[x[0]][x[1]].qty += item.qty;
      } else {
        let date = string_to_date(item.date);
        newCategories[item.category].push({
          name: item.name,
          qty: item.qty,
          useByDate: date,
          category: item.category,
        });
      }
      setCategories(newCategories);
    }

    let newItems = [...items];
    if (!item.isRecurring) {
      newItems = newItems.filter((i) => i.name != item.name);
    } else {
      newItems = newItems.map((i) => {
        if (i.name == item.name) {
          return {
            name: i.name,
            category: i.category,
            isPurchased: false,
            isGrocery: i.isGrocery,
            isRecurring: true,
            date: "",
            qty: i.qty,
          };
        } else {
          return i;
        }
      });
    }
    setItems(newItems);
  };

  const clearList = () => {
    items.map((i) => itemToIngredient(i));
    setStatus("Success!");
    setTimeout(() => close(), 1000);
  };

  return (
    <Modal transparent={false} onRequestClose={close}>
      <View className="w-[100vw] h-[100vh] bg-gray-100 flex-col justify-center items-center">
        <Text className="w-[80vw] text-lg text-center mb-6">
          Clear your shopping list? {"\n\n"} Your purchased grocery items will
          be moved to your ingredients list, but unpurchased items and recurring
          purchases will remain.
        </Text>
        <View className="flex-row">
          <Button
            text="Yes"
            pressableClass="bg-gray-300 p-3 m-3 rounded-2xl"
            pressedClass="bg-gray-400"
            textClass="text-xl"
            onPress={() => clearList()}
          />
          <Button
            text="No"
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
