import { View, Text } from "react-native";
import AddItemButton from "./AddItemButton";
import { useTranslation } from "react-i18next";

export default function AddItemButtonPair({
  errorMessage,
  canAddItemCheck,
  addItem,
  success,
  close,
  doToast,
}: {
  errorMessage: string;
  canAddItemCheck: () => boolean;
  addItem: () => void;
  success: () => void;
  close: () => void;
  doToast: (n: number) => void;
}) {
  const { t } = useTranslation();
  return (
    <View className="flex-col items-center mt-10">
      <View className="flex-row">
        <AddItemButton
          text={t("add_item")}
          errorMessage={errorMessage}
          canAddItemCheck={canAddItemCheck}
          addItem={() => {
            addItem();
            doToast(2);
            success();
          }}
        />
        <AddItemButton
          text={t("add_item_return")}
          errorMessage={errorMessage}
          canAddItemCheck={canAddItemCheck}
          addItem={() => {
            addItem();
            doToast(1);
          }}
        />
      </View>
      {errorMessage != "" && (
        <Text className="text-black pt-2">{errorMessage}</Text>
      )}
    </View>
  );
}
