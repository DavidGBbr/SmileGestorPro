"use client";
import { Sidebar } from "@/components/sidebar";
import { Button, Flex, Heading, Input, Select } from "@chakra-ui/react";
import { useEffect, useState } from "react";

export default function New() {
  const [customer, setCustomer] = useState("");

  useEffect(() => {
    document.title = "Novo agendamento";
  }, []);

  return (
    <Sidebar>
      <Flex direction="column" align="flex-start" justify="flex-start">
        <Flex direction="row" w="100%" align="center" justify="flex-start">
          <Heading fontSize="3xl" mt={4} mb={4} mr={4} color="#fff">
            Novo agendamento
          </Heading>
        </Flex>

        <Flex
          maxW="700px"
          pt={8}
          pb={8}
          width="100%"
          direction="column"
          align="center"
          justify="center"
          bg="clinic.400"
        >
          <Input
            placeholder="Nome do paciente"
            _placeholder={{ color: "#fff" }}
            w="85%"
            mb={3}
            size="lg"
            type="text"
            bg="gray.900"
            color="#fff"
            value={customer}
            onChange={(e) => setCustomer(e.target.value)}
          />
          <Input
            placeholder="Selecione a data e horário para atendimento."
            w="85%"
            mb={3}
            size="lg"
            type="datetime-local"
            bg="gray.900"
            color="#fff"
            css={`
              ::-webkit-calendar-picker-indicator {
                background: url(https://cdn.iconfinder.com/stored_data/1408367/128/png?token=1701810871-jf2rXNjneaXxHYDTFpY44AOMoUEUrhvcRCYA50e1lJg%3D)
                  center/80% no-repeat;
              }
            `}
          />
          <Select bg="gray.900" color="#fff" mb={3} size="lg" w="85%">
            <option key={1} value="Extração de siso">
              Extração de siso
            </option>
          </Select>

          <Button
            w="85%"
            size="lg"
            color="gray.900"
            bg="button.cta"
            _hover={{ bg: "#ffb13e" }}
          >
            Cadastrar
          </Button>
        </Flex>
      </Flex>
    </Sidebar>
  );
}
