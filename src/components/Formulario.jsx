import React from "react";

const Formulario = () => {
  const [nombre, setNombre] = React.useState("");
  const [apellido, setApellido] = React.useState("");
  const [lista, setLista] = React.useState([]);
  const [editando, setEditando] = React.useState(false);
  const [indiceEditar, setIndiceEditar] = React.useState(null);
  const [indiceEditando, setIndiceEditando] = React.useState(null);

  const registrarDatos = (e) => {
    e.preventDefault();
    if (!nombre.trim()) {
      alert("Nombre no puede estar vacio");
      return;
    }
    if (!apellido.trim()) {
      alert("Apellido no puede estar vacio");
      return;
    }

    //agregar usuario
    if (editando) {
      const nuevaLista = [...lista];
      nuevaLista[indiceEditar] = { nombre, apellido };
      setLista(nuevaLista);
      setEditando(false);
      setIndiceEditar(null);
    } else {
      setLista([...lista, { nombre, apellido }]);
    }
    //resetar inputs
    setNombre("");
    setApellido("");
  };

  const eliminarUsuario = (indice) => {
    const nuevaLista = lista.filter((elemento, index) => index !== indice);
    setLista(nuevaLista);
  };

  const editarUsuario = (indice) => {
    // obtener el elemento correspondiente al índice
    const elemento = lista[indice];
    // establecer el nombre y el apellido en los inputs
    setNombre(elemento.nombre);
    setApellido(elemento.apellido);
    setEditando(true);
    // eliminar el elemento de la lista
    setIndiceEditar(indice);
  };

  return (
    <div className="container">
      <h2>Formulario</h2>
      <form onSubmit={registrarDatos}>
        <input
          type="text"
          placeholder="Ingrese su nombre"
          className="form-control form-group mb-3"
          onChange={(e) => setNombre(e.target.value)}
          onFocus={() => setIndiceEditando(null)}
          value={nombre}
        />

        <input
          type="text"
          placeholder="Ingrese su apellido"
          className="form-control form-group mb-3"
          onChange={(e) => setApellido(e.target.value)}
          onFocus={() => setIndiceEditando(null)}
          value={apellido}
        />

        <button
          className={`btn ${editando ? "btn-success" : "btn-primary"}`}
          type="submit"
        >
          {editando ? "Modificar" : "Registrar"}
        </button>
      </form>

      <hr />

      <h2 className="listado-titulo">Listado de usuarios registrados</h2>
      <ol>
        {lista.map((elemento, index) => (
          <li
            key={index}
            className={indiceEditando === index ? "editando" : ""}
          >
            {elemento.nombre} {elemento.apellido}
            <button
              className="btn btn-eliminar"
              onClick={() => eliminarUsuario(index)}
            >
              Eliminar
            </button>
            <button
              className="btn btn-success ml-3"
              onClick={() => editarUsuario(index)}
            >
              Editar
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default Formulario;
