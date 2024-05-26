import { Text, View, Modal, TextInput, Pressable } from "react-native";
import { useState } from "react";
import { Feather } from "@expo/vector-icons";
import { Item } from "@/types/shopping_list";
import CheckBox from "../CheckBox";
import AddItemButtonPair from "./AddItemButtonPair";

export default function AddItemModal({
  close,
  addItem,
  nameAlreadyExists,
}: {
  close: () => void;
  addItem: (item: Item) => void;
  nameAlreadyExists: (name: string) => boolean;
}) {
  const [itemName, onChangeItemName] = useState("");

  const [isGrocery, setIsGrocery] = useState(true);
  const [isRecurring, setIsRecurring] = useState(false);
  const [closeButtonPressed, setCloseButtonPressed] = useState(false);
  const [showingInfo, setShowingInfo] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const canAddItemCheck = () => {
    if (nameAlreadyExists(itemName)) {
      setErrorMessage("An item with this name already exists.");
      return false;
    } else if (itemName.length == 0) {
      setErrorMessage("Item name cannot be empty.");
      return false;
    }
    return true;
  };

  return (
    <Modal transparent={false} onRequestClose={close}>
      <View className="w-[100vw] h-[100vh] bg-gray-100 flex-col justify-center items-center">
        <Text className="w-[80vw] text-left">Item Name:</Text>
        <TextInput
          className="border-2 border-gray-500 p-1 w-[80vw] bg-white text-2xl"
          onChangeText={(text) => {
            onChangeItemName(text);
            setErrorMessage("");
          }}
          value={itemName}
          cursorColor="black"
        />

        <View className="w-[80vw] flex items-left mt-4">
          <Text>Grocery Item?</Text>
          <CheckBox
            onPress={() => {
              setIsGrocery(!isGrocery);
            }}
            checked={isGrocery}
          ></CheckBox>
        </View>

        <View className="w-[80vw] flex items-left mt-4">
          <View className="flex-row">
            <Text>Recurring Purchase?</Text>
            <Pressable onPress={() => setShowingInfo(!showingInfo)}>
              <Feather name="info" size={20} color="black" className="pl-2" />
            </Pressable>
          </View>

          {showingInfo && (
            <Text
              className="bg-white p-1"
              onPress={() => {
                setShowingInfo(false);
              }}
            >
              Recurring purchases will stay on your shopping list when you clear
              it.
            </Text>
          )}

          <CheckBox
            onPress={() => {
              setIsRecurring(!isRecurring);
            }}
            checked={isRecurring}
          ></CheckBox>
        </View>

        <AddItemButtonPair
          errorMessage={errorMessage}
          canAddItemCheck={canAddItemCheck}
          addItem={() => {
            addItem({
              name: itemName,
              isGrocery: isGrocery,
              isRecurring: isRecurring,
              isPurchased: false,
            });
          }}
          success={() => {
            onChangeItemName("");
            setIsGrocery(true);
            setIsRecurring(false);
            setErrorMessage("Success!");
          }}
          close={close}
        />

        <Pressable
          className={`absolute top-0 right-0 m-2 bg-gray-100`}
          onPressIn={() => {
            setCloseButtonPressed(true);
          }}
          onPressOut={() => {
            setCloseButtonPressed(false);
          }}
          onPress={() => {
            close();
          }}
        >
          <Feather
            name="x-square"
            size={36}
            color={closeButtonPressed ? "gray" : "black"}
          />
        </Pressable>
      </View>
    </Modal>
  );
}
