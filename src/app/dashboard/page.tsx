"use client";
import { Flex, Text } from "@chakra-ui/react";
import React, { useEffect } from "react";

const Dashboard = () => {
  useEffect(() => {
    document.title = "SmileGestor - Minha clínica";
  }, []);

  return (
    <Flex>
      <Text>Bem vindo ao dashboard</Text>
    </Flex>
  );
};

export default Dashboard;
