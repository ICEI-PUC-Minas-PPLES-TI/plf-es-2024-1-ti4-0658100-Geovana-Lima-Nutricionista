import { AxiosRequestConfig } from "axios";
import { cep } from "../interfaces/cep";
import { callExternalApi } from "./api.service";

interface Estado {
  sigla: string;
  nome: string;
}

interface Cidade {
  id: number;
  nome: string;
}

export async function getStates(): Promise<Estado[]> {
  try {
    const response = await fetch(
      "https://servicodados.ibge.gov.br/api/v1/localidades/estados"
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erro ao buscar estados:", error);
    return [];
  }
}

export async function getCitiesByState(estado: string): Promise<Cidade[]> {
  try {
    const response = await fetch(
      `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${estado}/municipios`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erro ao buscar cidades:", error);
    return [];
  }
}

export const getCEPInfo = async (value: string) => {
  const config: AxiosRequestConfig = {
    url: `https://viacep.com.br/ws/${value}/json/`,
    method: "GET",
  };

  const { data, error } = (await callExternalApi({
    config,
  })) as { data: cep | null; error: string | null };

  return {
    data,
    error,
  };  
};
