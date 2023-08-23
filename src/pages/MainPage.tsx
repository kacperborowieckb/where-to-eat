import { Grid, useColorScheme } from '@mui/material';
import Map from '../components/map/Map';

const MainPage = () => {
  const { mode } = useColorScheme();

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
