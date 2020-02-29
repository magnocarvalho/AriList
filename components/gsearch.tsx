import React, { useState, useRef } from "react";
import PropTypes from "prop-types";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { TouchableOpacity, Platform } from "react-native";

const Gsearch = ({ placeholder, onLocationSelected, location, ...props }) => {
  const [searchFocused, setSearchFocused] = useState(false);

  return (
    <GooglePlacesAutocomplete
      {...props}
      latitude={location.latitude}
      longitude={location.longitude}
      placeholder={placeholder}
      keyboardAppearance={"light"} // Can be left out for default keyboardAppearance https://facebook.github.io/react-native/docs/textinput.html#keyboardappearance
      listViewDisplayed="auto"
      autoFocus={true}
      returnKeyType={"search"}
      onPress={(data, details = null) => onLocationSelected(data, details)}
      minLength={2}
      query={{
        key: "AIzaSyCQ60TcO17x5w7bLKVTWXfLIenYuudetoE",
        language: "pt",
        country: "br",
        location: `${location.latitude},${location.longitude}`,
        radius: 50000
      }}
      fetchDetails={true}
      currentLocation={false} // Will add a 'Current location' button at the top of the predefined places list
      nearbyPlacesAPI="GoogleReverseGeocoding"
      enablePoweredByContainer={false}
      GooglePlacesDetailsQuery={{
        // available options for GooglePlacesDetails API : https://developers.google.com/places/web-service/details
        fields: ["formatted_address", "geometry"]
      }}
      styles={{
        container: {
          flex: 1,
          width: "100%",
          padding: 0,
          margin: 0,
          zIndex: 100
        },
        textInputContainer: {
          borderRadius: 10,
          width: "100%",
          height: 70,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "white",
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10
        },
        textInput: {
          width: "100%",
          height: 60,
          justifyContent: "center",
          alignItems: "center",
          margin: 0,
          backgroundColor: "white",
          padding: 30,
          color: "#616161"
        },
        listView: {
          width: "100%",
          backgroundColor: "#FFF",
          borderRadius: 5,
          marginBottom: 5
        },
        row: {
          padding: 13,
          height: 50,
          flexDirection: "row"
        },
        description: {
          color: "#616161"
        }
      }}
    />
  );
};

Gsearch.propTypes = {
  onLocationSelected: PropTypes.func.isRequired,
  frase: PropTypes.string
};

export default Gsearch;
