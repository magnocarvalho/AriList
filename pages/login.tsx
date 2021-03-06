import React, { useEffect, useState, useLayoutEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  Animated,
  Image
} from "react-native";
import { Button, Snackbar } from "react-native-paper";
import BotaoInicial from "../components/botaoInicial";
import { navigate } from "../router/Navigation";
import { Card } from "react-native-paper";
import { googleLogin } from "../services/googleSignIn";
import {
  handleAndroidBackButton,
  removeAndroidBackButtonHandler
} from "../router/androidBackButton";
import { LinearGradient } from "expo-linear-gradient";

const Login = () => {
  const estilo = StyleSheet.create({
    page: {
      flex: 1,
      flexGrow: 1,
      flexDirection: "column",
      justifyContent: "flex-start",
      backgroundColor: "#fff"
    }
  });
  const [erros, seterros] = useState(null);

  const googleLogins = async () => {
    try {
      const usuario = await googleLogin();
      if (usuario) {
        navigate("Inicio");
      } else throw "Error";
    } catch (error) {
      seterros(true);
    }
    // return navigate("Inicio");
  };
  // const
  useEffect(() => {
    handleAndroidBackButton(() => navigate("Login"));
    return removeAndroidBackButtonHandler;
  }, []);

  return (
    <View style={estilo.page}>
      <ScrollView>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            alignSelf: "center"
          }}
        >
          <TouchableOpacity onPress={() => {}}>
            <Image
              resizeMode="center"
              source={require("../assets/icon.png")}
            ></Image>
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1, alignItems: "center" }}>
          <Button
            color="red"
            icon="google"
            mode="outlined"
            labelStyle={{ fontSize: 18 }}
            style={{ marginBottom: 20 }}
            onPress={() => googleLogins()}
          >
            Google login
          </Button>
          <Button
            icon="email"
            labelStyle={{ fontSize: 18 }}
            mode="outlined"
            onPress={() => navigate("EmailPage")}
            style={{ marginBottom: 40 }}
          >
            Email login
          </Button>
        </View>
      </ScrollView>
      <Snackbar
        style={{ backgroundColor: "red" }}
        visible={erros}
        onDismiss={() => seterros(false)}
      >
        Falha no login do Google
      </Snackbar>
    </View>
  );
};

export default Login;
