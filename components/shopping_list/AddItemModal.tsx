import { Text, View, Modal, TextInput, Pressable } from "react-native";
import { useState } from "react";
import { Feather } from "@expo/vector-icons";
import { Item } from "@/types/shopping_list";
import CheckBox from "./CheckBox";

const bgColor = "bg-white";
const borderColor = "border-gray-500";

export default function AddItemModal({
  close,
  addItem,
}: {
  close: () => void;
  addItem: (item: Item) => void;
}) {
  const [text, onChangeText] = useState("");
  const [isGrocery, setIsGrocery] = useState(true);
  const [isRecurring, setIsRecurring] = useState(false);
  const [addItemPressed, setAddItemPressed] = useState(false);
  const [closeButtonPressed, setCloseButtonPressed] = useState(false);

  return (
    <Modal transparent={false} onRequestClose={close}>
      <View className="w-[100vw] h-[100vh] bg-gray-100 flex-col justify-center items-center">
        <Text className="w-[80vw] text-left">Item Name:</Text>
        <TextInput
          className={`border-2 ${borderColor} p-1 w-[80vw] ${bgColor} text-2xl`}
          onChangeText={(text) => {
            onChangeText(text);
          }}
          value={text}
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
            <Feather name="info" size={20} color="black" className="pl-2" />
          </View>

          <CheckBox
            onPress={() => {
              setIsRecurring(!isRecurring);
            }}
            checked={isRecurring}
          ></CheckBox>
        </View>

        <Pressable
          className={`p-2 ${bgColor} border-2 ${
            addItemPressed ? "border-gray-300" : borderColor
          } rounded-md`}
          onPressIn={() => {
            setAddItemPressed(true);
          }}
          onPressOut={() => {
            setAddItemPressed(false);
          }}
          onPress={() => {
            addItem({
              name: text,
              isGrocery: isGrocery,
              isRecurring: isRecurring,
            });
            close();
          }}
        >
          <Text className={addItemPressed ? "text-gray-300" : "text-black"}>
            Add Item
          </Text>
        </Pressable>

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
