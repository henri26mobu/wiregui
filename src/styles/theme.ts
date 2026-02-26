import { extendTheme } from "@chakra-ui/react";

const customTheme = extendTheme({
  fonts: {
    body: "Roboto, system-ui, sans-serif",
    heading: "Roboto, system-ui, sans-serif",
    mono: "Menlo, monospace",
  },
  fontWeights: {
    normal: 400,
    medium: 600,
    bold: 700,
  },
  radii: {
    sm: "4px",
    md: "8px",
  },
  colors: {
    gray: {
      "100": "#3B3B3B",
      "200": "#2A2A2A",
      "300": "#1B1B1B",
    },
    orange: {
      "200": "#FF6C0E",
    },
    red: {
      "200": "#CD382D",
    },
  },
  config: {
    initialColorMode: "dark",
    useSystemColorMode: false,
  },
});

export default customTheme;
