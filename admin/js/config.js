// ==========================================
// COMPU DESK
// CONFIGURACIÓN GENERAL
// Producción v1.0
// ==========================================

export const APP = {

    nombre: "Compu Desk",

    version: "1.0.0",

    entorno: "production"

};

// ==========================================
// RUTAS
// ==========================================

export const ROUTES = {

    login: "/admin/login.html",

    dashboard: "/admin/index.html",

    clientes: "/admin/clientes/index.html",

    usuarios: "/admin/usuarios/index.html",

    tickets: "/admin/tickets/index.html"

};

// ==========================================
// COLECCIONES FIRESTORE
// ==========================================

export const COLLECTIONS = {

    admins: "admins",

    clientes: "clientes",

    usuarios: "usuarios",

    tickets: "tickets"

};

// ==========================================
// ROLES
// ==========================================

export const ROLES = {

    SUPERADMIN: "superadmin",

    ADMIN: "admin",

    SUPERVISOR: "supervisor",

    TECNICO: "tecnico"

};

// ==========================================
// ESTADOS
// ==========================================

export const STATUS = {

    ACTIVO: true,

    INACTIVO: false

};
