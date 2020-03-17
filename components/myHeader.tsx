import { Appbar, IconButton, Avatar, Text } from "react-native-paper";
import { navigateBack, navigate } from "../router/Navigation";
import { StatusBar } from "react-native";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
  renderers
} from "react-native-popup-menu";
import React, { useState } from "react";
import { getUsuario, logoutFB } from "../services/firebaseServices";

const MyHeader = ({ goBack, titulo = null, tocarImob = null }) => {
  const [openMenu, setopenMenu] = useState(false);
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
          {tocarImob && (
            <MenuOption
              onSelect={() => {
                if (tocarImob) tocarImob();
              }}
            >
              <Text style={{ fontSize: 20, paddingVertical: 5 }}>
                Trocar imobiliaria
              </Text>
            </MenuOption>
          )}
          <MenuOption onSelect={() => sairDoApp()}>
            <Text style={{ fontSize: 20, paddingVertical: 5 }}>Sair</Text>
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
    </>
  );
};
export default MyHeader;
