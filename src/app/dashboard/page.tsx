"use client";
import React, { useEffect, useState } from "react";
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
import { setupAPIClient } from "@/services/api";

interface ScheduleProps {
  id: string;
  customer: string;
  procedure: {
    id: string;
    name: string;
    price: string | number;
    user_id: string;
  };
  date: string;
}

const Dashboard = () => {
  const [schedule, setSchedule] = useState<ScheduleProps[]>([]);

  useEffect(() => {
    document.title = "SmileGestor - Minha agenda";
  }, []);

  useEffect(() => {
    const getSchedule = async () => {
      const apiClient = setupAPIClient();
      const response = await apiClient.get("/schedule");
      setSchedule(response.data);
    };
    try {
      getSchedule();
    } catch (error) {
      console.log(error);
      setSchedule([]);
    }
  }, []);

  const formatDate = (date: string) => {
    const minute = date.slice(14, 16);
    const hour = date.slice(11, 14);
    const day = date.slice(8, 10);
    const month = date.slice(5, 7);
    const year = date.slice(0, 4);

    const dateFormated = `${day}/${month}/${year} - ${hour}${minute}`;

    return dateFormated;
  };

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

        {schedule?.map((item) => (
          <ChakraLink
            key={item?.id}
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
              mb={2}
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
                  {item?.customer}
                </Text>
              </Flex>

              <Flex
                direction="row"
                mb={isMobile ? 2 : 0}
                align="center"
                justify="center"
              >
                <Text fontWeight="bold" ml={4} noOfLines={1}>
                  {item?.procedure?.name}
                </Text>
              </Flex>

              <Flex
                direction="row"
                mb={isMobile ? 2 : 0}
                align="center"
                justify="center"
              >
                <Text fontWeight="bold" ml={4} noOfLines={1}>
                  {formatDate(item?.date)}
                </Text>
              </Flex>

              <Flex
                direction="row"
                mb={isMobile ? 2 : 0}
                align="center"
                justify="center"
              >
                <Text fontWeight="bold" ml={4} noOfLines={1}>
                  R$ {item?.procedure?.price}
                </Text>
              </Flex>
            </Flex>
          </ChakraLink>
        ))}
      </Flex>
    </Sidebar>
  );
};

export default Dashboard;
