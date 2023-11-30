"use client";
import { Sidebar } from "@/components/sidebar";
import {
  Button,
  Flex,
  Heading,
  Stack,
  Switch,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";
import Link from "next/link";
import React, { useEffect } from "react";
import { IoMdPricetag } from "react-icons/io";

const procedures = () => {
  const [isMobile] = useMediaQuery("(max-width: 500px)");

  useEffect(() => {
    document.title = "Procedimentos - Minha Clínica";
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
          alignItems={isMobile ? "flex-start" : "center"}
          justifyContent="flex-start"
          mb={0}
        >
          <Heading
            fontSize={isMobile ? "28px" : "3xl"}
            mt={4}
            mb={4}
            mr={4}
            color="orange.900"
          >
            Meus Procedimentos
          </Heading>

          <Link href="procedures/new">
            <Button bg="clinic.400" color="#fff" _hover={{ bg: "#2d375f" }}>
              Cadastrar novo
            </Button>
          </Link>

          <Stack
            ml={isMobile ? "initial" : "auto"}
            my={2}
            align="center"
            direction="row"
          >
            <Text fontWeight="bold" color="#fff">
              ATIVOS
            </Text>
            <Switch colorScheme="green" size="lg" />
          </Stack>
        </Flex>
      </Flex>
      <Link href="procedures/123">
        <Flex
          cursor="pointer"
          w="100%"
          p={4}
          bg="clinic.400"
          direction="row"
          rounded="4"
          mb={2}
          justifyContent="space-between"
          alignItems="center"
        >
          <Flex direction="row" alignItems="center" justifyContent="center">
            <IoMdPricetag size={28} color="#fba931" />
            <Text color="#fff" ml={4} noOfLines={2} fontWeight="bold">
              Clareamento Dental
            </Text>
          </Flex>

          <Text color="#fff" fontWeight="bold">
            Preço: R$ 400.90
          </Text>
        </Flex>
      </Link>
    </Sidebar>
  );
};

export default procedures;
