import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Animated } from "react-native";
import { navigate } from "../router/Navigation";

const SplashScreen = () => {
  const welcome = ", Seja\nBem Vindo!";
  const opacity = new Animated.Value(0);
  let styles = StyleSheet.create({
    texto: {
      color: "#fff",
      fontSize: 40,
      alignItems: "center",
      textAlign: "center"
    },
    con: { alignItems: "center", textAlign: "center" }
  });

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 1000
    }).start();
  }, []);

  useEffect(() => {
    setTimeout(
      () => {
        navigate("Servicos");
      },
      __DEV__ ? 1000 : 2000
    );
  }, []);

  return (
    <View style={styles.con}>
      <Text style={styles.texto}>
        Olá<Animated.Text style={{ opacity }}>{welcome}</Animated.Text>
      </Text>
    </View>
  );
};

export default SplashScreen;
