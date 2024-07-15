import { setupAPIClient } from "@/services/api";
import { toast } from "react-toastify";

type Props = {
  name: string;
  price: number;
};

export async function createProcedure(procedureData: Props) {
  const apiClient = setupAPIClient();

  try {
    const response = await apiClient.post("/procedure", procedureData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status !== 200) {
      toast.error("Falha ao criar procedimento");
      console.error("Failed to create a schedule");
      return;
    }

    toast.success("Procedimento criado com sucesso!");
  } catch (error) {
    toast.error("Falha ao criar o procedimento");
    console.error("Failed to create a procedure", error);
  }
}
