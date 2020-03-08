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
import { Button, TextInput, IconButton, Snackbar } from "react-native-paper";
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

const EmailPage = () => {
  const [email, setEmail] = useState("");
  const [senha1, setsenha1] = useState("");
  const [senha2, setsenha2] = useState("");
  const [senha3, setsenha3] = useState("");
  const [tipoLogin, setTipo] = useState(0);
  const [loadings, setLoad] = useState(false);
  const [erroSnack, seterroSnack] = useState(false);
  const [erroMensagem, setErroMensagem] = useState("");
  const [senhas, setsenhas] = useState(false);
  const ref1 = useRef(null);
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
      ref1.current.focus();
    }, 300);
  }, []);
  useEffect(() => {
    setTimeout(() => {
      setLoad(false);
    }, 10000);
  }, [loadings]);

  const validarSenhas = () => {
    if (senha1 === senha2 && senha1.length > 6 && senha2.length > 6) {
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

  const confirmar = async () => {
    setLoad(true);
    if (validate(email) && validarSenhas()) {
      criarUsuario(email, senha1)
        .then(async em => {
          console.log(em);
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

  const validate = text => {
    // console.log(text);
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(text) === false) {
      setErroMensagem("Email is Not Correct");
      // this.setState({ email: text });
      seterroSnack(true);
      return false;
    } else {
      // this.setState({ email: text });
      return true;
    }
  };

  const checkEmail = async () => {
    setLoad(true);
    if (validate(email)) {
      checkEmailUsuario(email)
        .then(async em => {
          console.log(em);
          if (em.length == 0) {
            await setTipo(1);
            await ref2.current.focus();
          } else {
            setTipo(2);
          }
        })
        .catch(async e => {
          await setErroMensagem(e.message);
          await seterroSnack(true);
        })
        .finally(() => setLoad(false));
    } else {
      setLoad(false);
    }
  };

  const fazerLoginFB = async () => {
    setLoad(true);
    if (validate(email) && senha3.length > 6) {
      fazerLogin(email, senha3)
        .then(user => {
          console.log(user);
        })
        .catch(async e => {
          await setErroMensagem(e.message);
          await seterroSnack(true);
        })
        .finally(() => setLoad(false));
    } else {
      setLoad(false);
    }
  };

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
          label="Email"
          placeholder="Email"
          value={email}
          keyboardType="email-address"
          onChangeText={setEmail}
          blurOnSubmit={false}
          returnKeyType="next"
          onSubmitEditing={() => checkEmail()}
        />
        {tipoLogin == 1 && (
          <>
            <TextInput
              style={estilo.inputs}
              label="Senha"
              placeholder="Senha"
              ref={ref2}
              value={senha1}
              onChangeText={setsenha1}
              blurOnSubmit={false}
              secureTextEntry={true}
              onSubmitEditing={() => ref3.current.focus()}
            />
            <TextInput
              style={estilo.inputs}
              label="Confirmar a Senha"
              placeholder="Confirmar Senha"
              value={senha2}
              ref={ref3}
              blurOnSubmit={true}
              secureTextEntry={true}
              onChangeText={setsenha2}
              onSubmitEditing={() => confirmar()}
            />
          </>
        )}
        {tipoLogin == 2 && (
          <TextInput
            style={estilo.inputs}
            label="Senha"
            placeholder="Senha"
            ref={ref2}
            value={senha3}
            onChangeText={setsenha3}
            blurOnSubmit={false}
            secureTextEntry={true}
            onSubmitEditing={() => fazerLoginFB()}
          />
        )}
      </ScrollView>
      {senhas && (
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
            backgroundColor: "#009beb"
          }}
        >
          <TouchableOpacity
            onPress={() => confirmar()}
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
            onPress={checkEmail}
            color="#fff"
            style={{ alignSelf: "flex-end" }}
            icon="arrow-right"
          ></IconButton>
        </View>
      )}
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

export default EmailPage;
