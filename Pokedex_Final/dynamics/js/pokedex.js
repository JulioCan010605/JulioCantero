window.addEventListener("load", () => {
  const btnAgregar = document.getElementById("btn-agregar");
  const divAgregar = document.getElementById("contenedor-agregar");
  const select = document.getElementById("select-tipos");
  const formAgregar = document.getElementById("form-nuevo");
  const btnEnviar = document.getElementById("btn-enviar");
  const buscador = document.getElementById("buscador");
  const resultados = document.getElementById("contenedor-resultados");
  const mostrar = document.getElementById("contenedor-mostrar");
  
  function obtenerTiposPokemon() {
    fetch("./dynamics/php/consultar.php")
      .then((respuesta) => respuesta.json())
      .then((datosJSON) => {
        console.log(datosJSON);
        for (let tipo of datosJSON) {
          select.innerHTML += `<option value="${tipo.type_id}">${tipo.type_name}</option>`;
        }
      });
  }
  
  function mostrarFormularioAgregar() {
    divAgregar.style.display = "block";
  }
  
  function enviarFormularioAgregar(e) {
    e.preventDefault();
    divAgregar.style.display = "none";
    const datosForm = new FormData(formAgregar);
    fetch("./dynamics/php/insertar.php", {
      method: "POST",
      body: datosForm,
    })
      .then((respuesta) => respuesta.json())
      .then((datosJSON) => {
        alert(datosJSON.mensaje);
      });
  }
  
  function buscarPokemon() {
    let termino = buscador.value;
    resultados.innerHTML = "";

    if (termino.length >= 3) {
      fetch(`./dynamics/php/buscador.php?termino=${termino}`)
        .then((respuesta) => respuesta.json())
        .then((datosJSON) => {
          for (let resultado of datosJSON) {
            resultados.innerHTML += `<div class="coincidencia" data-id="${resultado.pok_id}">${resultado.pok_name}</div>`;
          }
          if (datosJSON.length == 0) {
            resultados.innerHTML = "No hay resultados";
          }
        });
    }
  }

  function mostrarInformacionPokemon(e) {
    if (e.target.classList.contains("coincidencia")) {
      let id_pokemon = e.target.dataset.id;
      resultados.innerHTML = "";
      mostrar.innerHTML = "";
      mostrar.style.display = "flex";
      divAgregar.style.display = "none";

      fetch(`./dynamics/php/pokemon.php?id=${id_pokemon}`)
        .then((respuesta) => respuesta.json())
        .then((datosJSON) => {
          let titulo = ["Nombre", "Altura", "Peso", "Tipo", "Experiencia"];
          let datos = [
            datosJSON.pok_name,
            datosJSON.pok_height,
            datosJSON.pok_weight,
            datosJSON.type_name,
            datosJSON.pok_base_experience,
          ];
          let i = 0;
          for (let dato of datos) {
            mostrar.innerHTML += `
              <div class="dato">
                <h1>${titulo[i]}</h1>
                <p>${dato}</p>
              </div>
            `;
            i++;
          }

          mostrar.innerHTML += `
            <button data-id="${datosJSON.pok_id}" id="btn-eliminar" class="botones">
              <h1>Eliminar</h1>
            </button>
            <button data-id="${datosJSON.pok_id}" id="btn-editar" class="botones">
              <h1>Editar</h1>
            </button>
          `;

          // Eventos a los botones de eliminar y editar
          const btnEliminar = document.getElementById("btn-eliminar");
          const btnEditar = document.getElementById("btn-editar");
          btnEliminar.addEventListener("click", eliminarPokemon);
          btnEditar.addEventListener("click", editarPokemon);
        });
    }
  }

  // Funcion para eliminar un PK
  function eliminarPokemon(e) {
    let id_pokemon = e.target.dataset.id;
    fetch(`./dynamics/php/eliminar.php?id=${id_pokemon}`)
      .then((respuesta) => respuesta.json())
      .then((datosJSON) => {
        alert(datosJSON.mensaje);
        mostrar.innerHTML = "";
      });
  }

  // Fun.para editar al PK
  function editarPokemon(e) {
    let id_pokemon = e.currentTarget.dataset.id;
    const datoNombre = document.querySelector("#contenedor-mostrar .dato:nth-child(1) p");
    const datoAltura = document.querySelector("#contenedor-mostrar .dato:nth-child(2) p");
    const datoPeso = document.querySelector("#contenedor-mostrar .dato:nth-child(3) p");
    const datoTipo = document.querySelector("#contenedor-mostrar .dato:nth-child(4) p");
    const datoExperiencia = document.querySelector("#contenedor-mostrar .dato:nth-child(5) p");

    // Convierte la información para editarla
    datoNombre.innerHTML = `<input type="text" value="${datoNombre.textContent}" />`;
    datoAltura.innerHTML = `<input type="number" value="${datoAltura.textContent}" min="1" />`;
    datoPeso.innerHTML = `<input type="number" value="${datoPeso.textContent}" min="1" />`;
    datoTipo.innerHTML = `<input type="text" value="${datoTipo.textContent}" />`; // Aquí conviene crear el select mejor
    datoExperiencia.innerHTML = `<input type="number" value="${datoExperiencia.textContent}" min="1" />`;

    // Crear botón para guardar los cambios
    const btnGuardar = document.createElement("button");
    btnGuardar.textContent = "Guardar";
    btnGuardar.addEventListener("click", () => {
      const nuevoNombre = datoNombre.querySelector("input").value;
      const nuevaAltura = datoAltura.querySelector("input").value;
      const nuevoPeso = datoPeso.querySelector("input").value;
      const nuevoTipo = datoTipo.querySelector("input").value;
      const nuevaExperiencia = datoExperiencia.querySelector("input").value;

      // Realizar la actualización en el servidor
      const datosForm = new FormData();
      datosForm.append("nombre", nuevoNombre);
      datosForm.append("altura", nuevaAltura);
      datosForm.append("peso", nuevoPeso);
      datosForm.append("exp_base", nuevaExperiencia);
      datosForm.append("tipo", nuevoTipo);
      datosForm.append("id", id_pokemon);

      fetch("./dynamics/php/editar.php", {
        method: "POST",
        body: datosForm,
      })
        .then((respuesta) => respuesta.json())
        .then((datosJSON) => {
          alert(datosJSON.mensaje);
          mostrar.innerHTML = "";
        });
    });

    // Reemplazar el botón de editar por el botón de guardar
    const btnEditar = document.getElementById("btn-editar");
    btnEditar.replaceWith(btnGuardar);
  }

  // Asignar eventos a los elementos
  btnAgregar.addEventListener("click", mostrarFormularioAgregar);
  btnEnviar.addEventListener("click", enviarFormularioAgregar);
  buscador.addEventListener("input", buscarPokemon);
  resultados.addEventListener("click", mostrarInformacionPokemon);

  // Obtener los Pokémon al recargar la página
  obtenerTiposPokemon();
});
