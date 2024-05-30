import { View, SectionList, Text, Pressable } from "react-native";
import { useState, useEffect, useContext } from "react";
import { useIsFocused } from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import * as Haptics from "expo-haptics";
import { Entypo } from "@expo/vector-icons";
import {
  CreateButton,
  AddItemModal,
  ClearListModal,
  ListItem,
  Button,
} from "@/components/index";
import { Item } from "@/types/shopping_list";
import { set_tab } from "@/code/data_functions";
import { ItemContext } from "@/code/data_context";

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
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [clearModalVisible, setClearModalVisible] = useState(false);
  const { data: items, update: updateItems } = useContext(ItemContext);
  const [collapsedSections, setCollapsedSections] = useState({
    Groceries: false,
    "Non-Grocery Items": false,
  });

  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused) {
      set_tab("ShoppingList");
    }
  });

  const updateItem = (itemName: string, fieldName: string, value: any) => {
    if (value == null) {
      updateItems(items.filter((item) => item.name != itemName));
      return;
    }
    let newItems = items.map((item) => {
      if (item.name == itemName) {
        let field = fieldName as keyof typeof item;
        return { ...item, [field]: value };
      }
      return item;
    });

    updateItems(newItems);
    if (fieldName == "isPurchased") {
      setTimeout(() => {
        newItems = [...newItems];
        newItems.sort(sortItemsByPurchased);
        updateItems(newItems);
      }, 100);
    }
  };

  return (
    <View className="h-[85vh]">
      <StatusBar hidden={false} style="dark" />
      <Stack.Screen
        options={{
          headerRight: () => (
            <CreateButton
              text="Add Item"
              onPress={() => {
                setAddModalVisible(true);
              }}
            />
          ),
        }}
      />

      <SectionList
        sections={[
          {
            title: "Groceries",
            data: items.filter(
              (item) => item.isGrocery && !collapsedSections["Groceries"]
            ),
          },
          {
            title: "Non-Grocery Items",
            data: items.filter(
              (item) =>
                !item.isGrocery && !collapsedSections["Non-Grocery Items"]
            ),
          },
        ].filter(
          (obj) =>
            obj.data.length > 0 ||
            collapsedSections[obj.title as keyof typeof collapsedSections]
        )}
        renderItem={({ item }) => (
          <ListItem item={item} updateItem={updateItem} />
        )}
        renderSectionHeader={({ section: { title } }) => (
          <View>
            <Text className="text-xl text-white text-center py-2 mb-2 bg-indigo-600">
              {title}
            </Text>
            <Pressable
              className="absolute right-3 top-2"
              hitSlop={15}
              onPress={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
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
                color="white"
              />
            </Pressable>
          </View>
        )}
      />

      <View className="fixed bottom-0 w-[100vw] flex-row justify-center">
        <Button
          text="Add Item"
          pressableClass="m-1 bg-gray-300 rounded-3xl border-gray-500 border-2 w-[45vw]"
          pressedClass="bg-gray-400"
          textClass="text-center text-xl py-2 font-medium"
          onPress={() => {
            setAddModalVisible(true);
          }}
        />
        <Button
          text="Clear List"
          pressableClass="m-1 bg-gray-300 rounded-3xl border-gray-500 border-2 w-[45vw]"
          pressedClass="bg-gray-400"
          textClass={`${
            items.length == 0 ? "text-gray-500" : ""
          } text-center text-xl py-2 font-medium`}
          onPress={() => setClearModalVisible(true)}
          disabled={items.length == 0}
        />
      </View>

      {addModalVisible && (
        <AddItemModal
          close={() => {
            setAddModalVisible(false);
          }}
          addItem={(item: Item) => {
            updateItems([...items, item]);
          }}
          nameAlreadyExists={(name) =>
            items.map((item) => item.name).includes(name, 0)
          }
        />
      )}

      {clearModalVisible && (
        <ClearListModal
          close={() => {
            setClearModalVisible(false);
          }}
        />
      )}
    </View>
  );
}
