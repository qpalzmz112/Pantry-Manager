import { Modal, View, Pressable, Text } from "react-native";
import { useState } from "react";
import DateInput from "./ingredients_page/add_ingredient_modal/DateInput";
import CloseButton from "./CloseButton";

export default function ChangeDateModal({
  addDate,
  close,
}: {
  addDate: (d: string) => void;
  close: () => void;
}) {
  const [pressed, setPressed] = useState(false);
  const emptyDate = "MM-DD-YY";
  const [date, setDate] = useState(emptyDate);
  const [error, setError] = useState("");

  return (
    <Modal onRequestClose={close}>
      <View className="h-[100vh] w-[100vw] flex-col items-center justify-center">
        <DateInput
          date={date}
          onChangeDate={setDate}
          setErrorMessage={setError}
          emptyDate={emptyDate}
        />
        <Pressable
          onPress={() => {
            if (date.length > 0 && date.length < 8) {
              setError("Please enter a valid date or no date.");
              return;
            }
            addDate(date);
            close();
          }}
          onPressIn={() => setPressed(true)}
          onPressOut={() => setPressed(false)}
          className={`${
            pressed ? "bg-gray-300" : "bg-gray-200"
          } p-3 mt-10 mb-4 rounded-lg`}
        >
          <Text className="text-lg">Save date to item</Text>
        </Pressable>

        {error && <Text>{error}</Text>}

        <CloseButton close={close} />
      </View>
    </Modal>
  );
}
