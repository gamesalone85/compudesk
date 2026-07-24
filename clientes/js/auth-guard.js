// ==========================================
// COMPU DESK
// CLIENTE AUTH GUARD
// Producción v1.0
// ==========================================


import {

auth,
db

}

from "../../assets/firebase/firebase-config.js";


import {

onAuthStateChanged,
signOut

}

from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";


import {

doc,
getDoc

}

from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";





onAuthStateChanged(

auth,

async(user)=>{


if(!user){


window.location.href =
"login.html";


return;


}




const usuarioRef =

doc(

db,

"usuarios",

user.uid

);



const usuarioSnap =

await getDoc(
usuarioRef
);





if(!usuarioSnap.exists()){


await signOut(auth);


window.location.href =
"login.html";


return;


}





const usuario =

usuarioSnap.data();





if(usuario.estado !== "activo"){


await signOut(auth);


window.location.href =
"login.html";


return;


}







localStorage.setItem(

"clienteCompudesk",

JSON.stringify({

uid:user.uid,

...usuario

})

);





});
