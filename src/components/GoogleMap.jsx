import React from 'react';
import PropTypes from 'prop-types';
import { GoogleApiWrapper, Map, Marker } from 'google-maps-react';

const GoogleMap = (props) => {
  const { lat, lng } = props;
  const position = { lat, lng };

  return (
    <Map
      google={props.google}
      zoom={14}
      center={position}
      initialCenter={position}
    >
      <Marker title={'検索結果'} position={position} />
    </Map>
  );
};

GoogleMap.propTypes = {
  lat: PropTypes.number,
  lng: PropTypes.number,
};

GoogleMap.defaultProps = {
  lat: 35.6585805,
  lng: 139.7454329,
};

export default GoogleApiWrapper({
  // eslint-disable-next-line no-undef
  apiKey: process.env.REACT_APP_GEO_APIKEY,
})(GoogleMap);
