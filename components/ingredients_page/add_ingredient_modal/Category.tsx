import { Text, View, Pressable, Keyboard, Modal } from "react-native";
import { useState } from "react";
import DeleteCategoryButton from "./DeleteCategoryButton";

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
          setShowDelete(true);
        }}
      >
        <Text className="text-lg">{name}</Text>
      </Pressable>

      {showDelete && (
        <Modal
          animationType="slide"
          onRequestClose={() => setShowDelete(false)}
        >
          <View className="h-[100vh] w-[100vw] flex-col items-center justify-center">
            <Text className="text-2xl">Delete the {name} category?</Text>
            <View className="flex-row">
              <DeleteCategoryButton
                text="Yes"
                onPress={() => {
                  deleteCategory();
                  setShowDelete(false);
                }}
              />
              <DeleteCategoryButton
                text="No"
                onPress={() => setShowDelete(false)}
              />
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
}

// {categoryDeleteButton == name && (
//     <Pressable
//       onPress={() => setCategories(categories.filter((c) => c != name))}
//       className="border-2 border-red-600 p-1 m-1 rounded-lg"
//     >
//       <Text className="text-lg">Delete category</Text>
//     </Pressable>
//   )}
