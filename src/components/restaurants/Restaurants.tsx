import { Grid, Stack } from '@mui/material';
import { RestaurantsDataType } from '../../features/api/apiSlice';
import RestaurantCard from '../restaurant-card/RestaurantCard';

type RestaurantsProps = {
  restaurants: RestaurantsDataType[];
};

const Restaurants = ({ restaurants = [] }: RestaurantsProps) => {
  return (
    <Grid item xs={4} sx={{ overflowY: 'scroll', maxHeight: '100%', my: 2, pr: 0 }}>
      <Stack spacing={2} px={1} pb={3}>
        {restaurants.map((restaurant) => (
          <RestaurantCard restaurant={restaurant} key={restaurant.location_id} />
        ))}
      </Stack>
    </Grid>
  );
};

export default Restaurants;
