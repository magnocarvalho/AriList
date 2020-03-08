import React, { useEffect, useState, useLayoutEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  Animated,
  Image,
  TextInput
} from "react-native";
import { Button, IconButton } from "react-native-paper";
import BotaoInicial from "../components/botaoInicial";
import { navigate } from "../router/Navigation";
import { Card } from "react-native-paper";
import { googleLogin } from "../services/googleSignIn";
import MyHeader from "../components/myHeader";

const EmailPage = () => {
  const [email, setEmail] = useState("");
  const [senha1, setsenha1] = useState("");
  const [senha2, setsenha2] = useState("");
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);

  const estilo = StyleSheet.create({
    page: {
      flex: 1,
      backgroundColor: "#fff"
    },
    inputs: {
      margin: 10,
      borderColor: "#111",
      borderWidth: 1,
      fontSize: 20,
      padding: 5
    }
  });
  useEffect(() => {
    setTimeout(() => {
      ref1.current.focus();
    }, 300);
  }, []);

  return (
    <View style={estilo.page}>
      <MyHeader
        goBack={() => navigate("Login")}
        titulo="Insira seu email"
      ></MyHeader>
      <ScrollView>
        <TextInput
          style={estilo.inputs}
          ref={ref1}
          placeholder="Email"
          value={email}
          keyboardType="email-address"
          onChangeText={setEmail}
          blurOnSubmit={false}
          onSubmitEditing={() => ref2.current.focus()}
        />
        <TextInput
          style={estilo.inputs}
          placeholder="Senha"
          ref={ref2}
          value={senha1}
          onChangeText={setsenha1}
          secureTextEntry={true}
          onSubmitEditing={() => ref3.current.focus()}
        />
        <TextInput
          style={estilo.inputs}
          placeholder="Confirmar Senha"
          value={senha2}
          ref={ref3}
          secureTextEntry={true}
          onChangeText={setsenha2}
        />
      </ScrollView>
      <View
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          flex: 1,
          flexDirection: "row",
          alignItems: "stretch",
          alignContent: "space-between",
          backgroundColor: "green"
        }}
      >
        <Text style={{ alignSelf: "flex-start" }}>Proximo</Text>
        <IconButton
          style={{ alignSelf: "flex-end" }}
          icon="arrow-right"
        ></IconButton>
      </View>
    </View>
  );
};

export default EmailPage;
