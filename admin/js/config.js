// ==========================================
// COMPU DESK
// CONFIGURACIÓN GLOBAL
// Producción v1.0
// ==========================================

/**
 * URL base del sitio.
 * Funciona en:
 * - GitHub Pages
 * - Dominio propio
 * - Cloudflare
 * - localhost
 */
export const BASE_URL = window.location.origin;

/**
 * Configuración general de la aplicación.
 */
export const APP = Object.freeze({

    NAME: "Compu Desk",

    VERSION: "1.0.0",

    ENVIRONMENT: "production"

});

/**
 * Rutas del portal administrativo.
 */
export const ROUTES = Object.freeze({

    LOGIN: `${BASE_URL}/admin/login.html`,

    DASHBOARD: `${BASE_URL}/admin/index.html`,

    CLIENTES: `${BASE_URL}/admin/clientes/index.html`,

    USUARIOS: `${BASE_URL}/admin/usuarios/index.html`,

    TICKETS: `${BASE_URL}/admin/tickets/index.html`

});

/**
 * Componentes reutilizables.
 */
export const COMPONENTS = Object.freeze({

    HEADER: `${BASE_URL}/admin/components/header.html`,

    SIDEBAR: `${BASE_URL}/admin/components/sidebar.html`

});

/**
 * Colecciones Firestore.
 */
export const COLLECTIONS = Object.freeze({

    ADMINS: "admins",

    CLIENTES: "clientes",

    USUARIOS: "usuarios",

    TICKETS: "tickets"

});

/**
 * Roles oficiales.
 */
export const ROLES = Object.freeze({

    SUPERADMIN: "superadmin",

    ADMIN: "admin",

    SUPERVISOR: "supervisor",

    TECNICO: "tecnico"

});

/**
 * Estados de usuario.
 */
export const USER_STATUS = Object.freeze({

    ACTIVE: true,

    INACTIVE: false

});

/**
 * Estados oficiales de tickets.
 */
export const TICKET_STATUS = Object.freeze({

    NUEVO: "Nuevo",

    ASIGNADO: "Asignado",

    EN_PROCESO: "En proceso",

    PENDIENTE_CLIENTE: "Pendiente de cliente",

    RESUELTO: "Resuelto",

    CERRADO: "Cerrado",

    CANCELADO: "Cancelado"

});

/**
 * Prioridades oficiales.
 */
export const PRIORITY = Object.freeze({

    CRITICA: "Crítica",

    ALTA: "Alta",

    MEDIA: "Media",

    BAJA: "Baja"

});
