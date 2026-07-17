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
