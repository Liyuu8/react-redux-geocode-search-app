import React from 'react';
import PropTypes from 'prop-types';

import HotelRow from './HotelRow';

const HotelsTable = ({ hotels }) => (
  <table>
    <tbody>
      <tr>
        <th>画像</th>
        <th>ホテル名</th>
        <th className="hotel-price-column">値段</th>
        <th>レビュー</th>
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
};

HotelsTable.defaultProps = {
  hotels: [],
};

export default HotelsTable;
