let usuario = document.getElementById("usuario")
usuario.focus();

function validarLogin() {
    let usuario = document.getElementById("usuario");
    let contraseña = document.getElementById("contrasena");

    if(usuario.value === null || usuario.value === '') {
        alert("Por favor, ingrese su nombre de usuario, este campo es obligatorio.");
        // Focus al campo (Usuario)
        usuario.focus();
        return false;
    }
    else if(contraseña.value === null || contraseña.value === '') {
        alert("Por favor, ingrese su contraseña, este campo es obligatorio.");
        // Focus al campo (Contraseña)
        contraseña.focus();
        return false;
    }
    else {
        return true;
    }
};

function JWT() {
    let btnIniciar = document.getElementById("btnIniciarSesion");

    btnIniciar.addEventListener("click", function () {
              
        if(validarLogin()) {     
            // Usuario y Password obtenidos de los input.
            let user = document.getElementById("usuario").value;
            let pass = document.getElementById("contrasena").value;
            let dominio = 'sip100.citoapp.cl';
           if(PostData("https://Api1.citoapp.cl/api/autenticacion/conserjeria", user , pass, dominio) != false) {
               return true;
            }
        }
    });

}
JWT();


async function PostData(url, user, pass, dominio) {
    // OBTENCIÓN TOKEN DEL HEADERS.
    console.log("USER",user,"PASS",pass)
    let response = await fetch(url, {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify( {
        domain: dominio,
        user: user,
        pass: pass
      })
    }).then(function(response) {
        return response.json();
    }).then(function(data) {
        let token = data.token;
        console.log("Token: " + token);
        if(!token === undefined || !token === false) {
            // localStorage.setItem('token',token);
            sessionStorage.setItem('token',data.token);
            //alert("¡Todo OK, Bienvenido(a) a CITOApp!");
            window.open('index.html', '_self');
        } 
        else{
            alert("No se ha encontrado un usuario con estas credenciales. vuelva a intentarlo nuevamente.");
            let usuario = document.getElementById("usuario");
            let contrasena = document.getElementById("contrasena");
            // Limpiar los campos automaticamente
            usuario.value = '';
            contrasena.value = '';
            // Focus al primer campo (Usuario)
            usuario.focus();
        }
    })
    
  };


  function mostrarPassword(){
    let cambio = document.getElementById("contrasena");      
    if(cambio.type == "password"){
        cambio.type = "text";
        $('.icon').removeClass('fa fa-eye-slash').addClass('fa fa-eye');
    }else{
        cambio.type = "password";
        $('.icon').removeClass('fa fa-eye').addClass('fa fa-eye-slash');
    }
}