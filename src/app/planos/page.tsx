"use client";
import { Sidebar } from "@/components/sidebar";
import { setupAPIClient } from "@/services/api";
import { Button, Flex, Heading, Text, useMediaQuery } from "@chakra-ui/react";
import { useEffect, useState } from "react";

export default function Planos() {
  const [isPremium, setIsPremium] = useState(false);

  useEffect(() => {
    document.title = "Gerencie sua assinatura";
  }, []);

  useEffect(() => {
    const getSubscription = async () => {
      const apiClient = setupAPIClient();
      const response = await apiClient.get("/me");
      setIsPremium(
        response.data.user?.subscriptions?.status === "active" ? true : false
      );
    };
    try {
      getSubscription();
    } catch (error) {
      console.log(error);
    }
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
              bg={isPremium ? "#fff" : "button.cta"}
              m={2}
              color={isPremium ? "clinic.900" : "#fff"}
              onClick={() => {}}
              isDisabled={isPremium}
            >
              {isPremium ? "VOCÊ JÁ É PREMIUM" : "VIRAR PREMIUM"}
            </Button>
            {isPremium && (
              <Button
                m={2}
                bg="#fff"
                color="clinic.900"
                fontWeight="bold"
                onClick={() => {}}
              >
                ALTERAR ASSINATURA
              </Button>
            )}
          </Flex>
        </Flex>
      </Flex>
    </Sidebar>
  );
}
