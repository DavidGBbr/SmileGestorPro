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
import { ChangeEvent, useEffect, useState } from "react";
import Link from "next/link";
import { setupAPIClient } from "@/services/api";

interface ProcedureType {
  id: string;
  name: string;
  price: string | number;
  status: true;
  user_id: string;
}

interface SubscriptionType {
  id: string;
  status: string;
}

export default function EditProcedure({ params }: { params: { id: string } }) {
  const [procedure, setProcedure] = useState<ProcedureType>();
  const [subscription, setSubscription] = useState<SubscriptionType | null>();
  const [name, setName] = useState(procedure?.name);
  const [price, setPrice] = useState(procedure?.price);
  const [status, setStatus] = useState(
    procedure?.status ? "disabled" : "enabled"
  );
  const [loading, setLoading] = useState(false);
  const [isMobile] = useMediaQuery("(max-width: 500px)");

  useEffect(() => {
    document.title = "Editando procedimento";
  }, []);

  useEffect(() => {
    const getDetailProcedure = async () => {
      const apiClient = setupAPIClient();
      const response = await apiClient("procedure/detail", {
        params: {
          procedure_id: params.id,
        },
      });
      setProcedure(response.data);
    };
    try {
      getDetailProcedure();
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    const getSubscription = async () => {
      const apiClient = setupAPIClient();
      const response = await apiClient("procedure/check");
      setSubscription(response.data.subscriptions);
    };
    try {
      getSubscription();
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    setName(procedure?.name);
    setPrice(procedure?.price);
    setStatus(procedure?.status ? "disabled" : "enabled");
  }, [procedure]);

  const handleChangeStatus = ({ target }: ChangeEvent<HTMLInputElement>) => {
    if (target.value === "disabled") {
      setStatus("enabled");
    } else {
      setStatus("disabled");
    }
  };

  const handleUpdate = async () => {
    if (name === "" || price === "") {
      return;
    }

    try {
      setLoading(true);
      const apiClient = setupAPIClient();
      await apiClient.put("/procedure", {
        name: name,
        price: Number(price),
        status: status === "disabled" ? true : false,
        procedure_id: procedure?.id,
      });
      alert("Procedimento atualizado com sucesso!");
      window.location.href = "/procedures";
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

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
              value={name}
              onChange={(e) => setName(e.target.value)}
              color="#fff"
            />
            <Input
              placeholder="Valor do seu procedimento"
              bg="gray.900"
              mb={3}
              size="lg"
              type="number"
              w="100%"
              borderColor={useColorModeValue("gray.700", "gray.900")}
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              color="#fff"
            />

            <Stack mb={6} align="center" direction="row">
              <Text fontWeight="bold" color="#fff">
                Desativar procedimento
              </Text>
              <Switch
                size="lg"
                colorScheme="red"
                value={status}
                isChecked={status === "disabled" ? false : true}
                onChange={(e) => handleChangeStatus(e)}
              />
            </Stack>

            <Button
              mb={6}
              w="100%"
              bg="button.cta"
              color="gray.900"
              _hover={{ bg: "#ffb13e" }}
              isDisabled={subscription?.status !== "active"}
              onClick={handleUpdate}
              loadingText="Salvando"
              spinnerPlacement="end"
              isLoading={loading}
            >
              Salvar
            </Button>
            {subscription?.status !== "active" ? (
              <Flex direction="row" align="center" justify="center" pb={3}>
                <Link href="/planos">
                  <Text
                    cursor="pointer"
                    fontWeight="bold"
                    mr={1}
                    color="#31fb6a"
                  >
                    Seja premium
                  </Text>
                </Link>
                <Text color="#fff">tenha todos acessos liberados.</Text>
              </Flex>
            ) : (
              <></>
            )}
          </Flex>
        </Flex>
      </Sidebar>
    </>
  );
}
