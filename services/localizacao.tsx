import axios from "axios";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import * as Constants from "expo-constants";

export const getCepInfo = async cep => {
  if (!cep) throw new Error();

  const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);

  const zipcode = response.data.cep;
  const address = response.data.logradouro;
  const city = response.data.localidade;
  const neighborhood = response.data.bairro;
  const state = response.data.uf;

  return {
    zipcode,
    address,
    city,
    neighborhood,
    state
  };
};

export const getGeocodeInfo = async data => {
  if (!data) throw new Error();

  const address = [
    data.street,
    data.address_number,
    data.city,
    data.state
  ].join(", ");

  const response = await axios
    .get("https://maps.googleapis.com/maps/api/geocode/json", {
      params: {
        address: address,
        key: "AIzaSyCQ60TcO17x5w7bLKVTWXfLIenYuudetoE",
        language: "pt-br"
      }
    })
    .catch(e => {
      console.log(e);
    });
  // console.log(response)

  const res = response ? response.data.results[0] : null;
  const coordinates = res.geometry.location;

  const filterResponse = res.address_components.reduce((current, next) => {
    const mapKeys = {
      street_number: "address_number",
      route: "address",
      sublocality_level_1: "neighborhood",
      administrative_area_level_2: "city",
      administrative_area_level_1: "state",
      country: "country",
      postal_code: "zipcode"
    };

    const [validKey] = next.types.filter(key =>
      Object.keys(mapKeys).includes(key)
    );

    if (!validKey) return current;

    return {
      ...current,
      [mapKeys[validKey]]: next.long_name
    };
  }, {});

  return {
    filterResponse,
    coordinates
  };
};

export const getReverseGeocode = async (lat, lon) => {
  const response = await axios.get(
    "https://maps.googleapis.com/maps/api/geocode/json",
    {
      params: {
        key: "AIzaSyCQ60TcO17x5w7bLKVTWXfLIenYuudetoE",
        latlng: `${lat},${lon}`,
        sen: true
      }
    }
  );

  const res = response.data.results[0];
  const coordinates = res.geometry.location;

  const filterResponse = res.address_components.reduce((current, next) => {
    const mapKeys = {
      street_number: "address_number",
      route: "address",
      sublocality_level_1: "neighborhood",
      administrative_area_level_2: "city",
      administrative_area_level_1: "state",
      country: "country",
      postal_code: "zipcode"
    };

    const [validKey] = next.types.filter(key =>
      Object.keys(mapKeys).includes(key)
    );

    if (!validKey) return current;

    return {
      ...current,
      [mapKeys[validKey]]: next.long_name
    };
  }, {});
  return {
    filterResponse,
    coordinates
  };
};

export const getLocation = async () => {
  try {
    const permissao = await LocationService();
    if (!permissao) throw "permisao negada";
    const { coords } = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Highest
    });
    console.log({ coords });
    return coords;
  } catch (err) {
    throw err;
  }
};

export const LocationService = async () => {
  try {
    // const isInClient = Constants.appOwnership === "expo";
    // if (isInClient) {
    //   console.log("Expo");
    // }
    const granted = await Permissions.askAsync(Permissions.LOCATION);
    console.log(granted);
    if (granted.status !== "granted") {
      console.log("location permission denied");
      return false;
    } else {
      console.log("You can use the location");
      // const location = await Location.getCurrentPositionAsync({});
      // this.setState({ location });
      return true;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};
