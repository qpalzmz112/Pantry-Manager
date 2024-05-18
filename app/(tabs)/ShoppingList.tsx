import { View, SectionList, Text } from "react-native";
import { useState, useEffect } from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CreateButton, AddItemModal, ListItem } from "@/components/index";
import { Item } from "@/types/shopping_list";

const itemsStorageKey = "items";
const sortItemsByPurchased = (item1: Item, item2: Item) => {
  if (item1.isPurchased == item2.isPurchased) {
    return 0;
  } else if (item2.isPurchased) {
    return -1;
  } else {
    return 1;
  }
};

const storeItems = async (items: Item[]) => {
  try {
    const jsonItems = JSON.stringify(items);
    await AsyncStorage.setItem(itemsStorageKey, jsonItems);
  } catch (e) {
    console.log(e);
  }
};

const getItems = async () => {
  try {
    const jsonItems = await AsyncStorage.getItem(itemsStorageKey);
    return jsonItems != null ? JSON.parse(jsonItems) : [];
  } catch (e) {
    console.log(e);
  }
};

export default function ShoppingList() {
  const [modalVisible, setModalVisible] = useState(false);
  const [items, updateItems] = useState<Item[]>([]);
  if (items.length == 0) {
    getItems().then((val) => {
      if (val.length > 0) {
        updateItems(val);
      }
    });
  }

  useEffect(() => {
    storeItems(items);
  }, [items]);

  const setPurchased = (itemName: string) => {
    const newItems = items.map((item) => {
      if (item.name == itemName) {
        return { ...item, isPurchased: !item.isPurchased };
      }
      return item;
    });
    updateItems(newItems);
  };

  // todo: allow collapsing grocery + non-grocery items
  // add an (i) button next to recurring purchase explaining its purpose
  // add delete item button, item quantities
  // style list items

  return (
    <View>
      <StatusBar hidden={false} style="dark" />
      <Stack.Screen
        options={{
          headerRight: () => (
            <CreateButton
              onPress={() => {
                setModalVisible(true);
              }}
            />
          ),
        }}
      />

      <SectionList
        sections={[
          {
            title: "Groceries",
            data: items
              .filter((item) => item.isGrocery)
              .sort(sortItemsByPurchased),
          },
          {
            title: "Non-Grocery Items",
            data: items
              .filter((item) => !item.isGrocery)
              .sort(sortItemsByPurchased),
          },
        ]}
        renderItem={({ item }) => (
          <ListItem item={item} setPurchased={setPurchased} />
        )}
        renderSectionHeader={({ section: { title } }) => (
          <Text className="text-xl font-medium text-center border-b-2 py-2 bg-slate-300">
            {title}
          </Text>
        )}
        ItemSeparatorComponent={() => (
          <View className="w-max bg-gray-400 h-[.3vh]" />
        )}
        renderSectionFooter={() => (
          <View className="w-max bg-gray-500 h-[.3vh]" />
        )}
      />

      {modalVisible ? (
        <AddItemModal
          close={() => {
            setModalVisible(false);
          }}
          addItem={(item: Item) => {
            updateItems([...items, item]);
          }}
          nameAlreadyExists={(name) =>
            items.map((item) => item.name).includes(name, 0)
          }
        />
      ) : null}
    </View>
  );
}
