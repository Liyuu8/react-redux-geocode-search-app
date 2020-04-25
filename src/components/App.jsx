import React, { Component } from 'react';
import axios from 'axios';

import SearchForm from './SearchForm';
import GeocodeResult from './GeocodeResult';
import GoogleMap from './GoogleMap';

const GEOCODE_ENDPOINT = 'https://maps.googleapis.com/maps/api/geocode/json';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  setErrorMessage(message) {
    this.setState({
      address: message,
      lat: 0,
      lng: 0,
    });
  }

  handlePlaceSubmit(place) {
    axios
      .get(GEOCODE_ENDPOINT, {
        params: {
          address: place,
          // eslint-disable-next-line no-undef
          key: process.env.REACT_APP_GEO_APIKEY,
        },
      })
      .then((results) => {
        console.log(results);
        const data = results.data;
        const result = results.data.results[0];
        switch (data.status) {
          case 'OK':
            this.setState({
              address: result.formatted_address,
              lat: result.geometry.location.lat,
              lng: result.geometry.location.lng,
            });
            break;
          case 'ZERO_RESULTS':
            this.setErrorMessage('No Results.');
            break;
          default:
            this.setErrorMessage('Error!!');
            break;
        }
      })
      .catch(() => {
        this.setErrorMessage('No Signal.');
      });
  }

  render() {
    const lat = this.state.lat;
    const lng = this.state.lng;

    return (
      <div>
        <h1>緯度経度検索</h1>
        <SearchForm onSubmit={(place) => this.handlePlaceSubmit(place)} />
        <GeocodeResult address={this.state.address} lat={lat} lng={lng} />
        <GoogleMap lat={lat} lng={lng} />
      </div>
    );
  }
}

export default App;
