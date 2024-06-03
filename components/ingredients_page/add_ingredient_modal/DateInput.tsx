import { View } from "react-native";
import { useState } from "react";
import Button from "@/components/Button";
import { useTranslation } from "react-i18next";
import DateTimePicker from "@react-native-community/datetimepicker";
import {
  Date_to_date,
  date_to_display_string,
  date_to_Date,
} from "@/code/date_utils";
import { date } from "@/types/shopping_list";

export default function DateInput({
  date,
  onChangeDate,
}: {
  date: date | null;
  onChangeDate: (d: date) => void;
}) {
  const { t } = useTranslation();
  const [showInput, setShowInput] = useState(false);

  return (
    <View>
      <Button
        text={
          date ? t("use_by") + date_to_display_string(date) : t("choose_date")
        }
        textClass="text-lg"
        pressableClass="p-2 mt-6 bg-gray-200 rounded-lg"
        pressedClass="bg-gray-400"
        onPress={() => setShowInput(true)}
      />
      {showInput && (
        <DateTimePicker
          mode="date"
          value={date_to_Date(date)}
          onChange={(e, date) => {
            if (e.type == "dismissed") {
              setShowInput(false);
            } else if (e.type == "set") {
              setShowInput(false);
              onChangeDate(Date_to_date(date!));
            }
          }}
        />
      )}
    </View>
  );
}
