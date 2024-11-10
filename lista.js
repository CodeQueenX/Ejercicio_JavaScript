// Clase Tarea que define cada tarea con un ID, descripción, fecha de vencimiento y estado de completada
class Tarea {
    constructor(id, descripcion, fechaVencimiento) {
        this.id = id;
        this.descripcion = descripcion;
        this.fechaVencimiento = new Date(fechaVencimiento);
        this.completada = false;
    }
}

// Lista inicial de tareas
let listaDeTareas = [
    new Tarea(1, "Malinche y Titanic", "2024-11-16"),
    new Tarea(2, "Madama Butterfly", "2024-11-22"),
    new Tarea(3, "El raro de los 90", "2024-11-23"),
];

// Función para mostrar las tareas en la lista (puede filtrar por estado)
function mostrarTareas(filtro = null) {
    const listaDeTareasElement = document.getElementById("tareas-lista");
    listaDeTareasElement.innerHTML = ''; // Limpiar la lista antes de mostrar

    for (let tarea of listaDeTareas) {
        // Aplica el filtro de tareas completadas o pendientes si se especifica
        if (filtro === "completadas" && !tarea.completada) continue;
        if (filtro === "pendientes" && tarea.completada) continue;

        // Crear un elemento <li> para cada tarea y asignar color según fecha
        const tareaElement = document.createElement("li");
        tareaElement.className = obtenerClaseColor(tarea.fechaVencimiento);

        // Convertir fecha a formato "día/mes/año"
        const fechaFormateada = tarea.fechaVencimiento.toLocaleDateString("es-ES");

        // Contenido del elemento de la tarea con botones de acción
        tareaElement.innerHTML =
            `Tarea ${tarea.id}: ${tarea.descripcion} (Vence: ${fechaFormateada}) 
            <button onclick="marcarTareaComoCompletada(${tarea.id})">Marcar como completada</button>
            <button onclick="confirmarEliminacion(${tarea.id})">Eliminar</button>`;

        // Estilo de texto tachado para tareas completadas
        if (tarea.completada) {
            tareaElement.style.textDecoration = "line-through";
        }

        listaDeTareasElement.appendChild(tareaElement);
    }
}

// Función para determinar el color de fondo de la tarea según la fecha de vencimiento
function obtenerClaseColor(fechaVencimiento) {
    const hoy = new Date();
    const diferenciaDias = Math.ceil((fechaVencimiento - hoy) / (1000 * 60 * 60 * 24));

    // Asignar clase según el número de días hasta la fecha de vencimiento
    if (diferenciaDias > 7) return 'vencimiento-verde';            // Más de 7 días
    else if (diferenciaDias <= 7 && diferenciaDias > 3) return 'vencimiento-amarillo';   // 7 días o menos
    else if (diferenciaDias <= 3 && diferenciaDias > 0) return 'vencimiento-naranja';   // 3 días o menos
    else return 'vencimiento-rojo';                                // Vencido o mismo día
}

// Función para agregar una tarea a la lista
function agregarTarea() {
    const descripcion = document.getElementById('descripcion-tarea').value.trim();
    const fechaVencimiento = document.getElementById('fecha-tarea').value;

    // Validación de entrada: descripción no vacía y fecha seleccionada
    if (descripcion === "") {
        alert("La descripción de la tarea no puede estar vacía.");
        return;
    }
    if (!fechaVencimiento) {
        alert("Debes seleccionar una fecha de vencimiento.");
        return;
    }

    // Crear y agregar una nueva tarea a la lista con un ID único
    const nuevaTarea = new Tarea(listaDeTareas.length + 1, descripcion, fechaVencimiento);
    listaDeTareas.push(nuevaTarea);
    mostrarTareas(); // Actualizar la lista visible

    // Limpiar campos de entrada
    document.getElementById('descripcion-tarea').value = "";
    document.getElementById('fecha-tarea').value = "";
}

// Marcar una tarea como completada por su ID
function marcarTareaComoCompletada(id) {
    const tarea = listaDeTareas.find((t) => t.id === id);
    if (tarea) {
        tarea.completada = true;
    }
    mostrarTareas(); // Actualizar la lista visible
}

// Confirmar eliminación de tarea para evitar borrado accidental
function confirmarEliminacion(id) {
    if (confirm("¿Estás seguro de que deseas eliminar esta tarea?")) {
        eliminarTarea(id);
    }
}

// Eliminar una tarea de la lista por su ID
function eliminarTarea(id) {
    // Encontrar la tarea y eliminarla por su ID
    const index = listaDeTareas.findIndex((t) => t.id === id);
    if (index !== -1) {
        listaDeTareas.splice(index, 1);
    }
    mostrarTareas(); // Actualizar la lista visible
}

// Función para mostrar tareas completadas
function mostrarTareasCompletadas() {
    mostrarTareas("completadas");
}

// Función para mostrar tareas pendientes
function mostrarTareasPendientes() {
    mostrarTareas("pendientes");
}
