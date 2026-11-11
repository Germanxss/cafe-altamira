/* =========================================================
   Café Altamira - Interacciones de la interfaz
   1. Menú de navegación adaptable (hamburguesa)
   2. Sombra del encabezado y enlace activo según la sección
   3. Filtro de productos del menú
   4. Tarjetas interactivas (detalles y pedido)
   5. Validación del formulario de reservas
   6. Botón para volver arriba
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const header = document.getElementById("encabezado");
  const navToggle = document.querySelector(".nav-toggle");
  const nav = document.getElementById("menu-principal");
  const navLinks = document.querySelectorAll(".nav-link");
  const aviso = document.getElementById("aviso");
  const escritorio = window.matchMedia("(min-width: 1024px)");

  /* ---------- Mensaje emergente reutilizable ---------- */
  let temporizadorAviso;
  const mostrarAviso = (texto) => {
    aviso.textContent = texto;
    aviso.classList.add("mostrar");
    clearTimeout(temporizadorAviso);
    temporizadorAviso = setTimeout(() => aviso.classList.remove("mostrar"), 2600);
  };

  /* ---------- 1. Menú adaptable ---------- */
  const abrirMenu = () => {
    nav.classList.add("abierto");
    body.classList.add("menu-abierto");
    navToggle.setAttribute("aria-expanded", "true");
    navToggle.setAttribute("aria-label", "Cerrar menú de navegación");
  };

  const cerrarMenu = () => {
    nav.classList.remove("abierto");
    body.classList.remove("menu-abierto");
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", "Abrir menú de navegación");
  };

  navToggle.addEventListener("click", (evento) => {
    evento.stopPropagation();
    nav.classList.contains("abierto") ? cerrarMenu() : abrirMenu();
  });

  nav.addEventListener("click", (evento) => {
    if (evento.target.closest("a")) cerrarMenu();
  });

  document.addEventListener("click", (evento) => {
    if (nav.classList.contains("abierto") && !nav.contains(evento.target)) cerrarMenu();
  });

  document.addEventListener("keydown", (evento) => {
    if (evento.key === "Escape" && nav.classList.contains("abierto")) {
      cerrarMenu();
      navToggle.focus();
    }
  });

  escritorio.addEventListener("change", (evento) => {
    if (evento.matches) cerrarMenu();
  });

  /* ---------- 2. Encabezado y enlace activo ---------- */
  const botonArriba = document.getElementById("volver-arriba");

  const alDesplazar = () => {
    const desplazado = window.scrollY > 20;
    header.classList.toggle("con-sombra", desplazado);
    botonArriba.classList.toggle("visible", window.scrollY > 600);
  };
  window.addEventListener("scroll", alDesplazar, { passive: true });
  alDesplazar();

  const secciones = document.querySelectorAll("main section[id]");
  const observador = new IntersectionObserver(
    (entradas) => {
      entradas.forEach((entrada) => {
        if (!entrada.isIntersecting) return;
        const id = entrada.target.getAttribute("id");
        navLinks.forEach((enlace) => {
          enlace.classList.toggle("activo", enlace.getAttribute("href") === `#${id}`);
        });
      });
    },
    { rootMargin: "-45% 0px -50% 0px" }
  );
  secciones.forEach((seccion) => observador.observe(seccion));

  /* ---------- 3. Filtro de productos ---------- */
  const filtros = document.querySelectorAll(".filtro");
  const tarjetas = document.querySelectorAll(".tarjeta");

  filtros.forEach((filtro) => {
    filtro.addEventListener("click", () => {
      const categoria = filtro.dataset.filtro;

      filtros.forEach((f) => {
        const activo = f === filtro;
        f.classList.toggle("activo", activo);
        f.setAttribute("aria-pressed", String(activo));
      });

      tarjetas.forEach((tarjeta) => {
        const coincide = categoria === "todos" || tarjeta.dataset.categoria === categoria;
        tarjeta.classList.remove("aparecer");
        tarjeta.classList.toggle("oculta", !coincide);
        if (coincide) {
          void tarjeta.offsetWidth;
          tarjeta.classList.add("aparecer");
        }
      });
    });
  });

  /* ---------- 4. Tarjetas interactivas ---------- */
  document.querySelectorAll(".ver-detalle").forEach((boton) => {
    boton.addEventListener("click", () => {
      const detalle = document.getElementById(boton.getAttribute("aria-controls"));
      const expandido = boton.getAttribute("aria-expanded") === "true";
      boton.setAttribute("aria-expanded", String(!expandido));
      boton.textContent = expandido ? "Detalles" : "Ocultar";
      detalle.hidden = expandido;
    });
  });

  const contador = document.getElementById("contador-pedido");
  let totalPedido = 0;

  document.querySelectorAll(".agregar").forEach((boton) => {
    boton.addEventListener("click", () => {
      totalPedido += 1;
      contador.textContent = totalPedido;
      contador.classList.remove("pulso");
      void contador.offsetWidth;
      contador.classList.add("pulso");

      boton.textContent = "Agregado ✓";
      boton.classList.add("agregado");
      setTimeout(() => {
        boton.textContent = "Agregar";
        boton.classList.remove("agregado");
      }, 1400);

      mostrarAviso(`${boton.dataset.producto} se agregó a tu pedido`);
    });
  });

  /* ---------- 5. Formulario de reservas ---------- */
  const formulario = document.getElementById("form-reserva");
  const mensajeExito = document.getElementById("form-exito");
  const campoFecha = document.getElementById("fecha");

  const hoy = new Date();
  const formatoFecha = (fecha) => {
    const mes = String(fecha.getMonth() + 1).padStart(2, "0");
    const dia = String(fecha.getDate()).padStart(2, "0");
    return `${fecha.getFullYear()}-${mes}-${dia}`;
  };
  campoFecha.min = formatoFecha(hoy);

  const mensajes = {
    nombre: "Escribe tu nombre (mínimo 3 caracteres).",
    correo: "Ingresa un correo electrónico válido.",
    telefono: "Ingresa un teléfono válido (solo números).",
    personas: "Selecciona el número de personas.",
    fecha: "Elige una fecha a partir de hoy.",
    hora: "Elige una hora entre las 7:00 a. m. y las 8:00 p. m.",
    terminos: "Debes aceptar el tratamiento de datos."
  };

  const validarCampo = (control) => {
    const campo = control.closest(".campo");
    const error = campo ? campo.querySelector(".campo-error") : null;
    if (!error) return true;

    const valido = control.checkValidity();
    campo.classList.toggle("invalido", !valido);
    control.setAttribute("aria-invalid", String(!valido));
    error.textContent = valido ? "" : mensajes[control.name] || "Revisa este campo.";
    return valido;
  };

  formulario.querySelectorAll("input, select").forEach((control) => {
    control.addEventListener("blur", () => validarCampo(control));
    control.addEventListener("input", () => {
      if (control.closest(".campo").classList.contains("invalido")) validarCampo(control);
    });
    control.addEventListener("change", () => validarCampo(control));
  });

  formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();
    const controles = formulario.querySelectorAll("input[required], select[required]");
    let todoValido = true;
    let primerError = null;

    controles.forEach((control) => {
      if (!validarCampo(control)) {
        todoValido = false;
        if (!primerError) primerError = control;
      }
    });

    if (!todoValido) {
      primerError.focus();
      mensajeExito.hidden = true;
      return;
    }

    const datos = new FormData(formulario);
    const nombre = datos.get("nombre").trim().split(" ")[0];
    const [anio, mes, dia] = datos.get("fecha").split("-");

    mensajeExito.textContent = `¡Gracias, ${nombre}! Tu solicitud para el ${dia}/${mes}/${anio} a las ${datos.get("hora")} fue recibida. Te enviaremos la confirmación a ${datos.get("correo")}.`;
    mensajeExito.hidden = false;
    formulario.reset();
    formulario.querySelectorAll(".campo").forEach((c) => c.classList.remove("invalido"));
    mostrarAviso("Reserva enviada correctamente");
  });

  /* ---------- 6. Volver arriba y año actual ---------- */
  botonArriba.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  document.getElementById("anio").textContent = new Date().getFullYear();
});
