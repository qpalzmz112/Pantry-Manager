import { Modal, View, Text } from "react-native";
import { useContext } from "react";
import { ItemContext } from "@/code/data_context";
import { Item } from "@/types/shopping_list";
import DeleteSomethingButton from "./DeleteSomethingButton";
import CloseButton from "./CloseButton";

interface props {
  name: string;
  type: string;
  shoppingListItem?: Item;
  deleteThing: () => void;
  close: () => void;
}

export default function DeleteSomethingModal({
  name,
  type,
  shoppingListItem,
  deleteThing,
  close,
}: props) {
  const { data: Items, update } = useContext(ItemContext);
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

        {type == "ingredient" && (
          <View className="max-w-[50vw]">
            <DeleteSomethingButton
              text="Yes, and add this to your shopping list."
              onPress={() => {
                deleteThing();
                if (
                  !Items.map((item) => item.name).includes(
                    shoppingListItem!.name
                  )
                ) {
                  update([...Items, shoppingListItem!]);
                }
                close();
              }}
            />
          </View>
        )}

        <CloseButton close={close} />
      </View>
    </Modal>
  );
}
