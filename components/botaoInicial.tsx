import React, { useEffect, useState } from "react";

import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  Animated
} from "react-native";

const BotaoInicial = ({ nome, numero, escolha = null }) => {
  const estilo = StyleSheet.create({
    botoes: {
      paddingHorizontal: 20,
      paddingBottom: 10,
      paddingTop: 7,
      borderRadius: 5
    },
    botao: {
      borderRadius: 5,
      backgroundColor: "#fff",
      flex: 1,
      flexDirection: "row",
      height: 61,
      alignSelf: "stretch",
      justifyContent: "space-between",
      marginVertical: 5
    },
    textBotao: {
      fontSize: 25,
      color: "#fff",
      flex: 1,
      alignSelf: "center",
      textAlign: "center",
      alignContent: "center",
      alignItems: "center"
    }
  });
  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          escolha ? escolha() : alert("apenas para teste use 2º regiao");
        }}
      >
        <View style={estilo.botao}>
          <View
            style={[
              estilo.botoes,
              {
                backgroundColor: "#d78d12",
                alignItems: "center",
                alignContent: "center",
                marginRight: 10
              }
            ]}
          >
            <Text style={[estilo.textBotao]}>{numero}</Text>
          </View>
          <View
            style={[estilo.botoes, { backgroundColor: "#009bdb", flex: 1 }]}
          >
            <Text style={[estilo.textBotao]}>{nome}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};
export default BotaoInicial;
