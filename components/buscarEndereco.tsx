import { View } from "react-native";
import React, { useState, useEffect } from "react";
import Gsearch from "./gsearch";
import { navigate, getNavigator } from "../router/Navigation";
import {
  handleAndroidBackButton,
  removeAndroidBackButtonHandler
} from "../router/androidBackButton";
import useGSearch from "../services/useGSearch";

const BuscarEndereco = ({ location, onLocationSelected }) => {
  
  useEffect(() => {
    handleAndroidBackButton(() => navigate("Inicio"));
    return removeAndroidBackButtonHandler;
  }, []);

  useEffect(() => {
    // console.log("local", { location });
  }, []);

  return (
    <View style={{ width: "100%" }}>
      <Gsearch
        location={location}
        onLocationSelected={(data, details = null) =>
          onLocationSelected(data, details)
        }
        placeholder="Digite o endereco"
      ></Gsearch>
    </View>
  );
};
export default BuscarEndereco;
