// ==========================================
// COMPU DESK
// UTILIDADES
// ==========================================

import { ROUTES } from "./config.js";

export function redirect(url) {

    window.location.replace(url);

}

export function formatDate(fecha) {

    if (!fecha) return "-";

    return new Intl.DateTimeFormat("es-MX", {

        dateStyle: "medium",

        timeStyle: "short"

    }).format(fecha);

}

export function escapeHTML(texto = "") {

    const div = document.createElement("div");

    div.textContent = texto;

    return div.innerHTML;

}

export function logoutRedirect() {

    redirect(ROUTES.login);

}
