"use client";
import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider } from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";

const styles = {
  global: {
    body: {
      color: "gray.100",
    },
    a: {
      color: "#fff",
    },
  },
};

const colors = {
  clinic: {
    900: "#090b13",
    400: "#1b2139",
    100: "#c6c6c6",
  },
  button: {
    cta: "#fba931",
    default: "#fff",
    gray: "#dfdfdf",
    danger: "#ff4040",
  },
  orange: {
    900: "#ffb931",
  },
};

const theme = extendTheme({ styles, colors });
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CacheProvider>
      <ChakraProvider theme={theme}>{children}</ChakraProvider>
    </CacheProvider>
  );
}
