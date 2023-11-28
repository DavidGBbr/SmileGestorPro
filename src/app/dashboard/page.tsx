"use client";
import { Sidebar } from "@/components/sidebar";
import { Flex, Text } from "@chakra-ui/react";
import React, { useEffect } from "react";

const Dashboard = () => {
  useEffect(() => {
    document.title = "SmileGestor - Minha clínica";
  }, []);

  return (
    <Sidebar>
      <Flex>
        <Text>Bem vindo ao dashboard</Text>
      </Flex>
    </Sidebar>
  );
};

export default Dashboard;
