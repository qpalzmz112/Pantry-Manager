import Toast from "react-native-root-toast";

const toast = (text: string) => {
  Toast.show(text, {
    position: 0,
    backgroundColor: "#4f46e5",
    textColor: "white",
    textStyle: { padding: 2, fontSize: 18 },
    opacity: 0.9,
    duration: 1000,
  });
};

export default toast;
