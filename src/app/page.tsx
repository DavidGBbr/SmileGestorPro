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
  useMediaQuery,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { FaCheck } from "react-icons/fa6";

export default function Home() {
  useEffect(() => {
    document.title = "Smile Gestor PRO - login";
  }, []);

  const router = useRouter();

  const [isMobile] = useMediaQuery("(max-width: 700px)");

  return (
    <Flex p={3} height="100vh" direction="column">
      <Flex align="center" justifyContent="space-between">
        <Flex cursor="pointer" userSelect="none" flexDirection="row">
          <Text
            fontSize="xl"
            fontFamily="monospace"
            fontWeight="bold"
            color="#fff"
          >
            SmileGestor
          </Text>
          <Text
            fontSize="xl"
            fontFamily="monospace"
            fontWeight="bold"
            color="button.cta"
          >
            PRO
          </Text>
        </Flex>

        <Flex gap={1}>
          <Button
            w="100%"
            bg="transparent"
            color="button.cta"
            size="lg"
            _hover={{ bg: "#1b2139" }}
            onClick={() => router.push("/login")}
          >
            Entrar
          </Button>
          <Button
            w="100%"
            bg="button.cta"
            size="lg"
            _hover={{ bg: "#ffbd3e" }}
            onClick={() => router.push("/register")}
          >
            Abrir conta
          </Button>
        </Flex>
      </Flex>

      <Flex
        alignItems="center"
        justifyContent="space-around"
        direction={isMobile ? "column" : "row"}
        gap={5}
        mt={10}
        py={isMobile ? 3 : 0}
      >
        <Flex direction="column" w={isMobile ? "100%" : "50%"} gap={5}>
          <Text fontSize="5xl" as="b" lineHeight={1}>
            Aprimore a eficiência da sua clínica com o SmileGestor Pro.
          </Text>
          <Text fontSize={isMobile ? "lg" : "xl"}>
            O SmileGestor Pro é uma solução completa que permite gerenciar sua
            clínica de maneira eficiente e sem complicações.
          </Text>
          <List spacing={1} fontSize={isMobile ? "md" : "initial"}>
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
          <Button bg="button.cta" onClick={() => router.push("/register")}>
            Abrir uma conta
          </Button>
        </Flex>

        <Box boxSize="lg" display={isMobile ? "none" : "initial"}>
          <Image src="/images/logo_home.svg" alt="Home page logo" />
        </Box>
      </Flex>
    </Flex>
  );
}
