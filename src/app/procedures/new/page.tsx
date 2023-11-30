"use client";
import { useEffect } from "react";
import { Sidebar } from "@/components/sidebar";
import {
  Button,
  Flex,
  Heading,
  Input,
  useColorModeValue,
  useMediaQuery,
} from "@chakra-ui/react";
import Link from "next/link";
import { FiChevronLeft } from "react-icons/fi";

export default function newProcedure() {
  const [isMobile] = useMediaQuery("(max-width: 500px)");

  useEffect(() => {
    document.title = "SmileGestorPRO - Novo serviço";
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
          />

          <Input
            placeholder="Valor do procedimento ex: 129,90"
            size="lg"
            type="text"
            w="85%"
            bg="gray.900"
            mb={4}
            borderColor={useColorModeValue("gray.700", "gray.900")}
          />

          <Button
            w="85%"
            size="lg"
            color="gray.900"
            mb={6}
            bg="button.cta"
            _hover={{ bg: "#ffb13e" }}
          >
            Cadastrar
          </Button>
        </Flex>
      </Flex>
    </Sidebar>
  );
}
