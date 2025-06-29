import { useEffect, useState } from "react";
import useInsumos from "../../hooks/UseInsumos";
import "../../styles/sharedStyles.css";

export default function EditarInsumo({ insumoId, onCancel }) {
  const [insumo, setInsumo] = useState({
    descripcion: "",
    tipo: "",
    precio_unitario: "",
    id_proveedor: ""
  });
  const [loading, setLoading] = useState(false);

  const { fetchInsumo, editarInsumo } = useInsumos();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInsumo((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  useEffect(() => {
    if (insumoId) {
      setLoading(true);
      fetchInsumo(insumoId)
        .then((data) => {
          setLoading(false);
          if (data) {
            setInsumo(data);
          } else {
            if (onCancel) onCancel();
          }
        })
        .catch((error) => {
          console.error("Error al cargar insumo:", error);
          setLoading(false);
          if (onCancel) onCancel();
        });
    }
  }, [insumoId]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="agregar-cliente-container">
      <h1>Editar Insumo</h1>
      {loading ? (
        <p>Cargando datos del insumo...</p>
      ) : (
        <>
          <input
            type="text"
            placeholder="Descripción"
            name="descripcion"
            value={insumo.descripcion || ""}
            maxLength={50}
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Tipo"
            value={insumo.tipo || ""}
            name="tipo"
            maxLength={50}
            onChange={handleChange}
          />
          <input
            type="number"
            placeholder="Precio Unitario"
            value={insumo.precio_unitario || ""}
            name="precio_unitario"
            step="0.01"
            onChange={handleChange}
          />
          <input
            type="number"
            placeholder="ID Proveedor"
            value={insumo.id_proveedor || ""}
            name="id_proveedor"
            onChange={handleChange}
          />
          <div className="form-buttons">
            <button
              onClick={() => {
                editarInsumo(insumoId, insumo);
                if (onCancel) onCancel();
              }}
            >
              Editar Insumo
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
