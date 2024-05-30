import { Text } from "react-native";
import Button from "../Button";

export default function ListItemCategory({
  name,
  onPress,
}: {
  name: string;
  onPress: () => void;
}) {
  return (
    <Button
      text={name ? name : "Uncategorized"}
      textClass="text-gray-600"
      pressableClass="bg-gray-200 p-1.5 my-1 rounded-lg self-start"
      pressedClass="bg-gray-400"
      onPress={onPress}
    />
  );
}
