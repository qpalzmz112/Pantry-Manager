import { Text } from "react-native";
import * as Haptics from "expo-haptics";
import Button from "./Button";
import { AntDesign } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";

interface props {
  date: string;
  isGrocery?: boolean;
  showModal: (b: boolean) => void;
}

export default function ListItemDate({
  date,
  isGrocery = true,
  showModal,
}: props) {
  const { t } = useTranslation();
  return date ? (
    <Button
      text={t("use_by") + date}
      textClass="text-gray-600"
      pressableClass="py-1 px-2 mr-2 bg-gray-200 rounded-lg"
      pressedClass="bg-gray-400"
      onPress={() => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
        showModal(true);
      }}
    />
  ) : (
    isGrocery && (
      <Button
        text={<AntDesign name="calendar" size={24} color="gray" />}
        textClass=""
        pressableClass="mr-2 bg-gray-200 rounded-lg px-2"
        pressedClass="bg-gray-400"
        onPress={() => showModal(true)}
      />
    )
  );
}
