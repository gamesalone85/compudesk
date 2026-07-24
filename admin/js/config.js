// ==========================================
// COMPU DESK
// CONFIGURACIÓN GLOBAL
// Producción
// ==========================================

const BASE_URL = window.location.origin;

export const APP = {

    nombre: "Compu Desk",

    version: "1.0.0",

    entorno: "production"

};

export const PATHS = {

    base: BASE_URL,

    admin: `${BASE_URL}/admin`,

    components: `${BASE_URL}/admin/components`

};

export const ROUTES = {

    login: `${PATHS.admin}/login.html`,

    dashboard: `${PATHS.admin}/index.html`,

    clientes: `${PATHS.admin}/clientes/index.html`,

    usuarios: `${PATHS.admin}/usuarios/index.html`,

    tickets: `${PATHS.admin}/tickets/index.html`

};

export const COLLECTIONS = {

    admins: "admins",

    clientes: "clientes",

    usuarios: "usuarios",

    tickets: "tickets"

};

export const ROLES = {

    SUPERADMIN: "superadmin",

    ADMIN: "admin",

    SUPERVISOR: "supervisor",

    TECNICO: "tecnico"

};

export const STATUS = {

    ACTIVO: true,

    INACTIVO: false

};
    INACTIVO: false

};
