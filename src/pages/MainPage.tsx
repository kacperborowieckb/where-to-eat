import { Grid, useColorScheme } from '@mui/material';
import Map from '../components/map/Map';
import { useEffect } from 'react';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { getBounds, setCurrentPosition } from '../features/map/mapSlice';
import { useAppSelector } from '../hooks/useAppSelector';
import { useGetRestaurantsDataQuery } from '../features/api/apiSlice';

const MainPage = () => {
  const dispatch = useAppDispatch();
  const { mode } = useColorScheme();
  const bounds = useAppSelector(getBounds);
  const { data, error, isLoading } = useGetRestaurantsDataQuery(bounds);
  console.log(data);
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
      dispatch(setCurrentPosition({ lat: latitude, lng: longitude }));
    });
  }, []);

  return (
    <Grid container spacing={2} sx={{ height: '100%' }}>
      <Grid item xs={4}></Grid>
      <Grid item xs={8} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Map mode={mode!} key={mode} />
      </Grid>
    </Grid>
  );
};

export default MainPage;
