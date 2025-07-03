import { handleApiResponse, handleApiError } from "../utils/apiUtils";
import { useUser } from "../context/UserContext";

export default function useConsultasReportes() {
  const apiUrl = import.meta.env.VITE_API_ENDPOINT;
  const { getAuthHeaders } = useUser();

  // Obtener cobro mensual por cliente (suma de insumos y alquiler del mes actual)
  const fetchCobroMensualCliente = async () => {
    try {
      const url = `${apiUrl}/cobro_mensual_cliente`;
      const res = await fetch(url, {
        headers: getAuthHeaders()
      });
      return await handleApiResponse(res);
    } catch (err) {
      handleApiError(err);
      return [];
    }
  };

  // Obtener costo total de insumos (top 4 más costosos)
  const fetchInsumosCostoTotal = async () => {
    try {
      const url = `${apiUrl}/insumos_costo_total`;
      const res = await fetch(url, {
        headers: getAuthHeaders()
      });
      return await handleApiResponse(res);
    } catch (err) {
      handleApiError(err);
      return [];
    }
  };

  // Obtener costo total de insumos (top 4 más costosos)
  const fetchInsumosCantidadTotal = async () => {
    try {
      const url = `${apiUrl}/insumos_cantidad_total`;
      const res = await fetch(url, {
        headers: getAuthHeaders()
      });
      return await handleApiResponse(res);
    } catch (err) {
      handleApiError(err);
      return [];
    }
  };

  // Obtener técnicos con más mantenimientos (top 4)
  const fetchTecnicosMasMantenimientos = async () => {
    try {
      const url = `${apiUrl}/tecnicos_mas_mantenimientos`;
      const res = await fetch(url, {
        headers: getAuthHeaders()
      });
      return await handleApiResponse(res);
    } catch (err) {
      handleApiError(err);
      return [];
    }
  };

  // Obtener clientes con más máquinas (top 4)
  const fetchClientesMasMaquinas = async () => {
    try {
      const url = `${apiUrl}/clientes_mas_maquinas`;
      const res = await fetch(url, {
        headers: getAuthHeaders()
      });
      return await handleApiResponse(res);
    } catch (err) {
      handleApiError(err);
      return [];
    }
  };

  // Función para obtener todos los reportes de una vez
  const fetchTodosLosReportes = async () => {
    try {
      const [
        cobroMensual,
        insumosCosto,
        tecnicosMantenimientos,
        clientesMaquinas
      ] = await Promise.all([
        fetchCobroMensualCliente(),
        fetchInsumosCostoTotal(),
        fetchTecnicosMasMantenimientos(),
        fetchClientesMasMaquinas()
      ]);

      return {
        cobroMensual,
        insumosCosto,
        tecnicosMantenimientos,
        clientesMaquinas
      };
    } catch (err) {
      handleApiError(err);
      return {
        cobroMensual: [],
        insumosCosto: [],
        tecnicosMantenimientos: [],
        clientesMaquinas: []
      };
    }
  };

  return {
    fetchCobroMensualCliente,
    fetchInsumosCostoTotal,
    fetchTecnicosMasMantenimientos,
    fetchClientesMasMaquinas,
    fetchTodosLosReportes,
    fetchInsumosCantidadTotal
  };
}
