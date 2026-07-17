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
