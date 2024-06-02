import { Modal, View, Pressable, Text } from "react-native";
import { useState } from "react";
import DateInput from "./ingredients_page/add_ingredient_modal/DateInput";
import CloseButton from "./CloseButton";
import toast from "@/code/toast";

interface props {
  givenDate?: string;
  addDate: (d: string) => void;
  close: () => void;
}

export default function ChangeDateModal({ givenDate, addDate, close }: props) {
  const [pressed, setPressed] = useState(false);
  const [date, setDate] = useState(givenDate ? givenDate : "");
  const [error, setError] = useState("");

  return (
    <Modal animationType="slide" onRequestClose={close}>
      <View className="h-[100vh] w-[100vw] flex-col items-center justify-center">
        <DateInput
          date={date}
          onChangeDate={setDate}
          setErrorMessage={setError}
        />

        {date == "" && (
          <Text className="w-[80vw] mt-8 text-center">
            After adding a date, you can change it by tapping and holding it.
          </Text>
        )}

        <Pressable
          onPress={() => {
            if (date.length > 0 && date.length < 8) {
              setError("Please enter a valid date or no date.");
              return;
            }
            addDate(date);
            toast("Date saved!");
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
