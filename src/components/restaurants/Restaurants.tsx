import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Rating,
  Stack,
  Typography,
} from '@mui/material';
import defaultImg from '../../assets/default.png';
import { RestaurantsDataType } from '../../features/api/apiSlice';

type RestaurantsProps = {
  restaurants: RestaurantsDataType[];
};

const Restaurants = ({ restaurants = [] }: RestaurantsProps) => {
  return (
    <Grid item xs={4} sx={{ overflowY: 'scroll', maxHeight: '100%', my: 2, pr: 0 }}>
      <Stack spacing={2} px={1} pb={3}>
        {restaurants.map((restaurant) => (
          <Card sx={{ p: 1 }} variant="outlined" key={restaurant.location_id}>
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
        ))}
      </Stack>
    </Grid>
  );
};

export default Restaurants;
