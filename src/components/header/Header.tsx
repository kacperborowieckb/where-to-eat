import { styled, alpha, useColorScheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { DarkMode, LightMode, LunchDining } from '@mui/icons-material';
import { Tooltip } from '@mui/material';
import { usePlacesWidget } from 'react-google-autocomplete';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { setCurrentPosition } from '../../features/map/mapSlice';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

const Header = () => {
  const { mode, setMode } = useColorScheme();
  const dispatch = useAppDispatch();

  const { ref } = usePlacesWidget({
    apiKey: import.meta.env.VITE_GOOGLE_API_KEY,
    onPlaceSelected: (place) => {
      if (place?.geometry?.location?.lat?.() && place?.geometry?.location?.lng?.()) {
        console.log('dsds');
        console.log(place);
        console.log(place.geometry.location.lat());
        dispatch(
          setCurrentPosition({
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng(),
          })
        );
      }
    },
  });

  const handleSchemeChange = () => {
    if (mode === 'dark') {
      setMode('light');
    } else {
      setMode('dark');
    }
  };
  return (
    <Box sx={{ width: '100%' }}>
      <AppBar position="static">
        <Toolbar>
          <Box sx={{ flexGrow: 1 }}>
            <IconButton color="inherit" aria-label="logo" sx={{ mr: 2 }}>
              <LunchDining />
            </IconButton>
          </Box>
          <Tooltip title={`Switch to ${mode === 'dark' ? ' light' : 'dark'} mode.`}>
            <IconButton
              aria-label="color-scheme"
              sx={{ color: 'inherit', mr: 2 }}
              onClick={handleSchemeChange}
            >
              {mode === 'dark' ? <DarkMode /> : <LightMode />}
            </IconButton>
          </Tooltip>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              inputRef={ref}
              sx={{ width: '100%' }}
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
