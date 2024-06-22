import { View, SectionList, Text, Pressable, SafeAreaView } from "react-native";
import { useState, useEffect, useContext } from "react";
import { useIsFocused } from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import * as Haptics from "expo-haptics";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import {
  AddItemModal,
  ClearListModal,
  ListItem,
  Button,
} from "@/components/index";
import { Item } from "@/types/shopping_list";
import { set_tab } from "@/code/data_functions";
import { ItemContext } from "@/code/data_context";
import { sortItems } from "@/code/sort_items";
import { useTranslation } from "react-i18next";
import { SettingsButton } from "@/components/index";

import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ShoppingList() {
  const { t } = useTranslation();
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
    if (value == null && fieldName != "date") {
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

    updateItems(sortItems(newItems));
  };

  return (
    <View className="h-screen flex-col flex-initial gap-2">
      <StatusBar hidden={false} style="dark" />
      <Stack.Screen options={{ headerRight: () => <SettingsButton /> }} />

      {/* <Button text="clear data" onPress={() => AsyncStorage.clear()} /> */}

      <SectionList
        keyboardShouldPersistTaps="always"
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
          <Pressable
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
              let field = title as keyof typeof collapsedSections;
              let newCollapsedSections = {
                ...collapsedSections,
              };
              newCollapsedSections[field] = !collapsedSections[field];
              setCollapsedSections(newCollapsedSections);
            }}
          >
            <Text className="text-xl text-white text-center py-2 mb-2 bg-indigo-600">
              {t(title)}
            </Text>
            <Pressable
              className="absolute right-3 top-2"
              hitSlop={15}
              onPress={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
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
          </Pressable>
        )}
      />

      <View className="w-[100vw] flex-row justify-center mt-auto mb-2 gap-3">
        <Button
          text={<Entypo name="plus" size={24} color="black" />}
          pressableClass="bg-gray-300 rounded-3xl w-[45vw]"
          pressedClass="bg-gray-400"
          textClass="text-center text-xl py-2 font-medium"
          onPress={() => {
            setAddModalVisible(true);
          }}
        />
        <Button
          text={
            <AntDesign
              name="delete"
              size={24}
              color={items.length == 0 ? "gray" : "black"}
            />
          }
          pressableClass="bg-gray-300 rounded-3xl w-[45vw]"
          pressedClass="bg-gray-400"
          textClass="text-center text-xl py-2 font-medium"
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
            updateItems(sortItems([...items, item]));
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
