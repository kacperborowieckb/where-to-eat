import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { BoundsType } from '../map/mapSlice';
import { transformRestaurantsData } from '../../utils/transformRestaurantsData';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://travel-advisor.p.rapidapi.com/',
    headers: {
      'X-RapidAPI-Key': import.meta.env.VITE_TRAVEL_ADVISOR_API_KEY,
      'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com',
    },
  }),
  tagTypes: ['Restaurants'],
  endpoints: (builder) => ({
    getRestaurantsData: builder.query<RestaurantsDataType[], BoundsType>({
      query: ({ sw, ne }) => ({
        url: 'restaurants/list-in-boundary',
        method: 'GET',
        params: {
          bl_latitude: sw.lat,
          tr_latitude: ne.lat,
          bl_longitude: sw.lng,
          tr_longitude: ne.lng,
        },
      }),
      transformResponse: ({
        data,
      }: {
        data: RestaurantsResponseDataType[];
      }): RestaurantsDataType[] => {
        const tranformedData = transformRestaurantsData(data);
        return tranformedData;
      },
      providesTags: ['Restaurants'],
    }),
  }),
});

export const { useGetRestaurantsDataQuery } = api;

export type RestaurantsResponseDataType = {
  location_id: string;
  name?: string;
  latitude?: string;
  longitude?: string;
  num_reviews?: string;
  location_string?: string;
  photo?: string;
  ranking?: string;
  rating?: string;
  is_closed?: boolean;
  price_level?: string;
  web_url?: string;
  [key: string]: unknown;
};

export type RestaurantsDataType = {
  location_id: string;
  name: string;
  latitude: string;
  longitude: string;
  num_reviews?: string;
  location_string?: string;
  photo?: string;
  ranking?: string;
  rating?: string;
  is_closed?: boolean;
  price_level?: string;
  web_url?: string;
};
