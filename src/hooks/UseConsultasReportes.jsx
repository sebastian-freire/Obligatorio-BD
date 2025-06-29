import toast from "react-hot-toast";

export default function useConsultasReportes() {
  const apiUrl = import.meta.env.VITE_API_ENDPOINT;

  // Obtener cobro mensual por cliente (suma de insumos y alquiler del mes actual)
  const fetchCobroMensualCliente = async () => {
    try {
      const url = `${apiUrl}/cobro_mensual_cliente`;
      const res = await fetch(url);
      if (!res.ok)
        throw new Error("Error al obtener cobro mensual por cliente");
      const data = await res.json();
      return data;
    } catch (err) {
      console.error("Failed to fetch cobro mensual cliente:", err);
      toast.error("Error al cargar cobro mensual por cliente");
      return [];
    }
  };

  // Obtener costo total de insumos (top 4 más costosos)
  const fetchInsumosCostoTotal = async () => {
    try {
      const url = `${apiUrl}/insumos_costo_total`;
      const res = await fetch(url);
      if (!res.ok) throw new Error("Error al obtener costo total de insumos");
      const data = await res.json();
      return data;
    } catch (err) {
      console.error("Failed to fetch insumos costo total:", err);
      toast.error("Error al cargar costo total de insumos");
      return [];
    }
  };

  // Obtener costo total de insumos (top 4 más costosos)
  const fetchInsumosCantidadTotal = async () => {
    try {
      const url = `${apiUrl}/insumos_cantidad_total`;
      const res = await fetch(url);
      if (!res.ok)
        throw new Error("Error al obtener cantidad total de insumos");
      const data = await res.json();
      return data;
    } catch (err) {
      console.error("Failed to fetch insumos cantidad total:", err);
      toast.error("Error al cargar cantidad total de insumos");
      return [];
    }
  };

  // Obtener técnicos con más mantenimientos (top 4)
  const fetchTecnicosMasMantenimientos = async () => {
    try {
      const url = `${apiUrl}/tecnicos_mas_mantenimientos`;
      const res = await fetch(url);
      if (!res.ok)
        throw new Error("Error al obtener técnicos con más mantenimientos");
      const data = await res.json();
      return data;
    } catch (err) {
      console.error("Failed to fetch tecnicos mas mantenimientos:", err);
      toast.error("Error al cargar técnicos con más mantenimientos");
      return [];
    }
  };

  // Obtener clientes con más máquinas (top 4)
  const fetchClientesMasMaquinas = async () => {
    try {
      const url = `${apiUrl}/clientes_mas_maquinas`;
      const res = await fetch(url);
      if (!res.ok)
        throw new Error("Error al obtener clientes con más máquinas");
      const data = await res.json();
      return data;
    } catch (err) {
      console.error("Failed to fetch clientes mas maquinas:", err);
      toast.error("Error al cargar clientes con más máquinas");
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
      console.error("Failed to fetch all reports:", err);
      toast.error("Error al cargar los reportes");
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
