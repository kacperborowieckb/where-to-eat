import { Grid, useColorScheme } from '@mui/material';
import Map from '../components/map/Map';
import { useEffect } from 'react';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { setCurrentPosition } from '../features/map/mapSlice';

const MainPage = () => {
  const dispatch = useAppDispatch();
  const { mode } = useColorScheme();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
      dispatch(setCurrentPosition({ lat: latitude, lng: longitude }));
    });
  }, []);

  return (
    <Grid container spacing={2} sx={{ height: '100%' }}>
      <Grid item xs={4}></Grid>
      <Grid item xs={8}>
        <Map mode={mode!} key={mode} />
      </Grid>
    </Grid>
  );
};

export default MainPage;
