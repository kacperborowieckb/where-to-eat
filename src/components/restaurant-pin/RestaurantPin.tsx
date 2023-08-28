import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Rating,
  Stack,
  Typography,
  styled,
} from '@mui/material';
import { RestaurantsDataType } from '../../features/api/apiSlice';
import { Room } from '@mui/icons-material';
import defaultImg from '../../assets/default.png';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { setSelectedRestaurant } from '../../features/map/mapSlice';

type RestaurantPinTypes = {
  restaurant: RestaurantsDataType;
  lat: number;
  lng: number;
  isSelectedRestaurant: boolean;
};

const StyledStack = styled(Stack)({
  translate: '-50% -100%',
  zIndex: 0,
  width: 100,
  '&:hover': {
    cursor: 'pointer',
    transform: 'scale(1.05)',
    transition: 'transform 0.1s linear',
    zIndex: '10 !important',
    position: 'inherit',
  },
});

const RestaurantPin = ({ restaurant, isSelectedRestaurant }: RestaurantPinTypes) => {
  const dispatch = useAppDispatch();

  const changeCurrentRestaurant = () => {
    dispatch(setSelectedRestaurant(Number(restaurant.location_id)));
  };

  return (
    <StyledStack
      spacing={1}
      sx={[
        isSelectedRestaurant && {
          zIndex: '10 !important',
          position: 'inherit',
          transform: 'scale(1.05)',
          '& > div': {
            border: '3px solid',
            borderRadius: '6px',
          },
        },
      ]}
      onClick={changeCurrentRestaurant}
    >
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
    </StyledStack>
  );
};

export default RestaurantPin;
