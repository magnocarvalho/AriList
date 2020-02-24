import React, { useEffect, useState, useLayoutEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  Button,
  ScrollView,
  TouchableOpacity,
  Animated
} from "react-native";

import BotaoInicial from "../components/botaoInicial";
import { navigate } from "../router/Navigation";

const Inicio = () => {
  const ola = "Olá, Escolha o seu\nSetor de Registro:";
  const opacity = new Animated.Value(0);
  const botao1 = new Animated.Value(0);
  const botao2 = new Animated.Value(0);
  const botao3 = new Animated.Value(0);
  useEffect(() => {
    return Animated.timing(opacity, {
      toValue: 1,
      duration: 1000
    }).start();
  }, []);

  useEffect(() => {
    return Animated.timing(botao1, {
      toValue: 1,
      duration: 1000
    }).start();
  }, []);

  useLayoutEffect(() => {
    return Animated.timing(botao2, {
      toValue: 1,
      duration: 1000
    }).start();

    [];
  });
  useLayoutEffect(() => {
    return Animated.timing(botao3, {
      toValue: 1,

      duration: 1000
    }).start();
    [];
  });
  const estilo = StyleSheet.create({
    page: {
      flex: 1,
      backgroundColor: "#fff"
    },
    controle: {
      flex: 1,
      // justifyContent: "center",
      // alignItems: "stretch",
      // alignSelf: "center",
      elevation: 5,
      padding: 30
    },
    divprinciapl: {
      flex: 1,
      alignSelf: "stretch",
      justifyContent: "center",
      flexDirection: "column"
    },
    titulo: {
      fontSize: 30,
      textAlign: "left",
      alignItems: "center",
      alignSelf: "center",
      paddingVertical: 20,
      paddingRight: 20,
      color: "#195283",
      minWidth: 120
    }
  });

  const escolha = () => {
    return navigate("Servicos");
  };

  return (
    <View style={estilo.page}>
      <ScrollView>
        <View style={estilo.divprinciapl}>
          <View style={estilo.controle}>
            <Text style={estilo.titulo}>
              <Animated.Text style={{ opacity }}>{ola}</Animated.Text>
            </Text>
            <Animated.View style={{ opacity: botao1 }}>
              <BotaoInicial
                numero={"1°"}
                nome={"SRI"}
                escolha={() => escolha()}
              ></BotaoInicial>
            </Animated.View>
            <Animated.View style={{ opacity: botao2 }}>
              <BotaoInicial numero={"2°"} nome={"SRI"}></BotaoInicial>
            </Animated.View>
            <Animated.View style={{ opacity: botao3 }}>
              <BotaoInicial numero={"3°"} nome={"SRI"}></BotaoInicial>
            </Animated.View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Inicio;
