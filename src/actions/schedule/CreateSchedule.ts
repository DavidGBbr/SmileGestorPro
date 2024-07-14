import { setupAPIClient } from "@/services/api";
import { toast } from "react-toastify";

type Props = {
  customer: string;
  procedure_id: string;
  date: string;
};

export async function createSchedule(scheduleData: Props) {
  const apiClient = setupAPIClient();

  try {
    const response = await apiClient.post("/schedule", scheduleData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status !== 200) {
      toast.error("Falha ao criar agendamento");
      console.error("Failed to create a schedule");
      return;
    }

    toast.success("Agendamento criado com sucesso!");
  } catch (error) {
    toast.error("Falha ao criar o agendamento");
    console.error("Failed to create a schedule", error);
  }
}
