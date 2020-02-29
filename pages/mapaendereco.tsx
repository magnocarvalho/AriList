import { View, Text, ScrollView, Dimensions, StyleSheet } from "react-native";
import React, { useEffect } from "react";
import MyHeader from "../components/myHeader";
import BotaoServicos from "../components/botaoServicos";
import { navigate } from "../router/Navigation";
import MapView from "react-native-maps";

import {
  handleAndroidBackButton,
  removeAndroidBackButtonHandler
} from "../router/androidBackButton";

const MapaEndereco = () => {
  useEffect(() => {}, []);
  useEffect(() => {
    handleAndroidBackButton(() => navigate("Inicio"));
    return removeAndroidBackButtonHandler;
  }, []);
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center"
    },
    mapStyle: {
      width: Dimensions.get("window").width,
      height: Dimensions.get("window").height
    }
  });
  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <MyHeader
        goBack={() => navigate("Inicio")}
        iconEvent="info"
        titulo="Informe o endereço"
      ></MyHeader>

      <View>
        <MapView style={styles.mapStyle} />
      </View>
    </View>
  );
};
export default MapaEndereco;
