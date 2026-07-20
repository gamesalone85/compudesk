//==============================
// MENÚ RESPONSIVE
//==============================

const menu = document.getElementById("navMenu");

const toggle = document.getElementById("menuToggle");


if(toggle && menu){

toggle.addEventListener("click",()=>{

menu.classList.toggle("active");

});

}


//==============================
// HEADER SCROLL
//==============================

const header=document.getElementById("header");


if(header){

window.addEventListener("scroll",()=>{

if(window.scrollY>60){

header.classList.add("header-scrolled");

}else{

header.classList.remove("header-scrolled");

}

});

}


/*=========================================
CONTADORES
=========================================*/


const counters = document.querySelectorAll(".counter");


if(counters.length){


const observer = new IntersectionObserver(entries => {


entries.forEach(entry => {


if (!entry.isIntersecting) return;


const counter = entry.target;


const target = counter.dataset.target;


if (!target) return;


let current = 0;


const increment = target / 120;


const update = () => {


current += increment;


if (current < target) {


counter.textContent = Math.floor(current);


requestAnimationFrame(update);


}else{


counter.textContent = target + "+";


}


};


update();


observer.unobserve(counter);


});


});


counters.forEach(counter => observer.observe(counter));


}



/*=========================================
FORMULARIO GOOGLE + SEGURIDAD
=========================================*/


const form = document.getElementById("contactForm");

const status = document.getElementById("formStatus");

const aceptoPrivacidad = document.getElementById("aceptoPrivacidad");


// Tiempo de inicio del formulario

const inicioFormulario = Date.now();



if(form){


form.addEventListener("submit", function(e){


e.preventDefault();

// ===============================
// VALIDACIÓN LEGAL
// ===============================


if(aceptoPrivacidad && !aceptoPrivacidad.checked){


status.style.display="block";


status.innerHTML =
"⚠️ Debes aceptar el Aviso de Privacidad y los Términos y Condiciones.";


return;


}


// Guardar consentimiento legal


localStorage.setItem(
"compudeskPrivacidadAceptada",
"true"
);


localStorage.setItem(
"compudeskPrivacidadFecha",
new Date().toISOString()
);



// ===============================
// PROTECCIÓN ANTI SPAM
// ===============================



// 1. Honeypot

const honeypotField = form.querySelector('[name="website"]');


if(honeypotField && honeypotField.value !== ""){


console.log("Spam detectado");


return;


}



// 2. Tiempo mínimo de llenado


const tiempo = Date.now() - inicioFormulario;


if(tiempo < 5000){


status.style.display="block";


status.innerHTML =
"⚠️ Por favor espera unos segundos antes de enviar.";


return;


}



// ===============================
// OBTENER DATOS LIMPIOS
// ===============================


const nombre = 
form.querySelector('[name="nombre"]').value.trim();



const correo = 
form.querySelector('[name="correo"]').value.trim();



const empresa = 
form.querySelector('[name="empresa"]').value.trim();



const telefono = 
form.querySelector('[name="telefono"]').value.trim();



const servicio = 
form.querySelector('[name="servicio"]').value;



const mensaje = 
form.querySelector('[name="mensaje"]').value.trim();




// ===============================
// VALIDACIONES
// ===============================



const nombreValido =
/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;


if(nombre.length < 5 || !nombreValido.test(nombre)){


status.style.display="block";


status.innerHTML =
"⚠️ Ingresa un nombre válido.";


return;


}



if(mensaje.length < 10){


status.style.display="block";


status.innerHTML =
"⚠️ Describe un poco más tu solicitud.";


return;


}



const correoValido =
/^[^\s@]+@[^\s@]+\.[^\s@]+$/;



if(!correoValido.test(correo)){


status.style.display="block";


status.innerHTML =
"⚠️ Ingresa un correo válido.";


return;


}



// Bloqueo de correos falsos conocidos

const dominiosBloqueados = [

"correo.com",
"example.com",
"test.com",
"fake.com"

];



const dominioCorreo =
correo.split("@")[1].toLowerCase();



if(dominiosBloqueados.includes(dominioCorreo)){


status.style.display="block";


status.innerHTML =
"⚠️ Utiliza un correo válido de contacto.";


return;


}




// Validación teléfono

if(telefono !== ""){


const telefonoValido =
/^[0-9\s\-\+\(\)]{8,15}$/;



if(!telefonoValido.test(telefono)){


status.style.display="block";


status.innerHTML =
"⚠️ Ingresa un teléfono válido.";


return;


}


}

// ===============================
// BLOQUEAR BOTÓN
// ===============================


const boton = form.querySelector("button");


boton.innerHTML = "Enviando...";


boton.disabled = true;




// ===============================
// OBJETO A GOOGLE SHEETS
// ===============================


const datos = {


nombre:nombre,

correo:correo,

empresa:empresa,

telefono:telefono,

servicio:servicio,

mensaje:mensaje,


privacidad:"Aceptado",

fechaPrivacidad:
new Date().toLocaleString("es-MX")

};


// ===============================
// ENVÍO GOOGLE APPS SCRIPT
// ===============================



fetch(

"https://script.google.com/macros/s/AKfycbwQaX8zGnPb8jPpzSj1dEn4kgoNkc20PYSKa8nRLl6rG0FAikuMVtQCl6tSZrBj-qjb/exec",

{


method:"POST",


mode:"no-cors",


headers:{


"Content-Type":"application/json"


},


body:JSON.stringify(datos)


}


)



.then(()=>{


status.style.display="block";


status.innerHTML=

"✅ Solicitud enviada correctamente. Un especialista de CompuDesk se pondrá en contacto contigo.";



form.reset();


boton.innerHTML="Enviar Solicitud";


boton.disabled=false;



})



.catch(()=>{


status.style.display="block";


status.innerHTML=

"❌ No se pudo enviar la solicitud. Intenta nuevamente.";



boton.innerHTML="Enviar Solicitud";


boton.disabled=false;



});



});


}






// ==========================================
// Sistema de Cookies CompuDesk
// ==========================================


document.addEventListener("DOMContentLoaded", function(){


const cookieBanner = document.getElementById("cookieBanner");


const acceptCookies = document.getElementById("acceptCookies");


const rejectCookies = document.getElementById("rejectCookies");



if(!cookieBanner){

return;

}



const consent = localStorage.getItem(
"compudeskCookieConsent"
);



if(consent === null){


cookieBanner.style.display="block";


}else{


cookieBanner.style.display="none";



if(consent==="accepted"){


loadAnalytics();


}


}





if(acceptCookies){


acceptCookies.addEventListener("click",function(){



localStorage.setItem(
"compudeskCookieConsent",
"accepted"
);



cookieBanner.style.display="none";



loadAnalytics();



});


}





if(rejectCookies){


rejectCookies.addEventListener("click",function(){



localStorage.setItem(
"compudeskCookieConsent",
"rejected"
);



cookieBanner.style.display="none";



});


}



});


// ==========================================
// Consentimiento Aviso Privacidad
// ==========================================


document.addEventListener(
"DOMContentLoaded",
()=>{


const acepto =
localStorage.getItem(
"compudeskPrivacidadAceptada"
);



const check =
document.getElementById(
"aceptoPrivacidad"
);



if(
acepto==="true" &&
check
){

check.checked=true;

}



});



// ==========================================
// Google Analytics preparado
// ==========================================


function loadAnalytics(){



const analyticsLoaded =
document.getElementById(
"googleAnalytics"
);



if(analyticsLoaded){

return;

}



console.log(
"Google Analytics autorizado"
);



/*

Aquí irá Google Analytics cuando esté configurado.


*/


}
