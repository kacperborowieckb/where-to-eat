import { Box, Card, CardContent, CardMedia, Rating, Stack, Typography } from '@mui/material';
import { RestaurantsDataType } from '../../features/api/apiSlice';
import { Room } from '@mui/icons-material';
import defaultImg from '../../assets/default.png';

type RestaurantPinTypes = {
  restaurant: RestaurantsDataType;
  lat: number;
  lng: number;
};

const RestaurantPin = ({ restaurant }: RestaurantPinTypes) => {
  return (
    <Stack spacing={1} width={100} sx={{ translate: '-50% -100%' }}>
      <Box>
        <Card sx={{ display: 'flex', flexDirection: 'column' }}>
          <CardMedia
            component={'img'}
            height={'50px'}
            image={restaurant.photo ? restaurant.photo : defaultImg}
            alt={`${restaurant.name} image`}
          />
          <CardContent sx={{ textAlign: 'center', p: '4px', pb: '4px !important' }}>
            <Typography variant="caption">{restaurant.name}</Typography>
            <Rating value={Number(restaurant.rating)} size="small" sx={{ m: '0 auto' }} readOnly />
          </CardContent>
        </Card>
      </Box>
      <Room sx={{ width: '100%' }} />
    </Stack>
  );
};

export default RestaurantPin;
