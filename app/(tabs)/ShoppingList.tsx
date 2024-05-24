import { View, SectionList, Text, Pressable } from "react-native";
import { useState, useEffect } from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Entypo } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CreateButton, AddItemModal, ListItem } from "@/components/index";
import { Item } from "@/types/shopping_list";
import { set_tab, store_data, get_data } from "@/code/data_functions";

const sortItemsByPurchased = (item1: Item, item2: Item) => {
  if (item1.isPurchased == item2.isPurchased) {
    return 0;
  } else if (item2.isPurchased) {
    return -1;
  } else {
    return 1;
  }
};

export default function ShoppingList() {
  const [modalVisible, setModalVisible] = useState(false);
  const [items, updateItems] = useState<Item[]>([]);
  const [collapsedSections, setCollapsedSections] = useState({
    Groceries: false,
    "Non-Grocery Items": false,
  });

  useEffect(() => {
    set_tab("ShoppingList");
  });

  useEffect(() => {
    if (items.length == 0) {
      // don't overwrite saved data on render
      return;
    }
    store_data(items, "items");
  }, [items]);

  useEffect(() => {
    get_data("items").then((val) => {
      if (val != null && val.length != items.length) {
        updateItems(val);
      }
    });
  });

  const updateItem = (itemName: string, fieldName: string, value: any) => {
    if (value == null) {
      updateItems(items.filter((item) => item.name != itemName));
      return;
    }
    const newItems = items.map((item) => {
      if (item.name == itemName) {
        let field = fieldName as keyof typeof item;
        return { ...item, [field]: value };
      }
      return item;
    });
    updateItems(newItems);
  };

  return (
    <View>
      <StatusBar hidden={false} style="dark" />
      <Stack.Screen
        options={{
          headerRight: () => (
            <CreateButton
              text="Add Item"
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
              .filter(
                (item) => item.isGrocery && !collapsedSections["Groceries"]
              )
              .sort(sortItemsByPurchased),
          },
          {
            title: "Non-Grocery Items",
            data: items
              .filter(
                (item) =>
                  !item.isGrocery && !collapsedSections["Non-Grocery Items"]
              )
              .sort(sortItemsByPurchased),
          },
        ]}
        renderItem={({ item }) => (
          <ListItem item={item} updateItem={updateItem} />
        )}
        renderSectionHeader={({ section: { title } }) => (
          <View>
            <Text className="text-xl font-medium text-center border-b-2 py-2 bg-slate-300">
              {title}
            </Text>
            <Pressable
              className="absolute right-3 top-2"
              onPress={() => {
                let field = title as keyof typeof collapsedSections;
                let newCollapsedSections = {
                  ...collapsedSections,
                };
                newCollapsedSections[field] = !collapsedSections[field];
                setCollapsedSections(newCollapsedSections);
              }}
            >
              <Entypo
                name={
                  collapsedSections[title as keyof typeof collapsedSections]
                    ? "chevron-left"
                    : "chevron-down"
                }
                size={24}
                color="black"
              />
            </Pressable>
          </View>
        )}
        ItemSeparatorComponent={() => (
          <View className="w-max bg-gray-400 h-[.3vh]" />
        )}
      />

      {modalVisible && (
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
      )}
    </View>
  );
}
