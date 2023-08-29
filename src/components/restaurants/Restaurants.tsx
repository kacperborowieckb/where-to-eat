import { Grid, Stack, Typography } from '@mui/material';
import { RestaurantsDataType } from '../../features/api/apiSlice';
import RestaurantCard from '../restaurant-card/RestaurantCard';
import { useAppSelector } from '../../hooks/useAppSelector';
import { getSelectedRestaurant } from '../../features/map/mapSlice';

type RestaurantsProps = {
  restaurants: RestaurantsDataType[];
};
const Restaurants = ({ restaurants = [] }: RestaurantsProps) => {
  const selectedRestaurant = useAppSelector(getSelectedRestaurant);

  return (
    <Grid item xs={12} md={4} sx={{ overflowY: 'scroll', maxHeight: '100%', my: 2, pr: 0 }}>
      <Stack spacing={2} px={1} pb={3}>
        {restaurants.length > 0 ? (
          restaurants.map((restaurant) => (
            <RestaurantCard
              restaurant={restaurant}
              key={restaurant.location_id}
              selected={Number(restaurant.location_id) === selectedRestaurant}
            />
          ))
        ) : (
          <Typography color="error" textAlign={'center'}>
            No restaurants found.
          </Typography>
        )}
      </Stack>
    </Grid>
  );
};

export default Restaurants;
