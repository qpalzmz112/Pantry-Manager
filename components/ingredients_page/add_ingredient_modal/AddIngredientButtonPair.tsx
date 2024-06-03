import { View, Text } from "react-native";
import AddIngredientButton from "./AddIngredientButton";
import { useTranslation } from "react-i18next";

export default function AddIngredientButtonPair({
  errorMessage,
  canAddCheck,
  addIngredient,
  doToast,
}: {
  errorMessage: string;
  canAddCheck: () => boolean;
  addIngredient: () => void;
  doToast: (n: number) => void;
}) {
  const { t } = useTranslation();
  return (
    <View className="flex-col items-center">
      <View className="flex-row">
        <AddIngredientButton
          text={t("add_ingredient")}
          errorMessage={errorMessage}
          canAddCheck={canAddCheck}
          addIngredient={() => {
            addIngredient();
            doToast(2);
          }}
        />
        <AddIngredientButton
          text={t("add_ingredient_return")}
          errorMessage={errorMessage}
          canAddCheck={canAddCheck}
          addIngredient={() => {
            addIngredient();
            doToast(1);
          }}
        />
      </View>
      {errorMessage != "" && (
        <Text className="text-black pt-2 max-w-[80vw]">{errorMessage}</Text>
      )}
    </View>
  );
}
