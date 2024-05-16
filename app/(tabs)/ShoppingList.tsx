import { View } from "react-native";
import { useState } from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { CreateButton, AddItemModal, SubList } from "@/components/index";
import { Item } from "@/types/shopping_list";

export default function ShoppingList() {
  const [modalVisible, setModalVisible] = useState(false);
  const [items, addItem] = useState<Item[]>([]);
  console.log(items);
  // todo: get from local storage, don't allow adding empty item name or existing item name
  // actually render items and save to local storage
  // add an (i) button next to recurring purchase explaining its purpose

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

      <SubList
        title="Groceries"
        items={items.filter((item) => item.isGrocery)}
      />
      <SubList
        title="Non-Grocery Items"
        items={items.filter((item) => !item.isGrocery)}
      />

      {modalVisible ? (
        <AddItemModal
          close={() => {
            setModalVisible(false);
          }}
          addItem={(item: Item) => {
            addItem([...items, item]);
          }}
        />
      ) : null}
    </View>
  );
}
