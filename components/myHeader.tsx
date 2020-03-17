import { Appbar, IconButton, Avatar } from "react-native-paper";
import { navigateBack } from "../router/Navigation";
import { StatusBar, Text } from "react-native";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger
} from "react-native-popup-menu";
import React, { useState } from "react";

const MyHeader = ({ goBack, titulo = null }) => {
  const [openMenu, setopenMenu] = useState(false);
  const _handleSearch = () => console.log("Searching");

  const MenuCTRL = () => {
    return (
      <Menu opened={openMenu}>
        <MenuTrigger>
          <Appbar.Action
            icon="dots-vertical"
            onPress={() => setopenMenu(!openMenu)}
          />
        </MenuTrigger>
        <MenuOptions>
          <MenuOption onSelect={() => alert(`Save`)} text="Save" />
          <MenuOption onSelect={() => alert(`Delete`)}>
            <Text style={{ color: "red" }}>Sair</Text>
          </MenuOption>
          <MenuOption
            onSelect={() => alert(`Not called`)}
            disabled={true}
            text="Disabled"
          />
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
