import { View, Text } from "react-native";
import AddItemButton from "./AddItemButton";

export default function AddItemButtonPair({
  errorMessage,
  canAddItemCheck,
  addItem,
  success,
  close,
}: {
  errorMessage: string;
  canAddItemCheck: () => boolean;
  addItem: () => void;
  success: () => void;
  close: () => void;
}) {
  return (
    <View className="flex-col items-center mt-10">
      <View className="flex-row">
        <AddItemButton
          text="Add Item"
          errorMessage={errorMessage}
          canAddItemCheck={canAddItemCheck}
          addItem={() => {
            addItem();
            success();
          }}
        />
        <AddItemButton
          text="Add Item and Return to List"
          errorMessage={errorMessage}
          canAddItemCheck={canAddItemCheck}
          addItem={() => {
            addItem();
            close();
          }}
        />
      </View>
      {errorMessage != "" && (
        <Text className="text-black pt-2">{errorMessage}</Text>
      )}
    </View>
  );
}
