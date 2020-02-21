import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Button,
  ScrollView,
  TouchableOpacity
} from "react-native";

import BotaoInicial from "../components/botaoInicial";
import { navigate } from "../router/Navigation";

const Inicio = () => {
  const ola = "Olá, Escolha\no seu SRI";
  const estilo = StyleSheet.create({
    page: {
      flex: 1,
      backgroundColor: "#fff"
    },
    controle: {
      flex: 1,
      justifyContent: "center",
      alignItems: "stretch",
      alignSelf: "center",
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
    navigate("Servicos");
  };

  return (
    <View style={estilo.page}>
      <View style={estilo.divprinciapl}>
        <View style={estilo.controle}>
          <Text style={estilo.titulo}>{ola}</Text>
          <BotaoInicial numero={"1"} nome={"Região"} escolha></BotaoInicial>
          <BotaoInicial numero={"2"} nome={"Região"}></BotaoInicial>
          <BotaoInicial numero={"3"} nome={"Região"}></BotaoInicial>
        </View>
      </View>
    </View>
  );
};

export default Inicio;
