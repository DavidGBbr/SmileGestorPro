import { setupAPIClient } from "@/services/api";
import { toast } from "react-toastify";

type Props = {
  name: string;
  price: number;
  status: boolean;
  procedure_id: string;
};

export async function updateProcedure(procedureData: Props) {
  const apiClient = setupAPIClient();

  try {
    const response = await apiClient.put("/procedure", procedureData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status !== 200) {
      toast.error("Falha ao atualizar procedimento");
      console.error("Failed to update a schedule");
      return;
    }

    toast.success("Procedimento atualizado com sucesso!");
  } catch (error) {
    toast.error("Falha ao atualizar o procedimento");
    console.error("Failed to update a procedure", error);
  }
}
