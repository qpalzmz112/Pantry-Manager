import { View, TextInput } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import Button from "./Button";

export default function SearchBar({
  search,
  setSearch,
  setCollapsedCategories,
  defaultCollapsedCategories,
}: {
  search: string;
  setSearch: (s: string) => void;
  setCollapsedCategories: (s: any) => void;
  defaultCollapsedCategories: any;
}) {
  const { t } = useTranslation();
  return (
    <View>
      <View className="flex-row m-2">
        <AntDesign className="mr-2" name="search1" size={24} color="gray" />
        <TextInput
          value={search}
          onChangeText={(t) => {
            if (search == "") {
              setCollapsedCategories(defaultCollapsedCategories);
            }
            setSearch(t);
          }}
          onPress={() => setSearch("")}
          className="w-screen"
          placeholder={t("search")}
          cursorColor="gray"
        />
      </View>
      {search && (
        <Button
          text={t("clear_search")}
          textClass="text-lg text-center"
          pressableClass="w-[80vw] mx-auto bg-gray-300 rounded-lg p-1 mb-2"
          pressedClass="bg-gray-400"
          onPress={() => {
            setSearch("");
            setCollapsedCategories(defaultCollapsedCategories);
          }}
        />
      )}
    </View>
  );
}
