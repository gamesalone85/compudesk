// ==========================================
// COMPU DESK
// SESSION MANAGER
// Producción v1.0
// ==========================================

let currentAdmin = null;

/**
 * Guarda la información del administrador autenticado.
 * @param {Object} adminData
 */
export function setAdmin(adminData) {

    if (!adminData || typeof adminData !== "object") {
        throw new Error("Datos de administrador inválidos.");
    }

    currentAdmin = Object.freeze({
        ...adminData
    });

}

/**
 * Obtiene la información del administrador.
 * @returns {Object|null}
 */
export function getAdmin() {

    return currentAdmin;

}

/**
 * Indica si existe una sesión cargada.
 * @returns {boolean}
 */
export function hasAdmin() {

    return currentAdmin !== null;

}

/**
 * Obtiene una propiedad del administrador.
 * @param {string} property
 * @returns {*}
 */
export function getAdminProperty(property) {

    if (!currentAdmin) {
        return null;
    }

    return currentAdmin[property] ?? null;

}

/**
 * Elimina la información de la sesión.
 */
export function clearAdmin() {

    currentAdmin = null;

}
