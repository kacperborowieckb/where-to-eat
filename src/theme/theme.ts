import { experimental_extendTheme as extendTheme } from '@mui/material';

export const theme = extendTheme({
  components: {
    MuiCssBaseline: {
      styleOverrides: `
         html, body, #root {
          height: 100%;
        },
        #root {
          height: 100dvh;
          display: flex;
          flex-direction: column;
        }
      `,
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          fontSize: '0.75rem',
        },
      },
    },
  },
});
