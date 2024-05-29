import { Text, View } from "react-native";
import { useEffect } from "react";
import { useIsFocused } from "@react-navigation/native";
import { set_tab } from "@/code/data_functions";

export default function Recipes() {
  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused) {
      set_tab("Recipes");
    }
  });

  return (
    <View>
      <Text>Edit app/index.tsx to edit this screen.</Text>
    </View>
  );
}
