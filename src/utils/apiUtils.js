import toast from "react-hot-toast";

/**
 * Maneja la respuesta de la API de forma consistente
 * @param {Response} response - Respuesta del fetch
 * @returns {Promise<any>} - Datos de la respuesta
 */
export const handleApiResponse = async (response) => {
  const responseData = await response.json();

  if (!response.ok) {
    // Usar mensaje del servidor para errores
    const errorMessage =
      responseData.error ||
      responseData.message ||
      `Error ${response.status}: ${response.statusText}`;
    throw new Error(errorMessage);
  }

  // Mostrar mensaje de éxito si existe
  if (responseData.message) {
    toast.success(responseData.message);
  }

  return responseData;
};

/**
 * Maneja errores de la API de forma consistente
 * @param {Error} err - Error capturado
 * @returns {boolean} - Siempre retorna false para indicar fallo
 */
export const handleApiError = (err) => {
  console.error(err);
  const errorMsg = err.message || "Error desconocido";
  toast.error(errorMsg);
  return false;
};
