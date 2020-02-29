import {
  View,
  Text,
  ScrollView,
  Dimensions,
  StyleSheet,
  StatusBar,
  TextInput,
  TouchableOpacity,
  Modal
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
import useKeyboardListener from "../components/useKeyboardListener";

const MapaEndereco = ({ navigation }) => {
  const location = navigation.getParam("location");
  const [titulo, setTitulo] = useState("Porto Velho");
  const [loading, setloading] = useState(false);
  const [regiao, setRegiao] = useState(null);
  const [latitude, setlatitude] = useState(-8.770818);
  const [longitude, setlongitude] = useState(-63.883033);
  const [validade, setvalidade] = useState(false);
  const [modalOpen, setModalOpen] = useState(true);
  const { filter } = useGSearch();
  const { focus } = useKeyboardListener();
  const coordenadas1 = cordenates.primeiro;
  
  useEffect(() => {
    handleAndroidBackButton(() => navigate("Inicio"));
    return removeAndroidBackButtonHandler;
  }, []);

  const checkLocal = async ponto => {
    let { inside, tipo } = await testPoint(ponto);
    if (inside) {
      console.log("true");
      setvalidade(true);
    } else {
      setvalidade(false);
      console.log("falso");
    }
  };

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

      const ponto = [lng, lat];
      checkLocal(ponto);

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
    },
    texto: {
      color: "#fff",
      fontSize: 18,
      textAlign: "center",
      marginVertical: 5
    }
  });

  const MyMarker = () => {
    return (
      <Marker
        title={titulo}
        // description={description}
        draggable
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
        {!focus && !modalOpen && (
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              position: "absolute",
              bottom: 50,
              alignSelf: "center",
              alignItems: "center",
              alignContent: "center",
              zIndex: 20
            }}
          >
            <TouchableOpacity
              style={{ alignSelf: "center", opacity: validade ? 1 : 0.4 }}
            >
              <View
                style={{
                  borderRadius: 10,
                  backgroundColor: "#009bdb",
                  paddingHorizontal: 45,
                  paddingVertical: 15,
                  alignSelf: "center"
                }}
              >
                <Text style={{ fontSize: 20 }}>
                  {!validade ? "Endereço Invalido" : "Continuar"}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        )}
        <Modal animationType="fade" transparent={true} visible={modalOpen}>
          <View
            style={{
              flex: 1,
              alignSelf: "center",
              alignContent: "center",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <View
              style={{
                alignSelf: "center",
                elevation: 5,
                borderRadius: 10,
                margin: 20,
                alignItems: "center",
                alignContent: "center",
                backgroundColor: "#009bdb",
                padding: 30
              }}
            >
              <Text style={styles.texto}>
                Digite o endereço completo do imovel no componente acima
              </Text>
              <Text style={styles.texto}>ou</Text>
              <Text style={styles.texto}>
                Click no ponteiro e mova ate seu imovel
              </Text>
              <TouchableOpacity onPress={() => setModalOpen(false)}>
                <View
                  style={{
                    alignSelf: "center",
                    elevation: 5,
                    borderRadius: 10,
                    alignItems: "center",
                    alignContent: "center",
                    backgroundColor: "#359b3b",
                    paddingHorizontal: 15,
                    paddingVertical: 8
                  }}
                >
                  <Text style={styles.texto}>Continuar</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </>
  );
};
export default MapaEndereco;
