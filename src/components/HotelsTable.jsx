import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';

import HotelRow from './HotelRow';
import HotelsClickableTh from './HotelsClickableTh';

const HotelsTable = ({ hotels }) => (
  <table>
    <tbody>
      <tr>
        <th>画像</th>
        <th>ホテル名</th>
        <HotelsClickableTh label="値段" sortKey="price" />
        <HotelsClickableTh label="レビュー" sortKey="reviewAverage" />
        <th>レビュー件数</th>
        <th>距離</th>
      </tr>
      {/* ホテルの検索結果が以下に列挙される */}
      {hotels.map((hotel) => (
        <HotelRow key={hotel.id} hotel={hotel} />
      ))}
    </tbody>
  </table>
);

HotelsTable.propTypes = {
  hotels: PropTypes.objectOf(PropTypes.any),
  sortKey: PropTypes.string.isRequired,
  // onSort: PropTypes.func.isRequired,
};

HotelsTable.defaultProps = {
  hotels: [],
};

const sortedHotels = (hotels, sortKey) =>
  _.sortBy(hotels, (hotel) => hotel[sortKey]);

const mapStateToProps = (state) => ({
  hotels: sortedHotels(state.hotels, state.sortKey),
});

const ConnectedHotelsTable = connect(mapStateToProps)(HotelsTable);

export default ConnectedHotelsTable;
