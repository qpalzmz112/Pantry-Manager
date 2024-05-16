import { Text, View, FlatList } from "react-native";
import { ListItem } from "@/components/index";
import { Item } from "@/types/shopping_list";

export default function SubList({
  items,
  title,
}: {
  items: Item[];
  title: string;
}) {
  return (
    <View>
      <Text className="text-2xl border-b-2 py-2">{title}</Text>
      <FlatList
        data={items}
        renderItem={({ item }) => <ListItem item={item} />}
        ItemSeparatorComponent={() => (
          <View className="w-max bg-gray-400 h-[.3vh]" />
        )}
        className={`${items.length > 0 ? "last:border-black border-b-2" : ""}`}
      />
    </View>
  );
}
