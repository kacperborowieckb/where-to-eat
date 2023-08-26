import { Box, CircularProgress, Grid, useColorScheme } from '@mui/material';
import Map from '../components/map/Map';
import { useEffect } from 'react';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { getBounds, setCurrentPosition } from '../features/map/mapSlice';
import { useAppSelector } from '../hooks/useAppSelector';
import { useGetRestaurantsDataQuery } from '../features/api/apiSlice';
import Restaurants from '../components/restaurants/Restaurants';

const MainPage = () => {
  const dispatch = useAppDispatch();
  const { mode } = useColorScheme();
  const bounds = useAppSelector(getBounds);

  const { data = [], error, isLoading, status } = useGetRestaurantsDataQuery(bounds);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
      dispatch(setCurrentPosition({ lat: latitude, lng: longitude }));
    });
  }, []);

  if (error) return <Box>Error.</Box>;

  return (
    <Grid container spacing={2} sx={{ flex: 1, overflow: 'hidden' }}>
      {isLoading || status === 'pending' ? (
        <Grid
          item
          xs={4}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <CircularProgress />
        </Grid>
      ) : (
        <Restaurants restaurants={data} />
      )}
      <Grid
        item
        xs={8}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          maxHeight: '100%',
        }}
      >
        <Map mode={mode!} key={status + mode} restaurants={data} />
      </Grid>
    </Grid>
  );
};

export default MainPage;
