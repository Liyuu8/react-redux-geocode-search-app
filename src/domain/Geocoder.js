import axios from 'axios';

const GEOCODE_ENDPOINT = 'https://maps.googleapis.com/maps/api/geocode/json';

export const geocode = (place) =>
  axios
    .get(GEOCODE_ENDPOINT, {
      params: {
        address: place,
        // eslint-disable-next-line no-undef
        key: process.env.REACT_APP_GEO_APIKEY,
      },
    })
    .then((results) => {
      const status = results.data.status;
      const result = results.data.results[0];

      if (typeof status === 'undefined') {
        return { status };
      }

      const address = result.formatted_address;
      const location = result.geometry.location;

      return { status, address, location };
    });

export const reverseGeocode = () => null;
