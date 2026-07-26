// ==========================================
// COMPU DESK
// CLIENTE AUTH GUARD
// Producción 2.0
// Firebase Auth + Firestore UID
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

collection,
query,
where,
getDocs

}

from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";





// ==========================================
// VALIDAR SESIÓN
// ==========================================


onAuthStateChanged(

auth,

async(user)=>{


// ==========================================
// SIN AUTH
// ==========================================


if(!user){


localStorage.removeItem(
"clienteCompudesk"
);


window.location.replace(
"login.html"
);


return;


}





try{



// ==========================================
// BUSCAR PERFIL POR UID
// usuarios.uid
// ==========================================


const usuariosQuery = query(

collection(
db,
"usuarios"
),

where(
"uid",
"==",
user.uid
)

);



const resultado =

await getDocs(
usuariosQuery
);





if(
resultado.empty
){


console.error(
"No existe perfil Firestore para:",
user.uid
);



await signOut(auth);



localStorage.removeItem(
"clienteCompudesk"
);



window.location.replace(
"login.html"
);



return;


}





const usuario =

resultado.docs[0].data();






// ==========================================
// VALIDAR ROL
// ==========================================


if(
usuario.rol !== "cliente"
){


await signOut(auth);


localStorage.removeItem(
"clienteCompudesk"
);



window.location.replace(
"login.html"
);



return;


}





// ==========================================
// VALIDAR ESTADO
// ==========================================


if(
usuario.estado !== "activo"
){


await signOut(auth);


localStorage.removeItem(
"clienteCompudesk"
);



window.location.replace(
"login.html"
);



return;


}






// ==========================================
// ACTUALIZAR SESIÓN LOCAL
// ==========================================


localStorage.setItem(

"clienteCompudesk",

JSON.stringify({

uid:user.uid,

...usuario

})

);






console.log(
"Cliente autorizado:",
usuario.nombre
);





}

catch(error){


console.error(
"Error auth guard cliente:",
error
);



await signOut(auth);



localStorage.removeItem(
"clienteCompudesk"
);



window.location.replace(
"login.html"
);



}



});
