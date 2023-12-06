"use client";
import { Sidebar } from "@/components/sidebar";
import { Button, Flex, Heading, Text, useMediaQuery } from "@chakra-ui/react";
import { useEffect } from "react";

export default function Planos() {
  useEffect(() => {
    document.title = "Gerencie sua assinatura";
  }, []);

  const [isMobile] = useMediaQuery("(max-width: 500px)");

  return (
    <Sidebar>
      <Flex
        w="100%"
        direction="column"
        align="flex-start"
        justify="flex-start"
        color="#fff"
      >
        <Heading fontSize="3xl" mt={4} mb={4} mr={4}>
          Planos
        </Heading>
      </Flex>

      <Flex
        pb={8}
        maxW="780px"
        w="100%"
        direction="column"
        align="flex-start"
        justify="flex-start"
      >
        <Flex gap={4} w="100%" flexDirection={isMobile ? "column" : "row"}>
          <Flex
            rounded={4}
            p={2}
            flex={1}
            bg="clinic.400"
            flexDirection="column"
            color="#fff"
          >
            <Heading
              textAlign="center"
              fontSize="2xl"
              mt={2}
              mb={4}
              color="gray.100"
            >
              Planos grátis
            </Heading>
            <Text fontWeight="medium" ml={4} mb={2}>
              Registrar procedimentos.
            </Text>
            <Text fontWeight="medium" ml={4} mb={2}>
              Criar apenas 5 modelos de procedimentos.
            </Text>
            <Text fontWeight="medium" ml={4} mb={2}>
              Editar dados do perfil.
            </Text>
          </Flex>

          <Flex
            rounded={4}
            p={2}
            flex={1}
            bg="clinic.400"
            flexDirection="column"
            color="#fff"
          >
            <Heading
              textAlign="center"
              fontSize="2xl"
              mt={2}
              mb={4}
              color="#31fb6a"
            >
              Premium
            </Heading>
            <Text fontWeight="medium" ml={4} mb={2}>
              Registrar procedimentos ilimitados.
            </Text>
            <Text fontWeight="medium" ml={4} mb={2}>
              Criar modelos de procedimentos ilimitados.
            </Text>
            <Text fontWeight="medium" ml={4} mb={2}>
              Editar modelos de procedimentos.
            </Text>
            <Text fontWeight="medium" ml={4} mb={2}>
              Receber todas as atualizações.
            </Text>
            <Text fontWeight="medium" ml={4} mb={2}>
              Editar dados do perfil.
            </Text>
            <Text
              color="#31fb6a"
              fontWeight="bold"
              fontSize="2xl"
              ml={4}
              mb={2}
            >
              R$ 9.99
            </Text>
            <Button
              bg="button.cta"
              _hover={{ bg: "#ffbd3e" }}
              m={2}
              color="#fff"
              onClick={() => {}}
            >
              VIRAR PREMIUM
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </Sidebar>
  );
}
