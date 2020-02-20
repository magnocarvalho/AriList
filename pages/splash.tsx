import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Animated } from "react-native";

const SplashScreen = () => {
  const [welcome, setWelcome] = useState("Seja\nBem Vindo");

  let styles = StyleSheet.create({
    texto: {
      color: "#fff",
      fontSize: 40,
      alignItems: "center",
      textAlign: "center"
    },
    con: {}
  });

  useEffect(() => {
    setInterval(() => {
      setWelcome("");
    }, 500);
  }, []);

  return (
    <View style={styles.con}>
      <Text style={styles.texto}>
        Olá, <Animated.Text  />
      </Text>
    </View>
  );
};

export default SplashScreen;
