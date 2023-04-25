
(function ($) {
    "use strict";

    
    /*==================================================================
    [ Validate ]*/
    var input = $('.validate-input .input100');
    const btnLogin = document.getElementById('btnLogin');

    btnLogin.addEventListener('click',()=>{
        var check = true;

        for(var i=0; i<input.length; i++) {
            if(validate(input[i]) == false){
                showValidate(input[i]);
                check=false;
            }
        }
        if(check){
            let user = document.getElementById("usuario").value;
            let pass = document.getElementById("contrasena").value;
            let dominio = '';
            if(PostData("https://Api1.citoapp.cl/api/autenticacion/conserjeria", user , pass, dominio) != false) {
               return true;
            }
        }
    })

    /* $('.validate-form').on('submit',function(){
        
    }); */


    function pruebaWea(check){
        console.log("Paso algo",check)
    }

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
		    sessionStorage.setItem('wp',data.externalUserId);
                sessionStorage.setItem('domain',data.domain);
                sessionStorage.setItem('port',data.port);
                sessionStorage.setItem('user',data.user);
                sessionStorage.setItem('pass',data.pass);
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

        console.log(response);

        
      };


    $('.validate-form .input100').each(function(){
        $(this).focus(function(){
           hideValidate(this);
        });
    });

    function validate (input) {
        if($(input).attr('type') == 'email' || $(input).attr('name') == 'email') {
            if($(input).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
                return false;
            }
        }
        else {
            if($(input).val().trim() == ''){
                return false;
            }
        }
    }

    function showValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).addClass('alert-validate');
    }

    function hideValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).removeClass('alert-validate');
    }
    
    

})(jQuery);