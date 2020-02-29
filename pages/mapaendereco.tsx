import {
  View,
  Text,
  ScrollView,
  Dimensions,
  StyleSheet,
  StatusBar,
  TextInput
} from "react-native";
import React, { useEffect } from "react";
import MyHeader from "../components/myHeader";
import BotaoServicos from "../components/botaoServicos";
import { navigate } from "../router/Navigation";
import MapView from "react-native-maps";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

import {
  handleAndroidBackButton,
  removeAndroidBackButtonHandler
} from "../router/androidBackButton";
import BuscarEndereco from "../components/buscarEndereco";
import useGSearch from "../services/useGSearch";

const MapaEndereco = ({ navigation }) => {
  const location = navigation.getParam("location");
  const { filter } = useGSearch();
  useEffect(() => {
    handleAndroidBackButton(() => navigate("Inicio"));
    return removeAndroidBackButtonHandler;
  }, []);

  const onLocationSelected = (data, details = null) => {
    // console.log({ data, details });
    const { coordinates, local } = filter(details);
    console.log({ coordinates, local });
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center"
    },
    mapStyle: {
      width: Dimensions.get("window").width,
      height: Dimensions.get("window").height
    }
  });
  return (
    <>
      <StatusBar></StatusBar>
      <View style={{ flex: 1, backgroundColor: "#fff" }}>
        <View
          style={{
            zIndex: 50,
            flex: 1,
            flexDirection: "row",
            top: 30,
            right: 10,
            left: 10,
            position: "absolute",
            backgroundColor: "#FFF",
            elevation: 8,
            borderRadius: 10
          }}
        >
          {/* <TextInput
            style={{
              margin: 8,
              flex: 1,
              flexDirection: "row",

              backgroundColor: "#fff"
            }}
          ></TextInput> */}
          <BuscarEndereco location={location} onLocationSelected={onLocationSelected}></BuscarEndereco>
        </View>
        <MapView
          style={styles.mapStyle}
          initialRegion={{
            latitude: -8.770818,
            longitude: -63.883033,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
          }}
          provider="google"
          mapView="hybrid"
          showsUserLocation={true}
          followsUserLocation={true}
          showsMyLocationButton={true}
          zoomEnabled={true}
          zoomControlEnabled={true}
          minZoomLevel={10}
          rotateEnabled={false}
          maxZoomLevel={20}
          loadingEnabled={true}
        />
      </View>
    </>
  );
};
export default MapaEndereco;
