import { Text, View, Pressable } from "react-native";
import { useState } from "react";
import { AntDesign } from "@expo/vector-icons";

export default function QuantitySetter({
  qty,
  setQty,
}: {
  qty: number;
  setQty: (n: number) => void;
}) {
  const [minusPressed, setMinusPressed] = useState(false);
  const [plusPressed, setPlusPressed] = useState(false);
  return (
    <View className="flex-row pt-6 items-center">
      <Pressable
        className="pr-1"
        onPress={() => {
          setQty(qty - 1);
        }}
        onPressIn={() => setMinusPressed(true)}
        onPressOut={() => setMinusPressed(false)}
        disabled={qty == 1}
      >
        <AntDesign
          name="minuscircleo"
          size={36}
          color={qty == 1 || minusPressed ? "gray" : "black"}
        />
      </Pressable>
      <Text className="text-xl px-4">{`Qty: ${qty}`}</Text>
      <Pressable
        className="px-1"
        onPress={() => setQty(qty + 1)}
        onPressIn={() => setPlusPressed(true)}
        onPressOut={() => setPlusPressed(false)}
      >
        <AntDesign
          name="pluscircleo"
          size={36}
          color={plusPressed ? "gray" : "black"}
        />
      </Pressable>
    </View>
  );
}
