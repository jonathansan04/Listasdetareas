// Clase que representa un nodo en la lista
class Nodo {
    constructor(tarea) {
        this.tarea = tarea; 
        this.nodo = null;   
    }
}

// Clase que representa la lista de tareas
class ListaL {
    constructor() {
        this.head = null;  
        this.tail = null;  
    }

    
    agregarTarea(tarea) {
        const nuevoNodo = new Nodo(tarea); 
        if (this.head === null) {
            
            this.head = nuevoNodo;
            this.tail = nuevoNodo;
        } else {
            
            this.tail.nodo = nuevoNodo; 
            this.tail = nuevoNodo;
        }
    }

    mostrarTarea() {
        const tareas = [];
        let current = this.head; 
        while (current !== null) {
            tareas.push(current.tarea);
            current = current.nodo;    
        }
        return tareas; 
    }


    eliminarTarea(tarea) {
        if (!this.head) return; 
        
        
        if (this.head.tarea === tarea) {
            this.head = this.head.nodo; 
            if (!this.head) this.tail = null; 
            return;
        }

        let current = this.head;
        while (current.nodo !== null) {
            if (current.nodo.tarea === tarea) {
                current.nodo = current.nodo.nodo; 
                if (current.nodo === null) this.tail = current; 
                return;
            }
            current = current.nodo; 
        }
    }
}

// Crear una nueva lista de tareas
const listaTareas = new ListaL();
const formulario = document.getElementById('formulario-producto');
const nombreInput = document.getElementById('nombre-producto');
const tabla = document.getElementById('cuerpo-tabla');

// Manejar el envío del formulario
formulario.addEventListener('submit', function(event) {
    event.preventDefault(); 
    const tarea = nombreInput.value.trim(); 
    if (tarea) {
        listaTareas.agregarTarea(tarea); 
        nombreInput.value = ''; 
        mostrarT(); 
    }
});

// Función para mostrar las tareas en la tabla
function mostrarT() {
    tabla.innerHTML = ''; 
    const tareas = listaTareas.mostrarTarea(); 

    tareas.forEach((tarea, index) => {
        const fila = document.createElement('tr'); 

        
        const celdaIndice = document.createElement('td');
        celdaIndice.textContent = index + 1; 
        fila.appendChild(celdaIndice); 

        
        const celdaNombre = document.createElement('td');
        celdaNombre.textContent = tarea; 
        fila.appendChild(celdaNombre); 

        
        const celdaAccion = document.createElement('td');
        const botonEliminar = document.createElement('button');
        botonEliminar.textContent = 'Eliminar';
        botonEliminar.className = "boton-eliminar"; 
        botonEliminar.addEventListener('click', function() {
            
            listaTareas.eliminarTarea(tarea);
            mostrarT(); 
        });
        celdaAccion.appendChild(botonEliminar); 
        fila.appendChild(celdaAccion); 

        tabla.appendChild(fila); 
    });
}
