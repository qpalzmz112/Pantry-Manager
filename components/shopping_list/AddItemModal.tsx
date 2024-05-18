import { Text, View, Modal, TextInput, Pressable } from "react-native";
import { useState } from "react";
import { Feather } from "@expo/vector-icons";
import { Item } from "@/types/shopping_list";
import CheckBox from "./CheckBox";

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
  const emptyDate = "MM-DD-YY";
  const [date, onChangeDate] = useState(emptyDate);
  const [isGrocery, setIsGrocery] = useState(true);
  const [isRecurring, setIsRecurring] = useState(false);
  const [addItemPressed, setAddItemPressed] = useState(false);
  const [closeButtonPressed, setCloseButtonPressed] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const bgColor = "bg-white";
  const borderColor = "border-gray-500";
  const textInputStyle = `border-2 ${borderColor} p-1 w-[80vw] ${bgColor} text-2xl`;

  const canAddItemCheck = () => {
    if (date.length > 0 && date.length < 8) {
      setErrorMessage("Please enter a full date or no date.");
      return false;
    } else if (nameAlreadyExists(itemName)) {
      setErrorMessage("An item with this name already exists.");
      return false;
    } else if (itemName.length == 0) {
      setErrorMessage("Item name cannot be empty.");
      return false;
    }
    return true;
  };
  console.log(errorMessage);

  return (
    <Modal transparent={false} onRequestClose={close}>
      <View className="w-[100vw] h-[100vh] bg-gray-100 flex-col justify-center items-center">
        <Text className="w-[80vw] text-left">Item Name:</Text>
        <TextInput
          className={textInputStyle}
          onChangeText={(text) => {
            onChangeItemName(text);
            setErrorMessage("");
          }}
          value={itemName}
          cursorColor="black"
        />

        <Text className="w-[80vw] text-left pt-4">Use by Date (optional):</Text>
        <TextInput
          className={textInputStyle}
          keyboardType="number-pad"
          maxLength={8}
          onChangeText={(text) => {
            setErrorMessage("");
            if (text[text.length - 1] < "0" || text[text.length - 1] > "9") {
              if (text.length == 3 || text.length == 6) {
                onChangeDate(text);
                return; // don't want to cause problems with the auto-inserted hyphens
              }
              // only allow digits to be entered
              text = text.slice(0, -1);
              return;
            }
            if (text.length == 2 || text.length == 5) {
              if (text.length < date.length) {
                text = text.slice(0, -1);
              } else {
                text += "-";
              }
            }
            onChangeDate(text);
          }}
          onPressIn={() => {
            if (date == emptyDate) {
              onChangeDate("");
            }
          }}
          value={date}
          cursorColor="black"
        ></TextInput>

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
          className={`p-2 ${
            errorMessage == "" ? bgColor : "bg-gray-200"
          } border-2 ${
            addItemPressed ? "border-gray-300" : borderColor
          } rounded-md`}
          disabled={!(errorMessage == "")}
          onPressIn={() => {
            setAddItemPressed(true);
          }}
          onPressOut={() => {
            setAddItemPressed(false);
          }}
          onPress={() => {
            let month, day, year;
            [month, day, year] = date.split("-");
            if (!canAddItemCheck()) {
              return;
            }
            addItem({
              name: itemName,
              isGrocery: isGrocery,
              isRecurring: isRecurring,
              isPurchased: false,
              useByDate: new Date(
                2000 + parseInt(year),
                parseInt(month) - 1,
                parseInt(day)
              ),
            });
            close();
          }}
        >
          <Text
            className={`${
              addItemPressed
                ? "text-gray-300"
                : errorMessage == ""
                ? "text-black"
                : "text-gray-400"
            }`}
          >
            Add Item
          </Text>
        </Pressable>
        {errorMessage != "" && (
          <Text className="text-black pt-1">{errorMessage}</Text>
        )}

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
