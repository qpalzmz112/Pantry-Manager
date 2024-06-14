import Button from "./Button";

export default function AddItemButton({
  text,
  errorMessage,
  canAddCheck,
  add,
}: {
  text: string;
  errorMessage: string;
  canAddCheck: () => boolean;
  add: () => void;
}) {
  return (
    <Button
      text={text}
      onPress={() => {
        if (!canAddCheck()) {
          return;
        }
        add();
      }}
      disabled={!(errorMessage == "")}
      pressableClass={`p-2 rounded-md mx-4 max-w-[40vw] flex justify-center bg-gray-200`}
      pressedClass="bg-gray-300"
      textClass={`text-center ${errorMessage != "" ? "text-gray-400" : ""}`}
    />
  );
}
