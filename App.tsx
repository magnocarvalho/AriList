import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Container } from "native-base";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";

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
      <Container>
        <View style={styles.container}>
          <Text style={styles.texto}>Olá, Seja</Text>
          <Text style={styles.texto}>Bem vindo!</Text>
        </View>
      </Container>
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
