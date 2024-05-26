import { Modal, View, Text } from "react-native";
import DeleteSomethingButton from "./DeleteSomethingButton";

export default function DeleteSomethingModal({
  name,
  type,
  deleteThing,
  close,
}: {
  name: string;
  type: string;
  deleteThing: () => void;
  close: () => void;
}) {
  return (
    <Modal animationType="slide" onRequestClose={close}>
      <View className="h-[100vh] w-[100vw] flex-col items-center justify-center">
        <Text className="text-2xl">
          Delete {type} {name}?
        </Text>
        <View className="flex-row">
          <DeleteSomethingButton
            text="Yes"
            onPress={() => {
              deleteThing();
              close();
            }}
          />
          <DeleteSomethingButton text="No" onPress={close} />
        </View>
        {type == "category" && (
          <Text className="max-w-[80vw] mt-4 text-xl text-center">
            The ingredients in this category will remain, but will be
            uncategorized.
          </Text>
        )}
      </View>
    </Modal>
  );
}
