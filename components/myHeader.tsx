import { Appbar, IconButton, Avatar, Text } from "react-native-paper";
import { navigateBack, navigate } from "../router/Navigation";
import { StatusBar, View } from "react-native";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
  renderers
} from "react-native-popup-menu";
import React, { useState } from "react";
import { getUsuario, logoutFB } from "../services/firebaseServices";
import { getLocation } from "../services/localizacao";
import Spinner from "react-native-loading-spinner-overlay";

const MyHeader = ({ goBack, titulo = null }) => {
  const [load, setload] = useState(false);
  const { SlideInMenu } = renderers;
  const _handleSearch = () => console.log("Searching");
  const sairDoApp = async () => {
    await logoutFB();
    navigate("Login");
  };

  const MenuCTRL = () => {
    return (
      <Menu>
        <MenuTrigger>
          <Avatar.Icon icon="dots-vertical" size={44} />
        </MenuTrigger>
        <MenuOptions>
          <MenuOption
            onSelect={async () => {
              setload(true);
              const local = await getLocation();
              setload(false);
              navigate("MapaEndereco", { location: local });
            }}
          >
            <Text
              style={{
                fontSize: 18,
                paddingVertical: 5,
                paddingHorizontal: 10,
                flex: 1
              }}
            >
              Trocar imobiliaria
            </Text>
          </MenuOption>
          <View
            style={{
              flex: 1,
              borderColor: "#eee",
              borderWidth: 1,
              opacity: 0.5
            }}
          ></View>
          <MenuOption onSelect={() => sairDoApp()}>
            <Text
              style={{
                fontSize: 18,
                paddingVertical: 5,
                paddingHorizontal: 10,
                flex: 1
              }}
            >
              Sair
            </Text>
          </MenuOption>
        </MenuOptions>
      </Menu>
    );
  };

  return (
    <>
      <Appbar.Header statusBarHeight={0}>
        <Appbar.BackAction onPress={() => goBack()} />
        <Appbar.Content title={titulo || "ARI List"} />
        <MenuCTRL></MenuCTRL>
      </Appbar.Header>
      <Spinner
        visible={load}
        textContent={"Carregando..."}
        textStyle={{ fontSize: 18, color: "#FFF" }}
        overlayColor="#009beb"
        animation="fade"
        color="#FFF"
      />
    </>
  );
};
export default MyHeader;
