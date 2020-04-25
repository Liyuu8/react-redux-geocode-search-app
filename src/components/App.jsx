import React, { Component } from 'react';

import SearchForm from './SearchForm';
import GeocodeResult from './GeocodeResult';
import GoogleMap from './GoogleMap';

import { geocode } from '../domain/Geocoder';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { location: { lat: 35.6585805, lng: 139.7454329 } };
  }

  setErrorMessage(message) {
    this.setState({
      address: message,
      location: { lat: 0, lng: 0 },
    });
  }

  handlePlaceSubmit(place) {
    geocode(place)
      .then(({ status, address, location }) => {
        switch (status) {
          case 'OK':
            this.setState({ address, location });
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
    const location = this.state.location;

    return (
      <div>
        <h1>緯度経度検索</h1>
        <SearchForm onSubmit={(place) => this.handlePlaceSubmit(place)} />
        <GeocodeResult address={this.state.address} location={location} />
        <GoogleMap location={location} />
      </div>
    );
  }
}

export default App;
