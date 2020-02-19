import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";

const SplashScreen = () => {
  let styles = StyleSheet.create({
    texto: {
      color: "#fff",
      fontSize: 40
    },
    con: {}
  });
//   useEffect()
  return (
    <View style={styles.con}>
      <Text style={styles.texto}>Olá, Seja</Text>
      <Text style={styles.texto}>Bem vindo!</Text>
    </View>
  );
};

export default SplashScreen;
