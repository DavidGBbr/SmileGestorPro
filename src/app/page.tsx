"use client";
import {
  Button,
  Flex,
  List,
  ListIcon,
  ListItem,
  Text,
  Box,
  Image,
} from "@chakra-ui/react";
import Link from "next/link";
import { useEffect } from "react";
import { FaCheck } from "react-icons/fa6";

export default function Home() {
  useEffect(() => {
    document.title = "Smile Gestor PRO - login";
  }, []);

  return (
    <Flex p={3} height="100vh" direction="column">
      <Flex align="center" justifyContent="space-between">
        <Flex cursor="pointer" userSelect="none" flexDirection="row">
          <Text
            fontSize="2xl"
            fontFamily="monospace"
            fontWeight="bold"
            color="#fff"
          >
            SmileGestor
          </Text>
          <Text
            fontSize="2xl"
            fontFamily="monospace"
            fontWeight="bold"
            color="button.cta"
          >
            PRO
          </Text>
        </Flex>

        <Flex gap={1}>
          <Link href="/login">
            <Button
              w="100%"
              bg="transparent"
              color="button.cta"
              size="lg"
              _hover={{ bg: "#1b2139" }}
            >
              Entrar
            </Button>
          </Link>
          <Link href="/register">
            <Button
              w="100%"
              bg="button.cta"
              size="lg"
              _hover={{ bg: "#ffbd3e" }}
            >
              Abrir conta
            </Button>
          </Link>
        </Flex>
      </Flex>

      <Flex alignItems="center" justifyContent="space-around" gap={5} mt={10}>
        <Flex direction="column" w="50%" gap={3}>
          <Text fontSize="5xl" as="b">
            Aprimore a eficiência da sua clínica com o SmileGestor Pro.
          </Text>
          <Text fontSize="xl">
            O SmileGestor Pro é uma solução completa que permite gerenciar sua
            clínica de maneira eficiente e sem complicações.
          </Text>
          <List spacing={1}>
            <ListItem>
              <ListIcon as={FaCheck} color="button.cta" />
              Agendamento simplificado: Organize facilmente os horários dos seus
              clientes.
            </ListItem>
            <ListItem>
              <ListIcon as={FaCheck} color="button.cta" />
              Personalização de procedimentos: Adicione e personalize todos os
              procedimentos oferecidos pela sua clínica.
            </ListItem>
            <ListItem>
              <ListIcon as={FaCheck} color="button.cta" />
              Planos acessíveis: Oferecemos planos que se adaptam ao seu
              orçamento, garantindo o melhor custo-benefício.
            </ListItem>
            <ListItem>
              <ListIcon as={FaCheck} color="button.cta" />
              Focado no seu negócio: Desenvolvido pensando 100% nas necessidades
              do seu negócio.
            </ListItem>
          </List>
          <Button bg="button.cta">Abrir uma conta</Button>
        </Flex>

        <Box boxSize="lg">
          <Image src="/images/logo_home.svg" alt="Home page logo" />
        </Box>
      </Flex>
    </Flex>
  );
}
