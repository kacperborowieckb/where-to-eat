import { RestaurantsDataType, RestaurantsResponseDataType } from '../features/api/apiSlice';

export const transformRestaurantsData = (
  data: RestaurantsResponseDataType[]
): RestaurantsDataType[] => {
  const tranformedData = [];

  for (const restaurant of data) {
    if (restaurant.latitude && restaurant.name && restaurant.longitude && restaurant.location_id) {
      tranformedData.push({
        location_id: restaurant.location_id,
        name: restaurant.name,
        latitude: restaurant.latitude,
        longitude: restaurant.longitude,
        num_reviews: restaurant.num_reviews,
        addres: restaurant.address,
        photo: restaurant?.photo?.images?.large?.url,
        ranking: restaurant.ranking,
        rating: restaurant.rating,
        is_closed: restaurant.is_closed,
        price_level: restaurant.price_level,
        web_url: restaurant.web_url,
        phone: restaurant.phone,
      });
    }
  }

  return tranformedData;
};
