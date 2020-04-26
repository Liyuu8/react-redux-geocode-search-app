import getDistance from 'geolib/es/getDistance';

import Rakuten from '../lib/Rakuten';

export const searchHotelByLocation = (location) => {
  const params = {
    // eslint-disable-next-line no-undef
    applicationId: process.env.REACT_APP_RAKUTEN_APP_ID,
    datumType: 1,
    latitude: location.lat,
    longitude: location.lng,
  };
  return Rakuten.Travel.simpleHotelSearch(params).then((result) =>
    result.data.hotels.map((hotel) => {
      const basicInfo = hotel.hotel[0].hotelBasicInfo;
      const price = basicInfo.hotelMinCharge;
      const distance = getDistance(
        { latitude: location.lat, longitude: location.lng },
        { latitude: basicInfo.latitude, longitude: basicInfo.longitude }
      );

      return {
        id: basicInfo.hotelNo,
        name: basicInfo.hotelName,
        url: basicInfo.hotelInformationUrl,
        thumbUrl: basicInfo.hotelThumbnailUrl,
        price: price ? `${price}円` : '空室なし',
        reviewAverage: basicInfo.reviewAverage,
        reviewCount: basicInfo.reviewCount,
        distance,
      };
    })
  );
};
