import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { Modal, Title } from "react-native-paper";

const ModalImobiliaria = ({ open = false }) => {
  useEffect(() => {
    // console.log("local", { location });
  }, []);

  return (
    <Modal visible={open} dismissable={true}>
      <View>
        <Title>1º Ofício de Imóveis</Title>
        <Title>2º Ofício de Imóveis</Title>
        <Title>3° Ofício de Registro de Imóveis</Title>
      </View>
    </Modal>
  );
};
export default ModalImobiliaria;
