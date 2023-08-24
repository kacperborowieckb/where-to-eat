import { experimental_extendTheme as extendTheme } from '@mui/material';
import { LinkProps } from '@mui/material/Link';
import { LinkBehavior } from '../utils/LinkBehavior';

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
    MuiLink: {
      defaultProps: {
        component: LinkBehavior,
      } as LinkProps,
    },
    MuiButtonBase: {
      defaultProps: {
        LinkComponent: LinkBehavior,
      },
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
