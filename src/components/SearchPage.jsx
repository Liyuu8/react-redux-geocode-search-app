import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import SearchForm from './SearchForm';
import GeocodeResult from './GeocodeResult';
import GoogleMap from './GoogleMap';
import HotelsTable from './HotelsTable';
import { startSearch } from '../actions/';

const SearchPage = (props) => {
  useEffect(() => {
    props.dispatch(startSearch());
  }, []);

  return (
    <div className="search-page">
      <h1 className="app-title">ホテル検索</h1>
      <SearchForm history={props.history} />
      <div className="result-area">
        <GoogleMap location={props.geocodeResult.location} />
        <div className="result-right">
          <GeocodeResult
            address={props.geocodeResult.address}
            location={props.geocodeResult.location}
          />
          <h2>ホテル検索結果</h2>
          <HotelsTable />
        </div>
      </div>
    </div>
  );
};

SearchPage.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func }).isRequired,
  location: PropTypes.shape({ search: PropTypes.string }).isRequired,
  geocodeResult: PropTypes.shape({
    address: PropTypes.string.isRequired,
    location: PropTypes.shape({
      lat: PropTypes.number.isRequired,
      lng: PropTypes.number.isRequired,
    }),
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  geocodeResult: state.geocodeResult,
});

const ConnectedSearchPage = connect(mapStateToProps)(SearchPage);

export default ConnectedSearchPage;
