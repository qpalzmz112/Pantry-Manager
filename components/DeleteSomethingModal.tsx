import { Modal, View, Text } from "react-native";
import { useContext } from "react";
import { ItemContext } from "@/code/data_context";
import { Item } from "@/types/shopping_list";
import DeleteSomethingButton from "./DeleteSomethingButton";
import CloseButton from "./CloseButton";
import toast from "@/code/toast";
import { sortItems } from "@/code/sort_items";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();
  const { data: Items, update } = useContext(ItemContext);
  return (
    <Modal animationType="slide" onRequestClose={close}>
      <View className="h-[100vh] w-[100vw] flex-col items-center justify-center">
        <Text className="text-2xl">
          {t("delete")} {t(type).toLocaleLowerCase()} {name}?
        </Text>
        <View className="flex-row">
          <DeleteSomethingButton
            text={t("yes")}
            onPress={() => {
              deleteThing();
              toast(`${t(type)} ${t("toast_deleted")}`);
              close();
            }}
          />
          <DeleteSomethingButton text={t("no")} onPress={close} />
        </View>

        {type == "category" && (
          <Text className="max-w-[80vw] mt-4 text-xl text-center">
            {t("delete_category_info")}
          </Text>
        )}

        {type == "ingredient" && (
          <View className="max-w-[75vw]">
            <DeleteSomethingButton
              text={t("yes_add_to_shopping_list")}
              onPress={() => {
                deleteThing();
                if (
                  !Items.map((item) => item.name).includes(
                    shoppingListItem!.name
                  )
                ) {
                  update(sortItems([...Items, shoppingListItem!]));
                }
                toast(t("toast_deleted_added_to_shopping_list"));
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
