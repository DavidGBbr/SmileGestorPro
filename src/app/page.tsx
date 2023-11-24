"use client";
import { Flex, Text } from "@chakra-ui/react";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    document.title = "Smile Gestor PRO - login";
  }, []);

  return (
    <Flex
      background="clinic.900"
      height="100vh"
      alignItems="center"
      justifyContent="center"
    >
      <Text fontSize={30}>Smile Gestor Pro</Text>
    </Flex>
  );
}
