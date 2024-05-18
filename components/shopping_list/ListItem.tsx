import { Text, View, TextInput } from "react-native";
import CheckBox from "./CheckBox";
import { Item } from "@/types/shopping_list";

export default function ListItem({
  item,
  setPurchased,
}: {
  item: Item;
  setPurchased: (itemName: string) => void;
}) {
  let { isPurchased } = item;
  let useByText = item.useByDate.toString();
  if (useByText == "Invalid Date" || item.useByDate == null) {
    useByText = "";
  } else {
    useByText = `${
      item.useByDate.getMonth() + 1
    }-${item.useByDate.getDate()}-${item.useByDate.getFullYear()}`;
  }

  return (
    <View
      className={`flex-row items-center py-2 ${
        isPurchased ? "bg-gray-300" : "bg-white"
      }`}
    >
      <View className="flex-col">
        <Text className={`text-xl ${isPurchased ? "text-gray-600" : ""}`}>
          {item.name}
        </Text>

        <View className="flex-row items-center">
          <Text
            className={`text-sm ${isPurchased ? "text-gray-600" : ""} pr-2`}
          >
            Use By:
          </Text>
          <TextInput
            className={`${isPurchased ? "text-gray-600" : ""}`}
            value={useByText}
            cursorColor="black"
          />
        </View>
      </View>

      <CheckBox
        className="absolute right-2"
        checked={isPurchased}
        onPress={() => {
          setPurchased(item.name);
        }}
      />
    </View>
  );
}
