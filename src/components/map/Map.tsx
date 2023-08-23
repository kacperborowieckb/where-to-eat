import GoogleMapReact from 'google-map-react';

const Map = ({ mode }: { mode: string }) => {
  const coordinates = { lat: 0, lng: 0 };

  return (
    <GoogleMapReact
      bootstrapURLKeys={{ key: import.meta.env.VITE_GOOGLE_API_KEY }}
      defaultCenter={coordinates}
      center={coordinates}
      defaultZoom={4}
      options={{
        mapId: mode === 'dark' && import.meta.env.VITE_DARK_THEME_MAP_ID,
        styles: undefined,
      }}
    ></GoogleMapReact>
  );
};

export default Map;
