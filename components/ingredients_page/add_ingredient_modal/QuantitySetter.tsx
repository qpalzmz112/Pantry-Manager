import { Text, View, Pressable } from "react-native";
import { useState } from "react";
import * as Haptics from "expo-haptics";
import { AntDesign } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";

export default function QuantitySetter({
  qty,
  setQty,
  inList,
}: {
  qty: number;
  setQty: (n: number) => void;
  inList: boolean;
}) {
  const { t } = useTranslation();
  const [minusPressed, setMinusPressed] = useState(false);
  const [plusPressed, setPlusPressed] = useState(false);
  return (
    <View className={`${inList ? "" : "pt-6"} flex-row items-center`}>
      <Pressable
        className="pr-1"
        hitSlop={inList ? 15 : 30}
        onPress={() => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft);
          setQty(qty - 1);
        }}
        onPressIn={() => setMinusPressed(true)}
        onPressOut={() => setMinusPressed(false)}
        disabled={qty == 1}
      >
        <AntDesign
          name="minuscircleo"
          size={inList ? 20 : 36}
          color={qty == 1 || minusPressed ? "gray" : "black"}
        />
      </Pressable>
      <Text className={inList ? "px-1" : "text-xl px-4"}>{`${t(
        "qty"
      )}${qty}`}</Text>
      <Pressable
        className={inList ? "pr-1" : "px-1"}
        hitSlop={inList ? 10 : 30}
        onPress={() => {
          setQty(qty + 1);
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft);
        }}
        onPressIn={() => setPlusPressed(true)}
        onPressOut={() => setPlusPressed(false)}
      >
        <AntDesign
          name="pluscircleo"
          size={inList ? 20 : 36}
          color={plusPressed ? "gray" : "black"}
        />
      </Pressable>
    </View>
  );
}
