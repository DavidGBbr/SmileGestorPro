"use client";
import React, { useEffect } from "react";
import { Sidebar } from "@/components/sidebar";
import {
  Button,
  Flex,
  Text,
  Heading,
  Link as ChakraLink,
  useMediaQuery,
} from "@chakra-ui/react";
import Link from "next/link";
import { IoMdPerson } from "react-icons/io";

const Dashboard = () => {
  useEffect(() => {
    document.title = "SmileGestor - Minha agenda";
  }, []);

  const [isMobile] = useMediaQuery("(max-width: 500px)");

  return (
    <Sidebar>
      <Flex direction="column" align="flex-start" justify="flex-start">
        <Flex w="100%" direction="row" align="center" justify="flex-start">
          <Heading fontSize="3xl" mt={4} mb={4} mr={4} color="#fff">
            Agenda
          </Heading>
          <Link href="/new">
            <Button bg="clinic.400" color="#fff" _hover={{ bg: "#2d375f" }}>
              Registrar
            </Button>
          </Link>
        </Flex>

        <ChakraLink
          w="100%"
          m={0}
          p={0}
          mt={1}
          bg="transparent"
          style={{ textDecoration: "none" }}
          color="#fff"
        >
          <Flex
            w="100%"
            direction={isMobile ? "column" : "row"}
            p={4}
            rounded={4}
            mb={4}
            bg="clinic.400"
            justify="space-between"
            align={isMobile ? "flex-start" : "center"}
          >
            <Flex
              direction="row"
              mb={isMobile ? 2 : 0}
              align="center"
              justify="center"
            >
              <IoMdPerson size={28} color="orange" />
              <Text fontWeight="bold" ml={4} noOfLines={1}>
                Juninho
              </Text>
            </Flex>

            <Flex
              direction="row"
              mb={isMobile ? 2 : 0}
              align="center"
              justify="center"
            >
              <Text fontWeight="bold" ml={4} noOfLines={1}>
                Extrair siso
              </Text>
            </Flex>

            <Flex
              direction="row"
              mb={isMobile ? 2 : 0}
              align="center"
              justify="center"
            >
              <Text fontWeight="bold" ml={4} noOfLines={1}>
                04/12/2023
              </Text>
            </Flex>

            <Flex
              direction="row"
              mb={isMobile ? 2 : 0}
              align="center"
              justify="center"
            >
              <Text fontWeight="bold" ml={4} noOfLines={1}>
                R$ 119,90
              </Text>
            </Flex>
          </Flex>
        </ChakraLink>
      </Flex>
    </Sidebar>
  );
};

export default Dashboard;
