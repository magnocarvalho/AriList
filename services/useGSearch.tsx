export default function useGSearch() {
  const filter = ({ address_components, geometry }) => {
    const coordinates = geometry.location;
    const local = address_components.reduce((current, next) => {
      const mapKeys = {
        street_number: "addressNumber",
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
        [mapKeys[validKey]]: next.short_name
      };
    }, {});

    return {
      local,
      coordinates
    };
  };

  return { filter };
}
