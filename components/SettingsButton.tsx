import { useState } from "react";
import Button from "./Button";
import { Feather } from "@expo/vector-icons";
import SettingsModal from "./SettingsModal";

export default function SettingsButton() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Button
        text={<Feather name="settings" size={24} color="black" />}
        textClass=""
        pressableClass="p-2 m-2 rounded-lg bg-gray-200"
        pressedClass="bg-gray-400"
        onPress={() => setShowModal(true)}
      />

      {showModal && <SettingsModal close={() => setShowModal(false)} />}
    </>
  );
}
