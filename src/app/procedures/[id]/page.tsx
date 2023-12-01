"use client";
import { Sidebar } from "@/components/sidebar";
import {
  Button,
  Flex,
  Heading,
  Input,
  Stack,
  Switch,
  Text,
  useColorModeValue,
  useMediaQuery,
} from "@chakra-ui/react";
import { FiChevronLeft } from "react-icons/fi";
import { useEffect } from "react";
import Link from "next/link";

export default function EditProcedure() {
  const [isMobile] = useMediaQuery("(max-width: 500px)");
  useEffect(() => {
    document.title = "Editando procedimento";
  }, []);
  return (
    <>
      <Sidebar>
        <Flex
          direction="column"
          alignItems="flex-start"
          justifyContent="flex-start"
        >
          <Flex
            direction={isMobile ? "column" : "row"}
            w="100%"
            alignItems={isMobile ? "flex-start" : "center"}
            mb={isMobile ? 4 : 0}
          >
            <Link href="/procedures">
              <Button
                mr={3}
                p={4}
                display="flex"
                alignItems="center"
                justifyContent="center"
                bg="clinic.400"
                color="#fff"
                _hover={{ bg: "#2d375f" }}
              >
                <FiChevronLeft size={24} color="#fff" />
                Voltar
              </Button>
            </Link>
            <Heading fontSize={isMobile ? "22px" : "3xl"} color="#fff">
              Editar procedimento
            </Heading>
          </Flex>
        </Flex>

        <Flex
          mt={4}
          maxW="700px"
          pt={8}
          w="100%"
          bg="clinic.400"
          direction="column"
          align="center"
          justify="center"
        >
          <Heading fontSize={isMobile ? "22px" : "3xl"} color="#fff" mb={3}>
            Editar procedimento
          </Heading>

          <Flex w="85%" direction="column">
            <Input
              placeholder="Nome do procedimento"
              bg="gray.900"
              mb={3}
              size="lg"
              type="text"
              w="100%"
              borderColor={useColorModeValue("gray.700", "gray.900")}
            />
            <Input
              placeholder="Valor do seu procedimento"
              bg="gray.900"
              mb={3}
              size="lg"
              type="number"
              w="100%"
              borderColor={useColorModeValue("gray.700", "gray.900")}
            />

            <Stack mb={6} align="center" direction="row">
              <Text fontWeight="bold" color="#fff">
                Desativar procedimento
              </Text>
              <Switch size="lg" colorScheme="red" />
            </Stack>

            <Button
              mb={6}
              w="100%"
              bg="button.cta"
              color="gray.900"
              _hover={{ bg: "#ffb13e" }}
            >
              Salvar
            </Button>
          </Flex>
        </Flex>
      </Sidebar>
    </>
  );
}
