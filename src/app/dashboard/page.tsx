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
  useDisclosure,
} from "@chakra-ui/react";
import Link from "next/link";
import { IoMdPerson } from "react-icons/io";
import { setupAPIClient } from "@/services/api";
import { ModalInfo } from "@/components/modal";
import { Spinner } from "@chakra-ui/react";

export interface ScheduleProps {
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
  const [service, setService] = useState<ScheduleProps>();
  const [loading, setLoading] = useState(true);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    document.title = "SmileGestor - Minha agenda";
  }, []);

  useEffect(() => {
    const getSchedule = async () => {
      try {
        const apiClient = setupAPIClient();
        const response = await apiClient.get("/schedule");
        setSchedule(response.data);
      } catch (error) {
        console.log(error);
        setSchedule([]);
      } finally {
        setLoading(false);
      }
    };
    getSchedule();
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

  const handleOpenModal = (item: ScheduleProps) => {
    setService(item);
    onOpen();
  };

  const handleFinish = async (id: string) => {
    try {
      const apiClient = setupAPIClient();
      await apiClient.delete("/schedule", {
        params: {
          schedule_id: id,
        },
      });

      const filterSchedule = schedule.filter((item) => item.id !== id);

      setSchedule(filterSchedule);
    } catch (error) {
      console.log(error);
      alert("Erro ao finalizar este serviço");
    } finally {
      onClose();
    }
  };

  return (
    <>
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

          {loading ? (
            <Flex align="center" justify="center" w="100%" mt={20}>
              <Spinner
                color="gray.900"
                thickness="4px"
                speed="0.65s"
                emptyColor="gray.200"
                size="xl"
              />
            </Flex>
          ) : (
            <>
              {schedule.length === 0 ? (
                <Text fontSize="xl">Nenhum agendamento encontrado.</Text>
              ) : (
                <>
                  {schedule?.map((item) => (
                    <ChakraLink
                      key={item?.id}
                      onClick={() => handleOpenModal(item)}
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
                </>
              )}
            </>
          )}
        </Flex>
      </Sidebar>
      <ModalInfo
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        data={service}
        finishService={() => handleFinish(service?.id)}
      />
    </>
  );
};

export default Dashboard;
