import React, { useEffect, useState, useLayoutEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  Button,
  ScrollView,
  TouchableOpacity,
  Animated,
  Image
} from "react-native";

import BotaoInicial from "../components/botaoInicial";
import { navigate } from "../router/Navigation";
import { Card } from "react-native-paper";
import { googleLogin } from "../services/googleSignIn";

const Login = () => {
  const estilo = StyleSheet.create({
    page: {
      flex: 1,
      backgroundColor: "#fff"
    }
  });

  const escolha = () => {
    return navigate("Inicio");
  };

  return (
    <View style={estilo.page}>
      <ScrollView>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            backgroundColor: "red",
            alignItems: "center",
            alignSelf: "center"
          }}
        >
          <Image
            resizeMode="center"
            source={require("../assets/icon.png")}
          ></Image>
        </View>
        <Button title="login" color="#132"  onPress={() => googleLogin()}></Button>
      </ScrollView>
    </View>
  );
};

export default Login;
