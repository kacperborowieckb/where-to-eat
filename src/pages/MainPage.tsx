import { Box, Button, CircularProgress, Grid, useColorScheme } from '@mui/material';
import Map from '../components/map/Map';
import { useEffect, useState } from 'react';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { getBounds, setCurrentPosition } from '../features/map/mapSlice';
import { useAppSelector } from '../hooks/useAppSelector';
import { useGetRestaurantsDataQuery } from '../features/api/apiSlice';
import Restaurants from '../components/restaurants/Restaurants';
import { theme } from '../theme/theme';

const MainPage = () => {
  const dispatch = useAppDispatch();
  const { mode } = useColorScheme();
  const bounds = useAppSelector(getBounds);
  const [isMapOpen, setIsMapOpen] = useState(false);

  const { data = [], error, isLoading, status } = useGetRestaurantsDataQuery(bounds);

  const toogleMap = () => setIsMapOpen(!isMapOpen);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
      dispatch(setCurrentPosition({ lat: latitude, lng: longitude }));
    });
  }, []);

  if (error) return <Box>Error.</Box>;

  return (
    <Grid container spacing={2} sx={{ flex: 1, overflow: 'hidden', position: 'relative' }}>
      {isLoading || status === 'pending' ? (
        <Grid
          item
          xs={12}
          md={4}
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
        xs={0}
        md={8}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          maxHeight: '100%',
          [theme.breakpoints.down('md')]: {
            position: 'absolute',
            inset: '0px 0px 0px 0px',
            p: '0px !important',
            transition: 'transform 0.5s linear',
            transform: isMapOpen ? 'translateX(0%)' : 'translateX(100%)',
          },
        }}
      >
        <Map mode={mode!} key={status + mode} restaurants={data} />
      </Grid>
      <Button
        onClick={toogleMap}
        sx={{
          display: { xs: 'block', md: 'none' },
          position: 'absolute',
          bottom: '16px',
          right: '16px',
        }}
        variant="contained"
      >
        {isMapOpen ? 'Close map' : 'Show map'}
      </Button>
    </Grid>
  );
};

export default MainPage;
