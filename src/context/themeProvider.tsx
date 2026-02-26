import React from "react";
import theme from "../styles/theme";
import { ChakraProvider } from "@chakra-ui/react";

interface ThemeContainerProps {
  children?: React.ReactNode;
}

export default function ThemeContainer({ children }: ThemeContainerProps) {
  return (
    <ChakraProvider theme={theme}>
      {children}
    </ChakraProvider>
  );
}
