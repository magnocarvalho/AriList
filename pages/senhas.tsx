import React, { useEffect, useState, useLayoutEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  Animated,
  Image
} from "react-native";
import Spinner from "react-native-loading-spinner-overlay";
import {
  Button,
  TextInput,
  IconButton,
  Snackbar,
  Paragraph
} from "react-native-paper";
import BotaoInicial from "../components/botaoInicial";
import { navigate } from "../router/Navigation";
import { Card } from "react-native-paper";
import { googleLogin } from "../services/googleSignIn";
import MyHeader from "../components/myHeader";
import {
  criarUsuario,
  checkEmailUsuario,
  fazerLogin
} from "../services/firebaseServices";

const SenhasPage = ({ navigation }) => {
  const email = navigation.getParam("email");

  const [senha1, setsenha1] = useState(null);
  const [senha2, setsenha2] = useState(null);
  const [loadings, setLoad] = useState(false);
  const [erroSnack, seterroSnack] = useState(false);
  const [erroMensagem, setErroMensagem] = useState("");
  const [senhas, setsenhas] = useState(false);
  const ref2 = useRef(null);
  const ref3 = useRef(null);

  const estilo = StyleSheet.create({
    page: {
      flex: 1,
      backgroundColor: "#fff"
    },
    inputs: {
      margin: 10
    }
  });

  useEffect(() => {
    setTimeout(() => {
      ref2.current.focus();
    }, 300);
  }, []);
  useEffect(() => {
    setTimeout(() => {
      setLoad(false);
    }, 10000);
  }, [loadings]);

  const validarSenhas = () => {
    if (
      senha1 &&
      senha2 &&
      senha1 === senha2 &&
      senha1.length >= 6 &&
      senha2.length >= 6
    ) {
      setsenhas(true);
      return true;
    } else {
      setsenhas(false);
      return false;
    }
  };

  useEffect(() => {
    validarSenhas();
  }, [senha1, senha2]);

  const criarUser = async () => {
    setLoad(true);
    console.log(email, senha2);
    if (validarSenhas() && email && senhas) {
      criarUsuario(email, senha1)
        .then(async em => {
          console.log(em);
          setLoad(false)
          navigate("Inicio");
        })
        .catch(async e => {
          console.log(e);
          await setErroMensagem(e.message);
          await seterroSnack(true);
        })
        .finally(() => setLoad(false));
    } else {
      await setErroMensagem("Confira suas informações");
      await seterroSnack(true);
      setLoad(false);
    }
  };

  return (
    <View style={estilo.page}>
      <MyHeader
        goBack={() => navigate("EmailPage")}
        titulo="Insira sua senha"
      ></MyHeader>
      <ScrollView>
        <TextInput
          style={estilo.inputs}
          label="Senha"
          placeholder="Senha"
          ref={ref2}
          error={senha1 != null && senha2 != senha1}
          value={senha1}
          onChangeText={setsenha1}
          blurOnSubmit={false}
          maxLength={16}
          secureTextEntry={true}
          onSubmitEditing={() => ref3.current.focus()}
        />
        <TextInput
          style={estilo.inputs}
          label="Confirmar a Senha"
          placeholder="Confirmar Senha"
          error={senha2 != null && senha1 != senha2}
          value={senha2}
          ref={ref3}
          blurOnSubmit={true}
          secureTextEntry={true}
          maxLength={16}
          onChangeText={setsenha2}
          onSubmitEditing={() => criarUser()}
        />
        <Paragraph style={{ margin: 10, color: senhas ? "green" : "red" }}>
          {senhas
            ? "Senha escolhida correta"
            : "Crie uma senha com no minimo 6 caracteres"}
        </Paragraph>
      </ScrollView>
      <View
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          flex: 1,
          opacity: senhas ? 1 : 0.75,
          flexDirection: "row",
          alignItems: "stretch",
          alignContent: "space-between",
          backgroundColor: "#009beb"
        }}
      >
        <TouchableOpacity
          disabled={!senhas}
          onPress={() => criarUser()}
          style={{ flex: 1, alignSelf: "center" }}
        >
          <Text
            style={{
              alignSelf: "flex-start",
              color: "#fff",
              paddingLeft: 20,
              fontSize: 20
            }}
          >
            Proximo
          </Text>
        </TouchableOpacity>
        <IconButton
          disabled={!senhas}
          onPress={() => criarUser()}
          color="#fff"
          style={{ alignSelf: "flex-end" }}
          icon="arrow-right"
        ></IconButton>
      </View>
      <Spinner
        visible={loadings}
        textContent={"Carregando..."}
        textStyle={{ fontSize: 18, color: "#FFF" }}
        overlayColor="#009beb"
        animation="fade"
        color="#FFF"
      />
      <Snackbar
        style={{ backgroundColor: "red" }}
        visible={erroSnack}
        onDismiss={() => seterroSnack(false)}
      >
        Error! {erroMensagem}
      </Snackbar>
    </View>
  );
};

export default SenhasPage;
