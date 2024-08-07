"use client";
import { createSchedule } from "@/actions/schedule/CreateSchedule";
import { Sidebar } from "@/components/sidebar";
import { setupAPIClient } from "@/services/api";
import { Button, Flex, Heading, Input, Select } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

interface ProcedureProps {
  id: string;
  name: string;
  price: string | number;
  status: boolean;
  user_id: string;
}

export default function New() {
  const [customer, setCustomer] = useState("");
  const [procedures, setProcedures] = useState<ProcedureProps[]>([]);
  const [procedureSelected, setProcedureSelected] =
    useState<ProcedureProps | null>(null);
  const [datetime, setDatetime] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.title = "Novo agendamento";
  }, []);

  useEffect(() => {
    const getProcedures = async () => {
      try {
        const apiClient = setupAPIClient();
        const response = await apiClient.get("/procedures", {
          params: {
            status: true,
          },
        });
        setProcedures(response.data);

        if (response.data === null) {
          window.location.href = "/dashboard";
        }
      } catch (error) {
        console.log(error);
        window.location.href = "/dashboard";
      }
    };

    getProcedures();
  }, []);

  useEffect(() => {
    if (procedures.length) {
      setProcedureSelected(procedures[0]);
    }
  }, [procedures]);

  const handleChangeSelect = (id: string) => {
    const procedureItem = procedures.find((procedure) => procedure.id === id);
    setProcedureSelected(procedureItem);
  };

  const handleRegister = async () => {
    if (customer === "" || !procedureSelected || !datetime) {
      toast.warn("Preencha todos os campos!");
      return;
    }

    try {
      setLoading(true);
      await createSchedule({
        customer,
        procedure_id: procedureSelected.id,
        date: `${datetime}:00.000Z`,
      });
      window.location.href = "/dashboard";
    } catch (error) {
      toast.error("Erro ao agendar!");
      console.error("Erro ao agendar: " + error);
      setLoading(false);
    }
  };

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
            w="85%"
            mb={3}
            size="lg"
            type="datetime-local"
            bg="gray.900"
            color="#fff"
            css={`
              ::-webkit-calendar-picker-indicator {
                background: url(/images/calendar.svg) center/80% no-repeat;
              }
            `}
            value={datetime}
            onChange={(e) => setDatetime(e.target.value)}
          />
          <Select
            bg="gray.900"
            color="#fff"
            mb={3}
            size="lg"
            w="85%"
            onChange={(e) => handleChangeSelect(e.target.value)}
          >
            {procedures?.map((procedure) => (
              <option
                key={procedure.id}
                value={procedure.id}
                style={{ color: "black" }}
              >
                {procedure.name}
              </option>
            ))}
          </Select>

          <Button
            w="85%"
            size="lg"
            color="gray.900"
            bg="button.cta"
            _hover={{ bg: "#ffb13e" }}
            onClick={handleRegister}
            loadingText="Cadastrando"
            spinnerPlacement="end"
            isLoading={loading}
          >
            Cadastrar
          </Button>
        </Flex>
      </Flex>
    </Sidebar>
  );
}
