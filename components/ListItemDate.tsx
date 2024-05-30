import { Text } from "react-native";
import * as Haptics from "expo-haptics";
import Button from "./Button";
import { AntDesign } from "@expo/vector-icons";

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
  return date ? (
    <Text
      onPress={() => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
        showModal(true);
      }}
      className="mx-4"
    >
      Use by: {date}
    </Text>
  ) : (
    isGrocery && (
      <Button
        text={<AntDesign name="calendar" size={24} color="black" />}
        textClass=""
        pressableClass="mx-4 bg-gray-200 rounded-lg p-1"
        pressedClass="bg-gray-400"
        onPress={() => showModal(true)}
      />
    )
  );
}
