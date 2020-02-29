import React, { useEffect, useState, useLayoutEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  Button,
  ScrollView,
  TouchableOpacity,
  Animated,
  StatusBar
} from "react-native";

import BotaoInicial from "../components/botaoInicial";
import { navigate } from "../router/Navigation";
import { Card, Avatar } from "react-native-paper";
import { getLocation } from "../services/localizacao";

const Inicio = () => {
  const estilo = StyleSheet.create({
    texto: {
      fontSize: 25,
      textAlign: "center",
      marginHorizontal: 5,
      alignSelf: "flex-start",
      color: "#FFF",
      marginTop: 30
    }
  });
  return (
    <>
      <StatusBar barStyle="light-content"></StatusBar>
      <View style={{ flex: 1, backgroundColor: "#009bdb" }}>
        <View
          style={{
            flex: 1,
            alignSelf: "stretch",
            alignItems: "stretch",
            alignContent: "space-between",
            paddingHorizontal: 5,
            justifyContent: "space-evenly"
          }}
        >
          <View>
            <Text style={estilo.texto}>
              Antes de começarmos, precisamos que informe a localização do
              imovel a ser atendido, nas opçoes abaixo:
            </Text>
          </View>
          <View>
            <TouchableOpacity
              onPress={() => {
                getLocation();
              }}
            >
              <Card
                style={{
                  margin: 5,
                  elevation: 5
                }}
              >
                <Card.Title
                  title="Minha localização"
                  left={props => (
                    <Avatar.Icon {...props} icon="crosshairs-gps" />
                  )}
                ></Card.Title>
              </Card>
            </TouchableOpacity>
            <Text
              style={{
                textAlign: "center",
                marginHorizontal: 5,
                marginVertical: 10,
                alignSelf: "center",
                fontSize: 17,
                color: "#fff"
              }}
            >
              OU
            </Text>
            <Card
              style={{
                margin: 5,
                elevation: 5
              }}
            >
              <Card.Title
                title="Informar o endereço"
                left={props => <Avatar.Icon {...props} icon="google-maps" />}
              ></Card.Title>
            </Card>
          </View>
        </View>
      </View>
    </>
  );
};

export default Inicio;
