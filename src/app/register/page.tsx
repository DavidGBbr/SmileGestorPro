"use client";
import { Flex, Center, Text, Input, Button } from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import logoImg from "../../../public/images/logo.svg";
import Link from "next/link";
import { AuthContext } from "@/context/AuthContext";

const Register = () => {
  const { signUp } = useContext(AuthContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleRegister() {
    if (name === "" || email === "" || password === "") {
      return;
    }

    try {
      setLoading(true);
      await signUp({ name, email, password });
      setName("");
      setEmail("");
      setPassword("");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    document.title = "Cadastre-se no Smile Gestor Pro";
  }, []);
  return (
    <>
      <Flex
        background="clinic.900"
        height="100vh"
        alignItems="center"
        justifyContent="center"
      >
        <Flex width={640} direction="column" p={14} rounded={8}>
          <Center p={4}>
            <Image
              src={logoImg}
              quality={100}
              width={280}
              objectFit="fill"
              alt="logo smile gestor"
            />
          </Center>

          <Input
            background="clinic.400"
            variant="filled"
            size="lg"
            placeholder="Nome da clínica"
            color="clinic.100"
            type="email"
            mb={3}
            _hover={{ bg: "#2d375f" }}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <Input
            background="clinic.400"
            variant="filled"
            size="lg"
            placeholder="Digite seu email..."
            color="clinic.100"
            type="email"
            mb={3}
            _hover={{ bg: "#2d375f" }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Input
            background="clinic.400"
            variant="filled"
            size="lg"
            placeholder="Digite sua senha..."
            color="clinic.100"
            type="password"
            _hover={{ bg: "#2d375f" }}
            mb={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button
            background="button.cta"
            mb={6}
            color="gray.900"
            size="lg"
            _hover={{ bg: "#ffb13e" }}
            onClick={handleRegister}
            isLoading={loading}
          >
            Cadastrar
          </Button>

          <Center mt={2}>
            <Link href="/login">
              <Text cursor="pointer" color="clinic.100">
                Já possui conta? <strong>Faça login</strong>
              </Text>
            </Link>
          </Center>
        </Flex>
      </Flex>
    </>
  );
};

export default Register;
