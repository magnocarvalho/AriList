import { BackHandler, Alert } from "react-native";

const handleAndroidBackButton = callback => {
  BackHandler.addEventListener("hardwareBackPress", () => {
    callback();
    return true;
  });
};

const removeAndroidBackButtonHandler = () => {
  BackHandler.removeEventListener("hardwareBackPress", () => {});
};

const exitAlert = () => {
  Alert.alert("Confirme a saída", "Você quer sair do Aplicativo?", [
    { text: "Cancelar", style: "cancel" },
    { text: "Sim", onPress: () => BackHandler.exitApp() }
  ]);
};
export { handleAndroidBackButton, removeAndroidBackButtonHandler, exitAlert };
