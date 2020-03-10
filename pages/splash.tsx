import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Animated } from "react-native";
import { navigate } from "../router/Navigation";
import * as SecureStore from "expo-secure-store";
import * as firebase from "firebase";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyD_ya1LE-M2so3OrcpgaxKmAUY2BqvDgB8",
  authDomain: "arilist.firebaseapp.com",
  databaseURL: "https://arilist.firebaseio.com",
  projectId: "arilist",
  storageBucket: "arilist.appspot.com",
  messagingSenderId: "171590076680",
  appId: "1:171590076680:web:162d6d6b8bdda3696cc4bd",
  measurementId: "G-TWZCQT82WL"
};

const SplashScreen = () => {
  const welcome = ", Seja\nBem Vindo!";
  const opacity = new Animated.Value(0);
  const [fb_test, setFbTeste] = useState(false);
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
    if (!fb_test) return;
    Animated.timing(opacity, {
      toValue: 1,
      duration: 1000
    }).start();
  }, [fb_test]);

  useEffect(() => {
    fb_login();
  }, []);

  useEffect(() => {
    if (!fb_test) return;
    setTimeout(
      () => {
        SecureStore.getItemAsync("zona").then(async tipo => {
          // console.log("zona", tipo);
          // if (tipo) {
          //   navigate("Servicos", { tipo: tipo });
          // } else {
          navigate("Login");
          // }
        });
      },
      __DEV__ ? 1000 : 2500
    );
  }, [fb_test]);

  const fb_login = async () => {
    try {
      if (!firebase.apps.length) {
        await firebase.initializeApp(firebaseConfig);
        console.log(firebase.SDK_VERSION, firebase.app().name);
      }
    } catch (error) {
      alert("Erro ao conectar com os servidores da aplicação");
    } finally {
      setFbTeste(true);
    }
  };
  return (
    <View style={styles.con}>
      <Text style={styles.texto}>
        Olá<Animated.Text style={{ opacity }}>{welcome}</Animated.Text>
      </Text>
    </View>
  );
};

export default SplashScreen;
