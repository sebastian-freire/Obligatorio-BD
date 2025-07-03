import { useEffect, useState } from "react";
import useMantenimientos from "../../hooks/UseMantenimientos";
import "../../styles/sharedStyles.css";
import toast from "react-hot-toast";

export default function EditarMantenimiento({ mantenimientoId, onCancel }) {
  const [mantenimiento, setMantenimiento] = useState({
    id_maquina: "",
    ci_tecnico: "",
    tipo: "",
    fecha: "",
    observaciones: ""
  });
  const [loading, setLoading] = useState(false);

  const { fetchMantenimiento, editarMantenimiento } = useMantenimientos();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setMantenimiento((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  //Esto es para mejorar de forma visual como se ve la fecha en el input
  // Si no estuviera funciona igualmente, pero se vería la fecha en formato GMT
  // como "Sat, 28 Jun 2025 05:01:00 GMT
  useEffect(() => {
    if (mantenimientoId) {
      setLoading(true);
      fetchMantenimiento(mantenimientoId)
        .then((data) => {
          setLoading(false);
          if (data) {
            // Formatear fecha para datetime-local input
            let fechaFormatted = "";
            if (data.fecha) {
              try {
                const fechaObj = new Date(data.fecha);

                if (!isNaN(fechaObj.getTime())) {
                  const year = fechaObj.getFullYear();
                  const month = String(fechaObj.getMonth() + 1).padStart(
                    2,
                    "0"
                  );
                  const day = String(fechaObj.getDate()).padStart(2, "0");
                  const hours = String(fechaObj.getHours()).padStart(2, "0");
                  const minutes = String(fechaObj.getMinutes()).padStart(
                    2,
                    "0"
                  );

                  fechaFormatted = `${year}-${month}-${day}T${hours}:${minutes}`;
                }
              } catch (error) {
                console.error("Error al formatear fecha:", error);
                fechaFormatted = "";
              }
            }

            setMantenimiento({ ...data, fecha: fechaFormatted });
          } else {
            if (onCancel) onCancel();
          }
        })
        .catch((error) => {
          console.error("Error al cargar mantenimiento:", error);
          setLoading(false);
          if (onCancel) onCancel();
        });
    }
  }, [mantenimientoId]);

  return (
    <div className="agregar-cliente-container">
      <h1>Editar Mantenimiento</h1>
      {loading ? (
        <p>Cargando datos del mantenimiento...</p>
      ) : (
        <>
          <input
            type="datetime-local"
            value={mantenimiento.fecha || ""}
            placeholder="Fecha"
            name="fecha"
            onChange={handleChange}
          />
          <input
            type="number"
            value={mantenimiento.id_maquina || ""}
            placeholder="ID Máquina"
            name="id_maquina"
            onChange={handleChange}
          />
          <input
            type="text"
            value={mantenimiento.ci_tecnico || ""}
            placeholder="C.I. técnico"
            name="ci_tecnico"
            onChange={handleChange}
          />
          <input
            type="text"
            value={mantenimiento.tipo || ""}
            placeholder="Tipo"
            name="tipo"
            onChange={handleChange}
          />
          <input
            type="text"
            value={mantenimiento.observaciones || ""}
            placeholder="Observaciones"
            name="observaciones"
            onChange={handleChange}
          />
          <div className="form-buttons">
            <button
              onClick={async () => {
                if (
                  mantenimiento.fecha.trim() === "" ||
                  mantenimiento.id_maquina.toString().trim() === "" ||
                  mantenimiento.ci_tecnico.trim() === "" ||
                  mantenimiento.tipo.trim() === "" ||
                  mantenimiento.observaciones.trim() === ""
                ) {
                  toast.error("Por favor, complete todos los campos.");
                  return;
                }
                // Convertir fecha de vuelta al formato esperado por el servidor
                const fechaFormateada =
                  mantenimiento.fecha.replace("T", " ") + ":00";
                const mantenimientoParaEnviar = {
                  ...mantenimiento,
                  fecha: fechaFormateada
                };
                const response = await editarMantenimiento(
                  mantenimientoId,
                  mantenimientoParaEnviar
                );
                if (response && onCancel) onCancel();
              }}
            >
              Editar Mantenimiento
            </button>
            <button onClick={onCancel} className="cancel-button">
              Cancelar
            </button>
          </div>
        </>
      )}
    </div>
  );
}
