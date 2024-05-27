import { Text, View, Pressable, Keyboard } from "react-native";
import { useState } from "react";
import * as Haptics from "expo-haptics";
import DeleteSomethingModal from "../../DeleteSomethingModal";

export default function Category({
  name,
  onChangeCategory,
  deleteCategory,
}: {
  name: string;
  onChangeCategory: (t: string) => void;
  deleteCategory: () => void;
}) {
  const [showDelete, setShowDelete] = useState(false);
  return (
    <View key={name} className="flex-row items-center justify-center">
      <Pressable
        className="bg-gray-300 p-1 m-1 rounded-lg"
        onPress={() => {
          onChangeCategory(name);
          Keyboard.dismiss();
        }}
        onLongPress={() => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
          setShowDelete(true);
        }}
      >
        <Text className="text-lg">{name}</Text>
      </Pressable>

      {showDelete && (
        <DeleteSomethingModal
          name={name}
          type="category"
          deleteThing={deleteCategory}
          close={() => setShowDelete(false)}
        />
      )}
    </View>
  );
}
