import {
  View,
  Text,
  ScrollView,
  Dimensions,
  StyleSheet,
  StatusBar,
  TextInput
} from "react-native";
import React, { useEffect, useState } from "react";
import MyHeader from "../components/myHeader";
import BotaoServicos from "../components/botaoServicos";
import { navigate } from "../router/Navigation";
import MapView, { Marker } from "react-native-maps";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

import {
  handleAndroidBackButton,
  removeAndroidBackButtonHandler
} from "../router/androidBackButton";
import BuscarEndereco from "../components/buscarEndereco";
import useGSearch from "../services/useGSearch";
import cordenates from "../cordenates.json";
import { isMarkerInsidePolygon, testPoint } from "../services/calculePolygon";

const MapaEndereco = ({ navigation }) => {
  const location = navigation.getParam("location");
  const [titulo, setTitulo] = useState("Porto Velho");
  const [loading, setloading] = useState(false);
  const [regiao, setRegiao] = useState({
    latitude: -8.770818,
    longitude: -63.883033,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421
  });
  const [latitude, setlatitude] = useState(-8.770818);
  const [longitude, setlongitude] = useState(-63.883033);
  const [validade, setvalidade] = useState(false);
  const { filter } = useGSearch();
  const coordenadas1 = cordenates.primeiro;
  useEffect(() => {
    handleAndroidBackButton(() => navigate("Inicio"));
    return removeAndroidBackButtonHandler;
  }, []);

  const onLocationSelected = async (data, details = null) => {
    try {
      setloading(true);
      // console.log("coordenadas1", coordenadas1.length);
      const { formatted_address } = details;
      const { coordinates, local } = await filter(details);

      const { lat, lng } = coordinates;
      // console.log({ coordinates, local, lat, lng });

      setlatitude(lat);
      setlongitude(lng);
      setRegiao({
        latitude: lat,
        longitude: lng,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
      });
      const ponto = [lng, lat];
      let { inside, tipo } = await testPoint(ponto);
      if (inside) {
        console.log("true");
      } else {
        console.log("falso");
      }
      setTitulo(formatted_address);
    } catch (error) {
      console.log(error);
    }
    setloading(false);
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

  const MyMarker = () => {
    return (
      <Marker
        title={titulo}
        // description={description}
        coordinate={{
          latitude: latitude,
          longitude: longitude
        }}
      ></Marker>
    );
  };
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
          <View style={{ flex: 1 }}>
            <Text style={{ margin: 5 }}>Digite seu endereço completo:</Text>
            <BuscarEndereco
              location={location}
              onLocationSelected={onLocationSelected}
            ></BuscarEndereco>
          </View>
        </View>
        <MapView
          style={styles.mapStyle}
          region={{
            latitude: latitude,
            longitude: longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
          }}
          provider="google"
          showsUserLocation={true}
          followsUserLocation={true}
          showsMyLocationButton={true}
          zoomEnabled={true}
          zoomControlEnabled={true}
          minZoomLevel={10}
          rotateEnabled={false}
          maxZoomLevel={20}
          loadingEnabled={true}
        >
          {!loading && latitude && longitude ? <MyMarker></MyMarker> : <></>}
        </MapView>
      </View>
    </>
  );
};
export default MapaEndereco;
