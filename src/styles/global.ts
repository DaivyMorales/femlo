import { globalCss } from '@nextui-org/react';
import localFont from 'next/font/local'


const Satori = localFont({
    src: [
      {
        path: "../../public/fonts/Satoshi-Light.otf",
        weight: "300",
      },
      {
        path: "../../public/fonts/Satoshi-Regular.otf",
        weight: "400",
      },
      {
        path: "../../public/fonts/Satoshi-Medium.otf",
        weight: "500",
      },
      {
        path: "../../public/fonts/Satoshi-Bold.otf",
        weight: "700",
      },
      {
        path: "../../public/fonts/Satoshi-Black.otf",
        weight: "900",
      },
    ],
    variable: "--font-satori",
  });


export const globalStyles = globalCss({
    ':root': {
      '$$fonts-satori': Satori.style.fontFamily
    },
    html: {
      colorScheme: '$colors$colorScheme'
    },
    'div#__next > div[data-overlay-container="true"]:first-of-type': {
      d: 'flex',
      us: 'none',
      size: '100%',
      minHeight: '100vh',
      position: 'relative',
      flexFlow: 'column nowrap'
    },
    'html, body': {
      transitionProperty: 'background',
      transitionDuration: '250ms',
      transitionTimingFunction: 'ease'
    },
    'nav.nextui-navbar': {
      transitionProperty: 'box-shadow, background',
      transitionDuration: '250ms',
      transitionTimingFunction: 'ease'
    },
    'div.nextui-navbar-container': {
      background: 'none !important',
      backdropFilter: 'none !important',
      transition: 'none'
    },
    'label.nextui-switch-label': {
      p: 0,
      transition: 'none'
    },
    'div.nextui-switch': {
      transitionProperty: 'background, box-shadow',
      transitionDuration: '250ms',
      transitionTimingFunction: 'ease'
    },
    'span.nextui-switch-circle': {
      transitionProperty: 'color, background, transform, width',
      transitionDuration: '250ms, 250ms, 250ms, 200ms',
      transitionTimingFunction: 'ease'
    },
    '*.nextui-text': {
      transitionProperty: 'color',
      transitionDuration: '250ms',
      transitionTimingFunction: 'ease'
    },
    '*.nextui-link': {
      br: 'calc($xs / 1.4)'
    }
  });
  