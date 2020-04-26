import React from 'react';
import PropTypes from 'prop-types';
import { GoogleApiWrapper, Map, Marker } from 'google-maps-react';

const GoogleMap = (props) => {
  const { location } = props;
  const containerStyle = {
    position: 'relative',
  };
  const mapStyle = {
    position: 'relative',
    width: '100%',
    height: '100%',
  };

  return (
    <div className="google-map">
      <Map
        // eslint-disable-next-line react/prop-types
        google={props.google}
        zoom={14}
        center={location}
        initialCenter={location}
        containerStyle={containerStyle}
        style={mapStyle}
      >
        <Marker title={'検索結果'} position={location} />
      </Map>
    </div>
  );
};

GoogleMap.propTypes = {
  location: PropTypes.objectOf(PropTypes.number).isRequired,
};

export default GoogleApiWrapper({
  // eslint-disable-next-line no-undef
  apiKey: process.env.REACT_APP_GEO_APIKEY,
})(GoogleMap);
