"use client";
import { Flex, Center, Text, Input, Button } from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import logoImg from "../../../public/images/logo.svg";
import Link from "next/link";
import { AuthContext } from "@/context/AuthContext";

const Login = () => {
  const { signIn } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin() {
    await signIn({ email, password });
  }

  useEffect(() => {
    document.title = "Smile Gestor PRO - login";
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
            _hover={{ bg: "#2d375f" }}
            variant="filled"
            size="lg"
            placeholder="Digite seu email..."
            color="clinic.100"
            type="email"
            mb={3}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Input
            background="clinic.400"
            _hover={{ bg: "#2d375f" }}
            variant="filled"
            size="lg"
            placeholder="Digite sua senha..."
            color="clinic.100"
            type="password"
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
            onClick={handleLogin}
          >
            Acessar
          </Button>

          <Center mt={2}>
            <Link href="/register">
              <Text cursor="pointer" color="clinic.100">
                Ainda não possui conta? <strong>Cadastre-se</strong>
              </Text>
            </Link>
          </Center>
        </Flex>
      </Flex>
    </>
  );
};

export default Login;
