import { Text, TextInput } from "react-native";
import LabelledTextInput from "./LabelledTextInput";

export default function DateInput({
  date,
  onChangeDate,
  setErrorMessage,
  emptyDate,
}: {
  date: string;
  onChangeDate: (d: string) => void;
  setErrorMessage: (e: string) => void;
  emptyDate: string;
}) {
  return (
    <LabelledTextInput
      labelText="Use by Date (optional):"
      inputText={date}
      keyboardType="number-pad"
      maxLength={8}
      onChangeText={(text) => {
        setErrorMessage("");
        if (text[text.length - 1] < "0" || text[text.length - 1] > "9") {
          if (text.length == 3 || text.length == 6) {
            onChangeDate(text);
            return; // don't want to cause problems with the auto-inserted hyphens
          }
          // only allow digits to be entered
          text = text.slice(0, -1);
          return;
        }
        if (text.length == 2 || text.length == 5) {
          if (text.length < date.length) {
            text = text.slice(0, -1);
          } else {
            text += "-";
          }
        }
        onChangeDate(text);
      }}
      onPress={() => {
        if (date == emptyDate) {
          onChangeDate("");
          setErrorMessage("");
        }
      }}
    />
  );
}
