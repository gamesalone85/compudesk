/*=============================
COMPUDESK LEGAL
=============================*/

// Barra de progreso

const readingBar = document.getElementById("readingBar");

window.addEventListener("scroll",()=>{

const total=document.documentElement.scrollHeight-window.innerHeight;

const progress=(window.scrollY/total)*100;

readingBar.style.width=progress+"%";

});

// Volver arriba

const topBtn=document.getElementById("backTop");

topBtn.addEventListener("click",()=>{

window.scrollTo({

top:0,

behavior:"smooth"

});

});

// Imprimir

document.getElementById("printDocument").addEventListener("click",()=>{

window.print();

});

// Mostrar botón

window.addEventListener("scroll",()=>{

topBtn.style.display=window.scrollY>500?"block":"none";

});
