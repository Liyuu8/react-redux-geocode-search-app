import React, { Component } from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import _ from 'lodash';

import SearchForm from './SearchForm';
import GeocodeResult from './GeocodeResult';
import GoogleMap from './GoogleMap';
import HotelsTable from './HotelsTable';

import { geocode } from '../domain/Geocoder';
import { searchHotelByLocation } from '../domain/HotelRepository';

const sortedHotels = (hotels, sortKey) =>
  _.sortBy(hotels, (hotel) => hotel[sortKey]);

class SearchPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      place: this.getPlaceParam() || '東京タワー',
      location: {
        lat: 35.6585805,
        lng: 139.7454329,
      },
      sortKey: 'price',
    };
  }

  componentDidMount() {
    const place = this.getPlaceParam();
    if (place) {
      this.startSearch();
    }
  }

  getPlaceParam() {
    const params = queryString.parse(this.props.location.search);
    const place = params.place;
    if (place && place.length > 0) {
      return place;
    }
    return null;
  }

  setErrorMessage(message) {
    this.setState({
      address: message,
      location: { lat: 0, lng: 0 },
    });
  }

  handlePlaceChange(place) {
    this.setState({ place });
  }

  handlePlaceSubmit(e) {
    e.preventDefault();
    this.props.history.push(`/?place=${this.state.place}`);
    this.startSearch();
  }

  startSearch() {
    geocode(this.state.place)
      .then(({ status, address, location }) => {
        switch (status) {
          case 'OK':
            this.setState({ address, location });
            return searchHotelByLocation(location);
          case 'ZERO_RESULTS':
            this.setErrorMessage('No Results.');
            break;
          default:
            this.setErrorMessage('Error!!');
            break;
        }
        return [];
      })
      .then((hotels) => {
        this.setState({ hotels: sortedHotels(hotels, this.state.sortKey) });
      })
      .catch(() => {
        this.setErrorMessage('No Signal.');
      });
  }

  handleSortKeyChange(sortKey) {
    this.setState({
      sortKey,
      hotels: sortedHotels(this.state.hotels, sortKey),
    });
  }

  render() {
    const location = this.state.location;

    return (
      <div className="search-page">
        <h1 className="app-title">ホテル検索</h1>
        <SearchForm
          place={this.state.place}
          onPlaceChange={(place) => this.handlePlaceChange(place)}
          onSubmit={(e) => this.handlePlaceSubmit(e)}
        />
        <div className="result-area">
          <GoogleMap location={location} />
          <div className="result-right">
            <GeocodeResult address={this.state.address} location={location} />
            <h2>ホテル検索結果</h2>
            <HotelsTable
              hotels={this.state.hotels}
              sortKey={this.state.sortKey}
              onSort={(sortKey) => this.handleSortKeyChange(sortKey)}
            />
          </div>
        </div>
      </div>
    );
  }
}

SearchPage.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func }).isRequired,
  location: PropTypes.shape({ search: PropTypes.string }).isRequired,
};

export default SearchPage;
