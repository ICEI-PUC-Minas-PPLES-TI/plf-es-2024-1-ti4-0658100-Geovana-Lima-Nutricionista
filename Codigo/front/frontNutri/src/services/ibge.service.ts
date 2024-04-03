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
  