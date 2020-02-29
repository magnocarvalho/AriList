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
import Spinner from "react-native-loading-spinner-overlay";
import BotaoInicial from "../components/botaoInicial";
import { navigate } from "../router/Navigation";
import { Card, Avatar } from "react-native-paper";
import { getLocation } from "../services/localizacao";

const Inicio = () => {
  const [load, setload] = useState(false);
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
        <Spinner
          visible={load}
          textContent={"Carregando..."}
          textStyle={{ fontSize: 18, color: "#FFF" }}
          overlayColor="#009beb"
          animation="fade"
          color="#FFF"
        />
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
              Antes de começarmos, precisamos que informe a endereço do imovel a
              ser atendido, nas opçoes abaixo
            </Text>
          </View>
          <View>
            <Card
              style={{
                margin: 5,
                elevation: 5
              }}
            >
              <TouchableOpacity
                onPress={async () => {
                  setload(true);
                  const local = await getLocation();
                  setload(false);
                }}
              >
                <Card.Title
                  title="Minha localização"
                  left={props => (
                    <Avatar.Icon {...props} icon="crosshairs-gps" />
                  )}
                ></Card.Title>
              </TouchableOpacity>
            </Card>
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
              <TouchableOpacity
                onPress={() => {
                  navigate("MapaEndereco");
                }}
              >
                <Card.Title
                  title="Informar o endereço"
                  left={props => <Avatar.Icon {...props} icon="google-maps" />}
                ></Card.Title>
              </TouchableOpacity>
            </Card>
          </View>
        </View>
      </View>
    </>
  );
};

export default Inicio;
