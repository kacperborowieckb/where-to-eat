import { RestaurantsDataType } from '../../features/api/apiSlice';
import defaultImg from '../../assets/default.png';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Rating,
  Typography,
} from '@mui/material';
import { useRef } from 'react';

const RestaurantCard = ({
  restaurant,
  selected,
}: {
  restaurant: RestaurantsDataType;
  selected: boolean;
}) => {
  const ref = useRef<HTMLDivElement>(null);

  if (selected) ref?.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });

  return (
    <Card
      sx={[{ p: 1 }, selected && { border: '2px solid' }]}
      variant="outlined"
      key={restaurant.location_id}
      ref={ref}
    >
      <CardMedia
        sx={{
          width: '100%',
        }}
        component={'img'}
        height={'120px'}
        image={restaurant.photo ? restaurant.photo : defaultImg}
        alt={`${restaurant.name} image`}
      />
      <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
          p: 1,
          pb: '4px !important',
        }}
      >
        <Typography component={'h4'} noWrap>
          {restaurant.name}
        </Typography>
        <Typography component={'p'} variant="caption">
          {restaurant.ranking}
        </Typography>
        {restaurant.num_reviews && (
          <Typography component={'p'} variant="caption">
            {restaurant.num_reviews + ' reviews'}
          </Typography>
        )}
        <Box sx={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
          <Typography component={'p'} variant="caption">
            {restaurant.address}
          </Typography>
          <Typography component={'p'} variant="caption">
            {restaurant.phone}
          </Typography>
        </Box>
        {restaurant.is_closed && <Typography>{restaurant.is_closed}</Typography>}
        <Box sx={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
          <Typography>{restaurant.price_level}</Typography>
          <Rating value={Number(restaurant.rating)} size="small" readOnly />
        </Box>
      </CardContent>
      {restaurant.web_url && (
        <CardActions>
          <Button
            href={restaurant.web_url}
            sx={{ margin: '0 auto' }}
            variant="outlined"
            target="_blank"
            rel="noreferrer"
          >
            Visit site
          </Button>
        </CardActions>
      )}
    </Card>
  );
};

export default RestaurantCard;
