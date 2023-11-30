"use client";
import { useContext, useEffect, useState } from "react";
import {
  Flex,
  Text,
  Heading,
  Box,
  Input,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";
import { Sidebar } from "@/components/sidebar";
import Link from "next/link";
import { AuthContext } from "@/context/AuthContext";
import { api } from "@/services/apiClient";

interface ProfileProps {
  id: string;
  name: string;
  email: string;
  address: string | null;
  premium: boolean;
}

export default function profile() {
  const [profile, setProfile] = useState<ProfileProps>();
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const { logoutUser } = useContext(AuthContext);

  useEffect(() => {
    document.title = "Minha Conta - SmileGestorPRO";
  }, []);

  useEffect(() => {
    const handleData = async () => {
      const response = await api.get("/me");
      setProfile({
        id: response.data.user.id,
        name: response.data.user.name,
        email: response.data.user.email,
        address: response.data.user.address,
        premium:
          response.data.user.subscriptions?.status === "active" ? true : false,
      });
    };
    try {
      handleData();
    } catch (error) {
      console.log("Renderizando dados:", error);
    }
  }, []);

  useEffect(() => {
    setName(profile?.name);
    setAddress(profile?.address);
  }, [profile]);

  const handleLogout = async () => {
    await logoutUser();
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
            w="100%"
            direction="row"
            alignItems="center"
            justifyContent="flex-start"
          >
            <Heading fontSize="3xl" mt={4} mb={4} mr={4} color="orange.900">
              Minha Conta
            </Heading>
          </Flex>

          <Flex
            pt={8}
            pb={8}
            background="clinic.400"
            color="#fff"
            maxW="700px"
            w="100%"
            direction="column"
            alignItems="center"
            justifyContent="center"
          >
            <Flex direction="column" w="85%">
              <Text mb={2} fontSize="xl" fontWeight="bold">
                Nome da clínica:
              </Text>
              <Input
                w="100%"
                background="gray.900"
                placeholder="Nome da sua clínica"
                size="lg"
                type="text"
                mb={3}
                borderColor={useColorModeValue("gray.700", "gray.900")}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <Text mb={2} fontSize="xl" fontWeight="bold">
                Endereço:
              </Text>
              <Input
                w="100%"
                background="gray.900"
                placeholder="Endereço da clínica"
                size="lg"
                type="text"
                mb={3}
                borderColor={useColorModeValue("gray.700", "gray.900")}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />

              <Text mb={2} fontSize="xl" fontWeight="bold">
                Plano atual:
              </Text>
              <Flex
                direction="row"
                w="100%"
                mb={3}
                p={1}
                borderWidth={1}
                rounded={6}
                background="clinic.900"
                alignItems="center"
                justifyContent="space-between"
                borderColor={useColorModeValue("gray.700", "gray.900")}
              >
                <Text
                  p={2}
                  fontSize="lg"
                  color={profile?.premium ? "#fba931" : "#4dffb4"}
                >
                  Plano {profile?.premium ? "Premium" : "Grátis"}
                </Text>
                <Link href="/planos">
                  <Box
                    cursor="pointer"
                    p={1}
                    pl={2}
                    pr={2}
                    background="#00cd52"
                    rounded={4}
                    color="#fff"
                  >
                    Mudar plano
                  </Box>
                </Link>
              </Flex>
              <Button
                w="100%"
                mt={3}
                mb={4}
                bg="button.cta"
                size="lg"
                _hover={{ bg: "#ffbd3e" }}
              >
                Salvar
              </Button>
              <Button
                w="100%"
                mb={6}
                bg="transparent"
                borderWidth={2}
                borderColor="red.500"
                color="red.500"
                size="lg"
                _hover={{ bg: "transparent" }}
                onClick={handleLogout}
              >
                Sair da conta
              </Button>
            </Flex>
          </Flex>
        </Flex>
      </Sidebar>
    </>
  );
}
