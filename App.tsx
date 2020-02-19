import React, { useEffect, useState, Children } from "react";
import { StyleSheet, Text, View } from "react-native";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import { Root } from "native-base";
import { setNavigator } from "./router/Navigation";
import { Routes } from "./router/Router";

export default function App() {
  const [loadFont, setLoadFont] = useState(false);

  useEffect(() => {
    Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      ...Ionicons.font
    }).then(() => {
      setLoadFont(true);
    });
  }, []);

  return (
    loadFont && (
      <Root>
        <View style={styles.container}>
          <Routes refe={setNavigator} />
        </View>
      </Root>
    )
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#009bdb",
    alignItems: "center",
    justifyContent: "center"
  },
  texto: {
    color: "#fff",
    fontSize: 40
  }
});
