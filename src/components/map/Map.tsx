import GoogleMapReact, { ChangeEventValue } from 'google-map-react';
import { useAppSelector } from '../../hooks/useAppSelector';
import { getCurrentPosition, setBounds, setCurrentPosition } from '../../features/map/mapSlice';
import { useAppDispatch } from '../../hooks/useAppDispatch';

const Map = ({ mode }: { mode: string }) => {
  const dispatch = useAppDispatch();
  const coordinates = useAppSelector(getCurrentPosition);

  const handleCoordinatesChange = (e: ChangeEventValue) => {
    dispatch(setCurrentPosition({ lat: e.center.lat, lng: e.center.lng }));
    dispatch(setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw }));
  };

  return (
    <GoogleMapReact
      bootstrapURLKeys={{ key: import.meta.env.VITE_GOOGLE_API_KEY }}
      center={coordinates}
      defaultZoom={16}
      options={{
        mapId:
          mode === 'dark'
            ? import.meta.env.VITE_DARK_THEME_MAP_ID
            : import.meta.env.VITE_LIGHT_THEME_MAP_ID,
        styles: undefined,
      }}
      onChange={handleCoordinatesChange}
    ></GoogleMapReact>
  );
};

export default Map;
