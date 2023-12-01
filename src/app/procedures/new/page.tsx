"use client";
import { useEffect, useState } from "react";
import { Sidebar } from "@/components/sidebar";
import {
  Button,
  Flex,
  Heading,
  Input,
  Text,
  useColorModeValue,
  useMediaQuery,
} from "@chakra-ui/react";
import Link from "next/link";
import { FiChevronLeft } from "react-icons/fi";
import { api } from "@/services/apiClient";

export default function newProcedure() {
  const [subscription, setSubscription] = useState(false);
  const [count, setCount] = useState(0);
  const [isMobile] = useMediaQuery("(max-width: 500px)");

  useEffect(() => {
    document.title = "SmileGestorPRO - Novo serviço";
  }, []);

  useEffect(() => {
    const getSubscription = async () => {
      const response = await api.get("/procedure/check");
      setSubscription(
        response.data?.subscriptions?.status === "active" ? true : false
      );
    };
    try {
      getSubscription();
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    const getProceduresAmount = async () => {
      const response = await api.get("/procedure/count");
      setCount(Number(response.data.count));
    };
    try {
      getProceduresAmount();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <Sidebar>
      <Flex
        direction="column"
        alignItems="flex-start"
        justifyContent="flex-start"
      >
        <Flex
          direction={isMobile ? "column" : "row"}
          w="100%"
          align={isMobile ? "flex-start" : "center"}
          mb={isMobile ? 4 : 0}
        >
          <Link href="/procedures">
            <Button
              p={4}
              display="flex"
              alignItems="center"
              justifyItems="center"
              mr={4}
              bg="clinic.400"
              color="#fff"
              _hover={{ bg: "#2d375f" }}
            >
              <FiChevronLeft size={24} color="#fff" />
              Voltar
            </Button>
          </Link>
          <Heading
            color="orange.900"
            mt={4}
            mb={4}
            mr={4}
            fontSize={isMobile ? "28px" : "3xl"}
          >
            Novos procedimentos
          </Heading>
        </Flex>

        <Flex
          maxW="700px"
          bg="clinic.400"
          w="100%"
          align="center"
          justify="center"
          pt={8}
          pb={8}
          direction="column"
        >
          <Heading mb={4} fontSize={isMobile ? "22px" : "3xl"} color="#fff">
            Cadastrar procedimento
          </Heading>

          <Input
            placeholder="Nome do procedimento..."
            size="lg"
            type="text"
            w="85%"
            bg="gray.900"
            mb={3}
            borderColor={useColorModeValue("gray.700", "gray.900")}
            disabled={!subscription && count >= 5}
          />

          <Input
            placeholder="Valor do procedimento ex: 129,90"
            size="lg"
            type="text"
            w="85%"
            bg="gray.900"
            mb={4}
            borderColor={useColorModeValue("gray.700", "gray.900")}
            disabled={!subscription && count >= 5}
          />

          <Button
            w="85%"
            size="lg"
            color="gray.900"
            mb={6}
            bg="button.cta"
            _hover={{ bg: "#ffb13e" }}
            disabled={!subscription && count >= 5}
          >
            Cadastrar
          </Button>

          {!subscription && count >= 5 && (
            <Flex
              color="#fff"
              direction="row"
              align="center"
              justifyContent="center"
            >
              <Text>Você atingiu seu limite de procedimentos</Text>
              <Link href="/planos">
                <Text fontWeight="bold" color="#31fb6a" cursor="pointer" ml={1}>
                  Seja premium
                </Text>
              </Link>
            </Flex>
          )}
        </Flex>
      </Flex>
    </Sidebar>
  );
}
