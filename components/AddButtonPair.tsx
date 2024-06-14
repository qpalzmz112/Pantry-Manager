import { View, Text } from "react-native";
import { useTranslation } from "react-i18next";
import AddButton from "./AddButton";

interface props {
  type: string;
  errorMessage: string;
  className?: string;
  canAddCheck: () => boolean;
  add: () => void;
  doToast: (n: number) => void;
}

export default function AddButtonPair({
  errorMessage,
  type,
  className,
  canAddCheck,
  add,
  doToast,
}: props) {
  const { t } = useTranslation();
  return (
    <View className={`flex-col items-center pt-10 ${className}`}>
      <View className="flex-row">
        <AddButton
          text={t(`add_${type}`)}
          errorMessage={errorMessage}
          canAddCheck={canAddCheck}
          add={() => {
            add();
            doToast(2);
          }}
        />
        <AddButton
          text={t(`add_${type}_return`)}
          errorMessage={errorMessage}
          canAddCheck={canAddCheck}
          add={() => {
            add();
            doToast(1);
          }}
        />
      </View>
      {errorMessage != "" && (
        <Text className="text-black pt-2 max-w-[80vw]">{errorMessage}</Text>
      )}
    </View>
  );
}
