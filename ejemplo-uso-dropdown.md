// Ejemplo de uso en ListaClientes.jsx

import Dropdown from "../../components/Dropdown";

// En lugar de:

<div className="dropdown">
  <button
    className="dots-button"
    onClick={() => setOpen(open === index ? null : index)}
  >
    ⋮
  </button>
  {open === index && (
    <div className="dropdown-content">
      <button
        className="dropdown-item"
        onClick={() => navigate(`/clientes/editar/${cliente.id}`)}
      >
        Editar
      </button>
      <button
        className="dropdown-item"
        onClick={() => handleEliminar(cliente.id)}
      >
        Eliminar
      </button>
    </div>
  )}
</div>

// Usarías:
<Dropdown>
<button
className="dropdown-item"
onClick={() => navigate(`/clientes/editar/${cliente.id}`)}

>

    Editar

  </button>
  <button
    className="dropdown-item"
    onClick={() => handleEliminar(cliente.id)}
  >
    Eliminar
  </button>
</Dropdown>
