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


document
.getElementById("contactForm")
.addEventListener("submit",function(e){

e.preventDefault();


fetch("https://script.google.com/macros/s/AKfycbxHa7wTUVSg85jJfo60jakZUqa2zYhY7H7xhWMVR-uSl7owOLyMIYErNwCAOreN9OE/exec",{

method:"POST",

body:JSON.stringify({

nombre:
document.getElementById("nombre").value,

correo:
document.getElementById("correo").value,

empresa:
document.getElementById("empresa").value,

telefono:
document.getElementById("telefono").value,

servicio:
document.getElementById("servicio").value,

mensaje:
document.getElementById("mensaje").value

})

})


.then(res=>res.json())


.then(()=>{

alert(
"Solicitud enviada correctamente. Gracias por contactar a CompuDesk."
);


document
.getElementById("contactForm")
.reset();


})


.catch(()=>{

alert(
"Error al enviar la solicitud. Intenta nuevamente."
);

});


});
