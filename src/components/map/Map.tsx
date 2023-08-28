import GoogleMapReact, { ChangeEventValue } from 'google-map-react';
import { useAppSelector } from '../../hooks/useAppSelector';
import {
  getCurrentPosition,
  getSelectedRestaurant,
  setBounds,
  setCurrentPosition,
} from '../../features/map/mapSlice';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { CircularProgress } from '@mui/material';
import { RestaurantsDataType } from '../../features/api/apiSlice';
import { useState } from 'react';
import RestaurantPin from '../restaurant-pin/RestaurantPin';

type MapProps = {
  mode: string;
  restaurants: RestaurantsDataType[];
};

const Map = ({ mode, restaurants }: MapProps) => {
  const dispatch = useAppDispatch();
  const coordinates = useAppSelector(getCurrentPosition);
  const [canChangeCoordinates, setCanChangeCoordinates] = useState(true);
  const [mapZoom, setMapZoom] = useState(16);
  const selectedRestaurant = useAppSelector(getSelectedRestaurant);

  const handleCoordinatesChange = (e: ChangeEventValue) => {
    dispatch(setCurrentPosition({ lat: e.center.lat, lng: e.center.lng }));
    setMapZoom(e.zoom);
    if (canChangeCoordinates) {
      dispatch(setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw }));
      setCanChangeCoordinates(false);
      setTimeout(() => {
        setCanChangeCoordinates(true);
      }, 5000);
    }
  };

  return (
    <>
      {coordinates.lat !== 0 && coordinates.lng !== 0 ? (
        <GoogleMapReact
          bootstrapURLKeys={{ key: import.meta.env.VITE_GOOGLE_API_KEY }}
          center={coordinates}
          defaultZoom={16}
          zoom={mapZoom}
          key={Number(coordinates.lat) + Number(coordinates.lng) + selectedRestaurant!}
          options={{
            disableDefaultUI: true,
            mapId:
              mode === 'dark'
                ? import.meta.env.VITE_DARK_THEME_MAP_ID
                : import.meta.env.VITE_LIGHT_THEME_MAP_ID,
            styles: undefined,
          }}
          onChange={handleCoordinatesChange}
        >
          {restaurants.map((restaurant) => (
            <RestaurantPin
              restaurant={restaurant}
              lat={Number(restaurant.latitude)}
              lng={Number(restaurant.longitude)}
              key={restaurant.location_id}
              isSelectedRestaurant={selectedRestaurant === Number(restaurant.location_id)}
            />
          ))}
        </GoogleMapReact>
      ) : (
        <CircularProgress />
      )}
    </>
  );
};

export default Map;
