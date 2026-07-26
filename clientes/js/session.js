// ==========================================
// COMPU DESK
// SESSION MANAGER
// Portal Clientes
// Producción 1.0
// ==========================================

const SESSION_KEY = "clienteCompudesk";


// ==========================================
// GUARDAR SESIÓN
// ==========================================

export function guardarSesion(datos){

    if(!datos) return;

    localStorage.setItem(
        SESSION_KEY,
        JSON.stringify(datos)
    );

}



// ==========================================
// OBTENER SESIÓN
// ==========================================

export function obtenerSesion(){

    const sesion =
        localStorage.getItem(SESSION_KEY);

    if(!sesion){
        return null;
    }

    try{

        return JSON.parse(sesion);

    }

    catch(error){

        console.error(
            "Sesión corrupta",
            error
        );

        localStorage.removeItem(SESSION_KEY);

        return null;

    }

}



// ==========================================
// EXISTE SESIÓN
// ==========================================

export function existeSesion(){

    return obtenerSesion() !== null;

}



// ==========================================
// ELIMINAR SESIÓN
// ==========================================

export function cerrarSesionLocal(){

    localStorage.removeItem(
        SESSION_KEY
    );

}



// ==========================================
// ACTUALIZAR SESIÓN
// ==========================================

export function actualizarSesion(nuevosDatos){

    const actual = obtenerSesion();

    if(!actual){
        return;
    }

    guardarSesion({

        ...actual,

        ...nuevosDatos

    });

}
