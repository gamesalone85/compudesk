//==============================
// MENÚ RESPONSIVE
//==============================

const menu = document.getElementById("navMenu");

const toggle = document.getElementById("menuToggle");

toggle.addEventListener("click",()=>{

menu.classList.toggle("active");

});

//==============================
// HEADER SCROLL
//==============================

const header=document.getElementById("header");

window.addEventListener("scroll",()=>{

if(window.scrollY>60){

header.classList.add("header-scrolled");

}else{

header.classList.remove("header-scrolled");

}

});
/*=========================================
CONTADORES
=========================================*/

const counters = document.querySelectorAll(".counter");

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

            } else {

                counter.textContent = target + "+";

            }

        };

        update();

        observer.unobserve(counter);

    });

});

counters.forEach(counter => observer.observe(counter));


/*=========================================
FORMULARIO GOOGLE
=========================================*/
const form = document.getElementById("contactForm");

const status = document.getElementById("formStatus");


if(form){

form.addEventListener("submit", function(e){

e.preventDefault();


const boton = form.querySelector("button");


boton.innerHTML = "Enviando...";
boton.disabled = true;


const datos = {

nombre:
form.querySelector('[name="nombre"]').value,


correo:
form.querySelector('[name="correo"]').value,


empresa:
form.querySelector('[name="empresa"]').value,


telefono:
form.querySelector('[name="telefono"]').value,


servicio:
form.querySelector('[name="servicio"]').value,


mensaje:
form.querySelector('[name="mensaje"]').value

};



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

// =================================
// Sistema de Cookies CompuDesk
// =================================


document.addEventListener("DOMContentLoaded", function(){


const cookieBanner = document.getElementById("cookieBanner");

const acceptCookies = document.getElementById("acceptCookies");

const rejectCookies = document.getElementById("rejectCookies");



if(!cookieBanner){
    return;
}



// Revisar consentimiento guardado

const consent = localStorage.getItem("compudeskCookieConsent");



if(consent === null){

    cookieBanner.style.display = "block";

}
else{

    cookieBanner.style.display = "none";

}



// ================================
// ACEPTAR COOKIES
// ================================


if(acceptCookies){


acceptCookies.addEventListener("click",function(){


localStorage.setItem(
"compudeskCookieConsent",
"accepted"
);



cookieBanner.style.display="none";



// Aquí posteriormente cargaremos:
// Google Analytics
// Google Tag Manager
// Pixel


console.log(
"Cookies aceptadas"
);



});


}




// ================================
// RECHAZAR COOKIES
// ================================


if(rejectCookies){


rejectCookies.addEventListener("click",function(){


localStorage.setItem(
"compudeskCookieConsent",
"rejected"
);



cookieBanner.style.display="none";



console.log(
"Cookies rechazadas"
);



});


}



});
