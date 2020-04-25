import React from 'react';
import PropTypes from 'prop-types';
import { GoogleApiWrapper, Map, Marker } from 'google-maps-react';

const GoogleMap = (props) => {
  const { location } = props;

  return (
    <Map
      // eslint-disable-next-line react/prop-types
      google={props.google}
      zoom={14}
      center={location}
      initialCenter={location}
    >
      <Marker title={'検索結果'} position={location} />
    </Map>
  );
};

GoogleMap.propTypes = {
  location: PropTypes.objectOf(PropTypes.number).isRequired,
};

export default GoogleApiWrapper({
  // eslint-disable-next-line no-undef
  apiKey: process.env.REACT_APP_GEO_APIKEY,
})(GoogleMap);
