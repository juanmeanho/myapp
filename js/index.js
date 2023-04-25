/** Seccion Global **/
const url = appConfig.URL;
const token = appConfig.token;
const btnPrincipal = document.getElementById('btnPrincipal');
const btnMensajes = document.getElementById('btnMensajes');
const btnLogOut = document.getElementById('logOut');
const btnPerfil = document.getElementById('profile');
const residencias = []

document.getElementById('btnPrincipal').addEventListener('click',()=>{

    $('#btnPrincipal').css('color','#fff');
    $('#btnPrincipal').css('background-color','#0d6efd');

    $('#btnLlamadas').css('color','#0d6efd');
    $('#btnLlamadas').css('background-color','transparent');;

    $('#btnMensajes').css('color','#0d6efd');
    $('#btnMensajes').css('background-color','transparent');

    $('#btnVisitas').css('color','#0d6efd');
    $('#btnVisitas').css('background-color','transparent');

    $('#btnInvitados').css('color','#0d6efd');
    $('#btnInvitados').css('background-color','transparent');

    $('.principalVista').css('display','block');
    $('.llamadasVista').css('display','none');
    $('.mensajesVista').css('display','none');
    $('.buzonVista').css('display','none');
    $('.visitasVista').css('display','none');
    $('.invitadosVista').css('display','none');
    $('.perfilVista').css('display','none');
    $('.white_card_Visitas').css('background-color','transparent')
    $('.white_card_Visitas .white_card_body').addClass('white_card_Invitados').removeClass('white_card_body');
})
document.getElementById('btnLlamadas').addEventListener('click',()=>{

    $('#btnLlamadas').css('color','#fff');
    $('#btnLlamadas').css('background-color','#0d6efd');

    $('#btnPrincipal').css('color','#0d6efd');
    $('#btnPrincipal').css('background-color','transparent');

    $('#btnMensajes').css('color','#0d6efd');
    $('#btnMensajes').css('background-color','transparent');

    $('#btnVisitas').css('color','#0d6efd');
    $('#btnVisitas').css('background-color','transparent');
    cargarLlamadas();
    $('#btnInvitados').css('color','#0d6efd');
    $('#btnInvitados').css('background-color','transparent');

    $('.principalVista').css('display','none');
    $('.llamadasVista').css('display','block');
    $('.mensajesVista').css('display','none');
    $('.buzonVista').css('display','none');
    $('.visitasVista').css('display','none');
    $('.invitadosVista').css('display','none');
    $('.perfilVista').css('display','none');
    $('.white_card_Visitas').css('background-color','#FFFFFF')
    $('.white_card_Visitas .white_card_Invitados').addClass('white_card_body').removeClass('white_card_Invitados');
})
document.getElementById('btnVisitas').addEventListener('click',()=>{

    $('#btnVisitas').css('color','#fff');
    $('#btnVisitas').css('background-color','#0d6efd');

    $('#btnPrincipal').css('color','#0d6efd');
    $('#btnPrincipal').css('background-color','transparent');

    $('#btnMensajes').css('color','#0d6efd');
    $('#btnMensajes').css('background-color','transparent');

    $('#btnLlamadas').css('color','#0d6efd');
    $('#btnLlamadas').css('background-color','transparent');

    $('#btnInvitados').css('color','#0d6efd');
    $('#btnInvitados').css('background-color','transparent');

    cargarVisitas()
    $('.principalVista').css('display','none');
    $('.llamadasVista').css('display','none');
    $('.mensajesVista').css('display','none');
    $('.buzonVista').css('display','none');
    $('.visitasVista').css('display','block');
    $('.invitadosVista').css('display','none');
    $('.perfilVista').css('display','none');
    $('.white_card_Visitas').css('background-color','#FFFFFF')
    $('.white_card_Visitas .white_card_Invitados').addClass('white_card_body').removeClass('white_card_Invitados');
})
document.getElementById('btnInvitados').addEventListener('click',()=>{

    $('#btnInvitados').css('color','#fff');
    $('#btnInvitados').css('background-color','#0d6efd');

    $('#btnPrincipal').css('color','#0d6efd');
    $('#btnPrincipal').css('background-color','transparent');

    $('#btnMensajes').css('color','#0d6efd');
    $('#btnMensajes').css('background-color','transparent');

    $('#btnLlamadas').css('color','#0d6efd');
    $('#btnLlamadas').css('background-color','transparent');

    $('#btnVisitas').css('color','#0d6efd');
    $('#btnVisitas').css('background-color','transparent');

    listInvitaciones();
    $('.principalVista').css('display','none');
    $('.llamadasVista').css('display','none');
    $('.mensajesVista').css('display','none');
    $('.buzonVista').css('display','none');
    $('.visitasVista').css('display','none');
    $('.invitadosVista').css('display','block');
    $('.perfilVista').css('display','none');
    $('.white_card_Visitas').css('background-color','transparent')
    $('.white_card_Visitas .white_card_body').addClass('white_card_Invitados').removeClass('white_card_body');
})
btnMensajes.addEventListener('click',()=>{

    $('#btnMensajes').css('color','#fff');
    $('#btnMensajes').css('background-color','#0d6efd');

    $('#btnPrincipal').css('color','#0d6efd');
    $('#btnPrincipal').css('background-color','transparent');

    $('#btnInvitados').css('color','#0d6efd');
    $('#btnInvitados').css('background-color','transparent');

    $('#btnLlamadas').css('color','#0d6efd');
    $('#btnLlamadas').css('background-color','transparent');

    $('#btnVisitas').css('color','#0d6efd');
    $('#btnVisitas').css('background-color','transparent');

    $('.principalVista').css('display','none');
    $('.llamadasVista').css('display','none');
    $('.mensajesVista').css('display','block');
    $('.buzonVista').css('display','none');
    $('.visitasVista').css('display','none');
    $('.invitadosVista').css('display','none');
    $('.perfilVista').css('display','none');
    $('.white_card_Visitas').css('background-color','transparent')
    $('.white_card_Visitas .white_card_body').addClass('white_card_Invitados').removeClass('white_card_body');
})

btnLogOut.addEventListener('click',()=>{
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('wp');
    sessionStorage.removeItem('domain',data.domain);
    sessionStorage.removeItem('port',data.port);
    sessionStorage.removeItem('user',data.user);
    sessionStorage.removeItem('pass',data.pass);
})

btnPerfil.addEventListener('click',()=>{
    $('.principalVista').css('display','none');
    $('.llamadasVista').css('display','none');
    $('.mensajesVista').css('display','none');
    $('.buzonVista').css('display','none');
    $('.visitasVista').css('display','none');
    $('.invitadosVista').css('display','none');
    $('.perfilVista').css('display','block');
    $('.white_card_Visitas').css('background-color','#FFFFFF')
    $('.white_card_Visitas .white_card_Invitados').addClass('white_card_body').removeClass('white_card_Invitados');
})


$("#menuCall").scroll(function(){
    $('.dropdown-menu').collapse('hide');
});

$(document).on('click', '#points', function () {
    var parent_offset = $(this).parent().offset().top;
    var child_offset = $(this).children('ul').offset().top;
    var diff = child_offset - parent_offset + 7;
    $('.iconD .dropdown-menu').attr('style', 'margin-top: -'+diff+'px !important');
});

$(document).on('click', '.bell_notification_clicker', function () {
    $('.Menu_NOtification_Wrap').toggleClass('active');
});

$(document).on('click', '.single_notify', function () {

        var idAcceso = $(this).attr('data-value');

        fetch(`https://api1.citoapp.cl/api/controlAcceso/aperturaracceso/${idAcceso}`,{
            method:'GET',
            headers:{
                'Authorization':'Bearer '+ token
            },
            })
        .then((res)=>res.json())
        .then((datos)=>{

            if(datos.estado){
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: datos.mensaje,
                    showConfirmButton: false,
                    timer: 2500
                })
            }else{
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: 'Ha sucedido un error',
                    showConfirmButton: false,
                    timer: 2500
                })
            }
        })    
        
        setTimeout(function () {
            $('.bell_notification_clicker').trigger('click');
        }, 1000)


});


/** Cargar Menu Puertas **/

function cargarMenuPuertas(){

    $('.Notification_body').empty();

    fetch('https://api1.citoapp.cl/api/controlAcceso/accesos',{
        method:'POST',
        headers:{
            'Authorization':'Bearer '+ token
        },
        })
    .then((res)=>res.json())
    .then((datos)=>{

        if(datos.estado){

            datos.data.forEach((acceso)=>{
                acceso.accesos.forEach((item)=>{
                    let icon = item.descripcion.includes("vehicular") ? "vehiculo" : "door-open-purple";
                    $('.Notification_body').append(`
                    <div class="single_notify d-flex align-items-center" data-value="${item.idAcceso}">
                        <div class="notify_thumb">
                            <span class="material-icons-round">
                            <img src="img/icon/${icon}.png" alt=""></a>
                        </div>
                        <div class="notify_content">
                            <a href="#"><h5 style="font-weight:bold;color: #8950fc;">${item.descripcion}</h5></a>
                        </div>
                    </div>
                    `)
                })
            })     

        }else{

            $('.Notification_body').append(`
                    <div class="single_notify d-flex align-items-center">
                        <div class="notify_thumb">
                            <a href="#"> 
                            <span class="material-icons-round">
                            <img src="img/icon/door-open-purple.png" alt=""></a>
                        </div>
                        <div class="notify_content">
                            <a href="#"><h5 style="font-weight:bold;color: #8950fc;">Error API</h5></a>
                        </div>
                    </div>
                    `)

        }
    })
}

$(document).on('click', '.btnLlamadas', function () {
    cargarLlamadas();
})


/****************************************** Seccion Visitas *******************************************/

const nombreCompletoVisita = document.getElementById('nombreInputId');
const nResidencia = document.getElementById('numeroResidenciaId');
const rutVisita = document.getElementById('rutId');
const fechaNacimientoVisita = document.getElementById('fechaNacimientoId');
const checkVisita = document.getElementById('checkBoxLlegada');
const arriboPeaton = document.getElementById('arriboPeaton');
const arriboVehiculo = document.getElementById('arriboVehiculo');

const horaLlegadaVisita = document.getElementById('horaLlegadaId');
const fechaLlegadaVisita = document.getElementById('fechaLlegadaId');
const patenteVisita = document.getElementById('patenteId');
const estacionamientoVisita = document.getElementById('estacionamientoId');

const nacionalidadVisita = document.getElementById('nacionalidadId');
const sexoVisita = document.getElementById('sexoId');
const observacionesVisita = document.getElementById('observaId');

const btnGuardarVisita = document.getElementById('btnGuardar');

const btnSalidaSi = document.getElementById('btnSalidaSi');
const btnSalidaNo = document.getElementById('btnSalidaNo');

/** Seccion Titulos Visitas **/
const tituloNombre = document.getElementById('tituloNombre');
const tituloResidencia = document.getElementById('tituloResidencia')
const tituloRut = document.getElementById('tituloRut')
const tituloTipo = document.getElementById('tituloTipo')
const tituloHora = document.getElementById('tituloHora')
const tituloFecha = document.getElementById('tituloFecha')
const tituloPatente = document.getElementById('tituloPatente')
const tituloSexo = document.getElementById('tituloSexo');
const tituloObservaciones = document.getElementById('tituloObservaciones')

/** Seccion Cuadros Dashboard **/
const cuadroVisita = document.getElementById('cuadroVisitas');
const tablaVisita = document.querySelector('#tableReal tbody')

/** Seccion Llamada **/
const vistaLlamada = document.getElementById('vistaLlamada');
const btnsEstablecida = document.getElementById('llamadaCurso');
const btnsEntrante = document.getElementById('llamadaEntrante');
const btnMute = document.getElementById("btnMute");

function cargarVisitas(){    
    tabla = $('#tablaVisitas').DataTable( {
        "aProcessing": true,
        "aServerSide": true,
        "info": false,
        /** Cambio de idioma al Español + "mensajes personalizados" **/
        "language": {
            "lengthMenu": "Mostrar _MENU_ registros",
            "zeroRecords": "No se han encontraron resultados",
            "processing": '<i class="fa fa-spinner fa-spin fa-3x fa-fw"></i>',
            "sSearch": "Buscar:",
            "oPaginate": {
                "sFirst": "Primero",
                "sLast":"Último",
                "sNext":"Siguiente",
                "sPrevious": "Anterior"
            },
            "sProcessing":"Procesando...",
        },
        "ajax": {
            /** Obtención de los datos del endPoint **/
            "url": url+'visitas',
            "headers": {
                "Content-Type": "application/x-www-form-urlencoded",
                "Authorization": "Bearer " + token
            },
            "dataSrc": "data",
        },
        /** Llenado de las columnas **/
        "columns": [
            {
                "data": "idVisita"
            },
            {
                "data": "nombreCompletoVisita"
            },
            {
                "data": "rutVisita"
            },
            {
                "data": "residencia"
            },
            {
                "data": "tipoDeLlegada"
            },
            {
                "data": "horaLlegada"
            },
            {
                "data": "fechaLlegada"
            },
            {
                "data": "horaSalida"
            },
            {
                "data": "fechaSalida"
            },
            {
                "data": "patente"
            },
            {
                "data": "estacionamiento"
            },
            {
                "data": "fechaNacimiento"
            }
        ],
        /** Checkbox estilos y creación **/
        "resonsieve": "true",
        "bDestroy": true,
        "iDisplayLength": 10,
        "order": [[6, "desc"]]
    });
    $('.dataTables_filter input[type="search"]').
    attr('placeholder','🔍 Busca aqui ....');
    console.log("Fuera de la tabla");
}

function cargarLlamadas(){    
    tabla = $('#tablaLlamadas').DataTable( {
        "aProcessing": true,
        "aServerSide": true,
        "info": false,
        /** Cambio de idioma al Español + "mensajes personalizados" **/
        "language": {
            "lengthMenu": "Mostrar _MENU_ registros",
            "zeroRecords": "No se han encontraron resultados",
            "processing": '<i class="fa fa-spinner fa-spin fa-3x fa-fw"></i>',
            "sSearch": "Buscar:",
            "oPaginate": {
                "sFirst": "Primero",
                "sLast":"Último",
                "sNext":"Siguiente",
                "sPrevious": "Anterior"
            },
            "sProcessing":"Procesando...",
        },
        "ajax": {
            /** Obtención de los datos del endPoint **/
            
            "url": url+'ultimasllamadas',
            "type": 'POST',

            "headers": {
                "Content-Type": "application/x-www-form-urlencoded",
                "Authorization": "Bearer " + token
            },
            "dataSrc": "data",
        },
        /** Llenado de las columnas **/
        "columns": [
            {
                "data": "origen"
            },
            {
                "data": "destino"
            },
            {
                "data": "fecha"
            },
            {
                "data": "hora"
            },
            {
                "data": "duracion"
            }
        ],
        /** Checkbox estilos y creación **/
        "resonsieve": "true",
        "bDestroy": true,
        "iDisplayLength": 10,
        "columnDefs" : [{"targets":2, "type":"date"}],
        "order": [[2, "desc"]]
    });
    $('.dataTables_filter input[type="search"]').
    attr('placeholder','🔍 Busca aqui ....');
    console.log("Fuera de la tabla");
}

checkVisita.addEventListener('change',()=>{
    if(arriboPeaton.checked == true){
        $('.llegadaOculta').css('display','none')
        $('.fechaLlegada').removeClass('col-md-3')
        $('.fechaLlegada').addClass('col-md-4')
    }else if(arriboVehiculo.checked == true){
        $('.llegadaOculta').css('display','block')
        $('.fechaLlegada').removeClass('col-md-4')
        $('.fechaLlegada').addClass('col-md-3')
    }
})


/** LIMPIAR CAMPOS DEL MODAL AL ABRIR **/
$('#modalAgregarVisitas').on('show.bs.modal', function () {    
    nombreCompletoVisita.value = "";
    tituloNombre.innerHTML = "Nombre Completo:";
    tituloNombre.classList.replace('titulosVacio','titulos')
    nResidencia.value = "";
    tituloResidencia.innerHTML = "N° de residencia:";
    tituloResidencia.classList.replace('titulosVacio','titulos');
    fechaNacimientoVisita.value = "";
    rutVisita.value = "";
    tituloRut.innerHTML = "Rut:";
    tituloRut.classList.replace('titulosVacio','titulos');
    arriboPeaton.click();
    horaLlegadaVisita.value = "";
    fechaLlegadaVisita.value = "";
    patenteVisita.value = "";
    tituloPatente.innerHTML = "Patente:";
    tituloPatente.classList.replace('titulosVacio','titulos');
    estacionamientoVisita.value = "";
    observacionesVisita.value = "";
    observacionesVisita.style.height = '60px';
    /* sexoVisita.value = ""; */
    nacionalidadVisita.value = "";
    cargarResidencias();
    cargarFechaHora();  
})
$('#modalAgregarVisitas').on('shown.bs.modal', function () {
    document.getElementById('nombreInputId').focus();
})



/** Cargar Fechas y Horas **/

function cargarFechaHora(){
    let fechaHoy = new Date();
    let fechaLlegada = fechaHoy.toISOString().slice(0,10);
    let horaUno = fechaHoy.getHours();
    let horaDos = fechaHoy.getMinutes();
        if(horaUno.toString().length == 1){
            horaUno = "0"+horaUno;
        }
        if(horaDos.toString().length == 1){
            horaDos = "0"+horaDos;
        }
    horaLlegadaVisita.value = horaUno+':'+horaDos
    fechaLlegadaVisita.value = fechaLlegada;
}


/** Cargar Residencias **/

function cargarResidencias(){
    fetch(url+'residencias',{
        method:'GET',
        headers:{
            'Authorization':'Bearer '+ token
        },
        })
    .then((res)=>res.json())
    .then((datos)=>{
        $('#numeroResidenciaId').empty();
        $('#numeroResidenciaId').append(`<option value="0">-- Seleccionar --</option>`)

        datos.data.forEach((residencia)=>{
        $('#numeroResidenciaId').append(`
            <option value="${residencia.idResidencia}">${residencia.extension}</option>
        `)
        })
    })
}

/** Cargar Residencias SideBar **/

function cargarResidenciasSideBar(){
    fetch(url+'residencias',{
        method:'GET',
        headers:{
            'Authorization':'Bearer '+ token
        },
        })
    .then((res)=>res.json())
    .then((datos)=>{
        if(datos?.estado && datos?.data){
            const listaFamilias = document.getElementById('menuCall');
            datos.data.forEach((residencia)=>{
                residencias.push(residencia);
                const itemFamilia = `
                <li class="list-group-item list-group-item-action" style="border: none" >
            
                    <div id="contenedor">
                        <span class="pull-left mr_10">
                            <img src="img/user.png"  class="img-reponsive img-rounded" />
                        </span>
                        <div class="palabra" id="${residencia.extension}">
                            <span>${residencia.familia}</span>
                    
                            <div class="letra">
                                <span>${residencia.extension}</span>
                            </div>

                            <div id="points" class="dropdown dropend iconD">
                                <i class="fa fa-ellipsis-v toggle-calls" style="cursor: pointer;" data-bs-toggle="dropdown" aria-hidden="true"></i>
                                <ul class="dropdown-menu ">
                                <li><a class="dropdown-item menu-Llamar" value="${residencia.extension}@${appConfig.domain}" href="#">Llamar</a></li>
                                <li><a class="dropdown-item menu-Mensaje" href="#">Mensaje</a></li>
                                </ul>
                            </div>
                           </div>
                        
                    </div>
                    
                </li>
                            
                `;
                listaFamilias.innerHTML += itemFamilia;
            })
            setearBotonesLlamadas()
            setearBotonesMensajes()

        }
    })

    wpn()
    cargarMenuPuertas();
    cargarPerfil();
}

/** Wpn **/

function wpn(){

    var externalId = sessionStorage.getItem('wp').toString();;
    window.OneSignal = window.OneSignal || [];

        OneSignal.push(function() {
            OneSignal.showNativePrompt();

            OneSignal.push(["init", {
                
                appId: "20bc8b0d-8e9a-4c17-9152-f218aa99c124",
                    notifyButton: 
                        {
                            enable: false
                        },
                
                webhooks: {
                    cors: true,
                    'notification.clicked': 'https://api1.citoapp.cl/test/webhookOnesignalClik'
                },

                welcomeNotification: {
                    "title": "CITOApp conserjería (Demo)",
                    "message": "Suscrito a notificaciones de control de acceso",
                  }

                }]);

            OneSignal.setExternalUserId(externalId);
            OneSignal.setSubscription(true)
        });
}

/** Setear Botones de Llamadas **/
function setearBotonesLlamadas(){
    $("#menuCall .menu-Llamar").click(async function(){
        $('.sidebar').removeClass('active_sidebar');
        let to = $(this).attr('value');
        const extension = to.split('@')[0];
        const residencia = residencias.find(residencia => residencia.extension == extension);
        if (callID >= 0) return;
       
        document.getElementsByClassName('call-ext-name')[0].textContent = residencia.familia;
        document.getElementsByClassName('call-ext-account')[0].textContent = residencia.extension;

        btnsEntrante.style.display = "none";
        btnsEstablecida.style.display = "block";
        vistaLlamada.style.display = "block";

        try {
            callID = ABTOPhone.call(to);

            if (callID >= 0) {
                setRemoteMedia(callID);

                setupRingerOut();
                /*chkbxWithVideo.disabled = true; */
            }

        } catch (error) {
            console.log({error})
        }

        
    });
}

/** Setear Botones de Mensajes **/
function setearBotonesMensajes(){
    $("#menuCall .menu-Mensaje").click(function(){
        btnMensajes.click();
    });
}

/** Cargar Estacionamientos **/

arriboVehiculo.addEventListener('click', ()=>{
    cargarEstacionamientos()
})

function cargarEstacionamientos(){
    fetch(url+'estacionamientos',{
        method:'GET',
        headers:{
            'Authorization':'Bearer '+ token
        },
        })
    .then((res)=>res.json())
    .then((datos)=>{
        let estado = 'disabled';
        $('#estacionamientoId').empty();
        $('#estacionamientoId').append(`<option value="0">-- Seleccionar --</option>`)

        datos.data.forEach((parking)=>{
            if(parking.idEstadoEstacionamiento == 2){
                estado = 'disabled';
            }else{
                estado = 'disponible'
            }
            $('#estacionamientoId').append(`
                <option value="${parking.idEstacionamiento}" ${estado}>${parking.estacionamiento} ${parking.estadoEstacionamiento}</option>
            `)
        })
    })
}

/** Cargar Perfil **/

function cargarPerfil(){

    fetch(url+'perfil',{
        method:'GET',
        headers:{
            'Authorization':'Bearer '+ token
        },
        })
    .then((res)=>res.json())
    .then((datos)=>{

        let cliente = datos.data.cliente;
        let direccion = datos.data.direccion;
        let nombre_completo = datos.data.nombre+' '+datos.data.primerApellido;
        let comuna = datos.data.comuna;

        $('.profile_author_name > h5').html(nombre_completo);
        $('#nombreUser').html(nombre_completo+' '+datos.data.segundoApellido);
        $('#direccionUser').html(direccion+' '+comuna);
        $("#idNombreAdmin").val(datos.data.nombre);
        $("#nombreCliente").html(cliente);
        
    })
}

function modificarAdmin(){
    alert("aaa");
}



/** Validar campos a guardar **/
const rutV = false;
let rutL = false;
let rutValidado;

$("#rutId")
  .rut({formatOn: 'keyup', validateOn: 'keyup', minimumLength: 8})
  .on('rutInvalido', function(){ 
    tituloRut.innerHTML = "RUT Inválido.";
    tituloRut.classList.replace('titulos','titulosVacio');
    rutL = false;
    rutValidado = '';
  })
  .on('rutValido', function(){ 
    tituloRut.innerHTML = "Rut:";
    tituloRut.classList.replace('titulosVacio','titulos');
    rutValidado = rutVisita.value.replace(/[^kK0-9]/g, '');
    rutL = true;
});

function validarRegistro(){    
    cargarFechaHora();
    let nombreV = false;
    let nResidenciaV = false;
    let rutV = false;
    let arriboV = false;
    let patenteV = false;
    let sexoV = false;
    let observaV = false;
    console.log("RUT L DEL LET",rutL)
    console.log("Rut limpio",rutValidado)
    let rutLimpio = rutVisita.value.replace(/[^kK0-9]/g, '');


    
    console.log("Rut limpio",rutLimpio)
    


    let nuevaResidencia = {
        "RutVisita":'',
        "NombreCompletoVisita":'',
        "FechaNacimiento":null,
        "FechaLlegada":'',
        "HoraLlegada":'',
        "IdTipoDeLLegada":'',
        "Patente":null,
        "IdResidencia": '',
        "IdEstacionamiento": null
    }

    if(nombreCompletoVisita.value.trim() == ''){
        tituloNombre.innerHTML = "Ingrese el nombre del visitante.";
        tituloNombre.classList.replace('titulos','titulosVacio')
        nombreV = false;
    }else if(nombreCompletoVisita.value.trim().length > 60){
        tituloNombre.innerHTML = "Largo máximo 60 caracteres.";
        tituloNombre.classList.replace('titulos','titulosVacio')
        nombreV = false;
    }else{
        tituloNombre.innerHTML = "Nombre Completo:";
        tituloNombre.classList.replace('titulosVacio','titulos');
        nombreV = true;
        nuevaResidencia.NombreCompletoVisita = nombreCompletoVisita.value.trim();
    }
    if(nResidencia.value.trim() == "" || nResidencia.value == 0){
        tituloResidencia.innerHTML = "Seleccione una residencia.";
        tituloResidencia.classList.replace('titulos','titulosVacio');
        nResidenciaV = false;
    }else{
        tituloResidencia.innerHTML = "N° de residencia:";
        tituloResidencia.classList.replace('titulosVacio','titulos');
        nResidenciaV = true;
        nuevaResidencia.IdResidencia = parseInt(nResidencia.value.trim());
    }
    if(rutVisita.value.length == 0){
        tituloRut.innerHTML = "Ingrese el Rut del visitante.";
        tituloRut.classList.replace('titulos','titulosVacio');
        rutL = false;
    }/* else if(rutLimpio.length <= 7 || rutLimpio.length >= 10){
        tituloRut.innerHTML = "RUT Inválido, por favor, ingrese un formato de RUT válido.";
        tituloRut.classList.replace('titulos','titulosVacio');
        rutV = false;
    } *//* else{
        tituloRut.innerHTML = "Rut:";
        tituloRut.classList.replace('titulosVacio','titulos');
        rutV = true;
        nuevaResidencia.RutVisita = rutLimpio;
    } */
    if(rutL){
        nuevaResidencia.RutVisita = rutValidado;
    }
    if(fechaNacimientoVisita.value.trim() == ""){
        nuevaResidencia.FechaNacimiento = null;
    }else{
        nuevaResidencia.FechaNacimiento = fechaNacimientoVisita.value;
    }
    if(arriboPeaton.checked == false && arriboVehiculo.checked == false){
        tituloTipo.innerHTML = "Seleccione una opción.";
        tituloTipo.classList.replace('titulos','titulosVacio');
        arriboV = false;
    }else{
        tituloTipo.innerHTML = "Tipo de llegada:";
        tituloTipo.classList.replace('titulosVacio','titulos');
        arriboV = true;
    }
    if(horaLlegadaVisita.value.trim() == ""){
        tituloHora.innerHTML = "Seleccione una hora.";
        tituloHora.classList.replace('titulos','titulosVacio');        
    }else{
        tituloHora.innerHTML = "Hora de llegada:";
        tituloHora.classList.replace('titulosVacio','titulos');
        nuevaResidencia.HoraLlegada = horaLlegadaVisita.value.trim();
    }
    if(fechaLlegadaVisita.value.trim() == ""){
        tituloFecha.innerHTML = "Seleccione una fecha.";
        tituloFecha.classList.replace('titulos','titulosVacio');
    }else{
        tituloFecha.innerHTML = "Fecha de llegada:";
        tituloFecha.classList.replace('titulosVacio','titulos');
        nuevaResidencia.FechaLlegada = fechaLlegadaVisita.value.trim();
    }
    if(arriboVehiculo.checked == true && patenteVisita.value.trim() == ""){
        tituloPatente.innerHTML = "Ingrese la patente.";
        tituloPatente.classList.replace('titulos','titulosVacio');
        patenteV = false;
    }else if(patenteVisita.value.trim().length > 10){
        tituloPatente.innerHTML = "Largo máximo 10 caracteres";
        tituloPatente.classList.replace('titulos','titulosVacio');
        patenteV = false;
    }else{
        tituloPatente.innerHTML = "Patente:";
        tituloPatente.classList.replace('titulosVacio','titulos');
        patenteV = true;
        nuevaResidencia.Patente = patenteVisita.value.trim();
    }
    if(arriboPeaton.checked == true){
        nuevaResidencia.IdTipoDeLLegada = 1;
        nuevaResidencia.Patente = null;
    }else{
        nuevaResidencia.IdTipoDeLLegada = 2;
    }
    if(arriboVehiculo.checked == true && estacionamientoVisita.value != 0){
        nuevaResidencia.IdEstacionamiento = parseInt(estacionamientoVisita.value); 
    }else{
        nuevaResidencia.IdEstacionamiento = null;
    }

    //Campos pendiente por agregar en endpoint 
    /* if(sexoVisita.value == '0'){
        tituloSexo.innerHTML = "Seleccionar.";
        tituloSexo.classList.replace('titulos','titulosVacio');
        sexoV = false;
    }else{
        tituloSexo.innerHTML = "Sexo:";
        tituloSexo.classList.replace('titulosVacio','titulos');
        sexoV = true;
    }

    if(observacionesVisita.value.trim().length > 200){
        tituloObservaciones.innerHTML = "Máximo 200 caracteres.";
        tituloObservaciones.classList.replace('titulos','titulosVacio');
        observaV = false;
    }else{
        tituloObservaciones.innerHTML = "Observaciones:";
        tituloObservaciones.classList.replace('titulosVacio','titulos');
        observaV = true;
    } */

    console.log("validacion antes del if",nombreV, rutV, nResidenciaV, arriboV,patenteV)
    if(nombreV && rutL && nResidenciaV && arriboV && patenteV){
        console.table(nuevaResidencia)
        registrarVisita(nuevaResidencia);
    }else{
        console.log("Faltan campos por validar")
    }


}

btnGuardarVisita.addEventListener('click', ()=>{
    validarRegistro()
})

/** CAmbiar Contraseña **/

function modificarAdmin(){

    let newPassword = $("#newPassword").val();

    if(newPassword != ''){

        fetch("https://Api1.citoapp.cl/api/autenticacion/conserjeria/actualizarcontraseña",{
            method:'POST',
            headers:{
                "Content-type": "application/json",
                'Authorization':'Bearer '+ token
            },
            body: JSON.stringify( {
                contraseña: newPassword
            })
        })
        .then((res)=>res.json())
        .then((datos)=>{
            
            if(datos.estado){
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Contraseña cambiada con exito',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        })
    }else{
        Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Campo vacío',
            showConfirmButton: false,
            timer: 1500
        })
    }
}

/** Guardar Visitas **/
function registrarVisita(nuevaResidencia){
    $('#modalAgregarVisitas').modal('hide')
    fetch(url+"RegistrarVisita",{
        method: 'POST',
        headers:{
            "Content-type": "application/json",
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(nuevaResidencia)
    })
    .then((res) => res.json())
    .then((data) =>{
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: data.mensaje,
            showConfirmButton: false,
            timer: 1500,
            willClose: () => {
                cargarVisitas();                      
            }
        })
    }).catch(err => {
        console.log(err)
    });
}

/** Registrar Salida **/
	
$('#tablaVisitas tbody').on( 'click', 'tr', function () {
   let data = tabla.row(this).data();
   if(data.fechaSalida === null){        
        $("#modalSalida").modal('show');
        $('#btnSalidaSi').off('click').on('click', function(){
            registrarSalidaVisita(data);
            $("#modalSalida").modal('hide');
        })
        $('#btnSalidaNo').off('click').on('click',()=>{
            $("#modalSalida").modal('hide');
        })
   }
}); 

function registrarSalidaVisita(data){
    
    let fechaHoy = new Date();
    let rutSalida = data.rutVisita;
    let fechaLlegadaSalida = data.fechaLlegada;    
    let fechaLlegadaArray = fechaLlegadaSalida.split('-')
    let fechaFormateada = fechaLlegadaArray[2]+'-'+fechaLlegadaArray[1]+'-'+fechaLlegadaArray[0];
    let fechaSalida = fechaHoy.toISOString().slice(0,10);
    let horaUno = fechaHoy.getHours();
    let horaDos = fechaHoy.getMinutes();
    if(horaUno.toString().length == 1){
            horaUno = "0"+horaUno;
    }
    if(horaDos.toString().length == 1){
            horaDos = "0"+horaDos;
    }
    let horaSalida = horaUno+':'+horaDos;

    let salidaVisita = {rutVisita: rutSalida, fechaLlegada: fechaFormateada, fechaSalida: fechaSalida, horaSalida: horaSalida}
    fetch(url+"RegistrarSalida",{
        method: 'POST',
        headers:{
            "Content-type": "application/json",
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(salidaVisita)
    })
    .then((res) => res.json())
    .then((data) =>{
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Salida registrada con éxito.',
            showConfirmButton: false,
            timer: 1500,
            willClose: () => {
                cargarVisitas();                      
            }
        })
        
        
    }).catch(err => {
        console.log(err)
    });
}

/** Pistola **/
on_scanner()

function on_scanner() {
            let is_event = false; // for check just one event declaration
            let input = nombreCompletoVisita
            input.addEventListener("focus", function () {
                if (!is_event) {
                    is_event = true;
                    input.addEventListener("keypress", function (e) {
                        setTimeout(function () {
                            if (e.key == '#') {
                                scanner(input.value); // use value as you need
                                input.select();
                            }
                        }, 500)
                    })
                }
            });
            document.addEventListener("keypress", function (e) {                
                if (e.key == '/') {
                    input.focus();
                }                
            });
}

function scanner(value) {
            if (value == '') return;
            let input1 = nombreCompletoVisita
            let input2 = rutVisita    
            let codigoNacionalidad = value.slice(45,48)
            let sexo = value.slice(37,38);
            if(sexo == 'M'){
                sexoVisita.value = '1';
            }else if(sexo == 'F'){
                sexoVisita.value = '2';
            }else{
                sexoVisita.value = '3';
            }
            let nacimiento = value.slice(30,36).split('')
            let nacimientoDia = nacimiento[4]+nacimiento[5]
            let nacimientoMes = nacimiento[2]+nacimiento[3]
            let nacimientoAño = nacimiento[0]+nacimiento[1]
            let año = new Date().getFullYear().toString();
            let final = año.slice(-2);
            if(nacimientoAño <= final){
                fechaNacimientoVisita.value = '20'+nacimientoAño+'-'+nacimientoMes+'-'+nacimientoDia
            }else{
                fechaNacimientoVisita.value = '19'+nacimientoAño+'-'+nacimientoMes+'-'+nacimientoDia
            }
            /* var options = {
                mode: "no-cors"
            } */
            /* fetch('vendors/nacionalidades.json',options) */
            fetch('vendors/nacionalidades.json', {
                method: "GET",
                headers: {'Content-Type':'application/json',
                        'Access-Control-Allow-Origin':'*',
                },
            })
            .then(res => res.json())
            .then(datos => {
                const result = datos.data.filter(nacio => nacio.ISO3 == codigoNacionalidad)
                nacionalidadVisita.value = result[0].ESPAÑOL;
            })

            let valorNuevo = value.substr(48);
            let valorNuevo2 = valorNuevo.split(';');
            let nombres= valorNuevo2[2].replace(/\d+/g,'')

            input2.value = valorNuevo2[0]+'-'+valorNuevo2[1];
            input1.value = valorNuevo2[5]+' '+nombres+' '+valorNuevo2[3]
            
            rutValidado = input2.value.replace(/[^kK0-9]/g, '');
            rutL = true;
}


/****************************************** Seccion Invitados *******************************************/

/***** Calendario *****/
const settingsAccesoControl = {
    Color: "black",
    LinkColor: "red",
    NavShow: true,
    NavLocation: "",
    DateTimeShow: true,
    DateTimeFormat: "mmmm, yyyy",
    DatetimeLocation: "",
    EventClick: showPopUpDash,
    EventTargetWholeDay: false,
    DisabledDays: [],
  };
  const calendarioAcceso = document.getElementById("calendarioAcceso");
  fetch(url+"infocontrolacceso", {
    method: "GET",
    headers: {
      Authorization: "Bearer " + token,
    },
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (calendar) {
      const calen = calendar.data.invitados;
      const contadorFechaAcceso = calen.length;
      let events = [];
      for (let i = 0; i < contadorFechaAcceso; i++) {
        const fechasInviAcceso = calen[i].fecha;
  
        const formatoFecha = fechasInviAcceso.split("-");
        events[i] = {
          Date: new Date(formatoFecha[2], formatoFecha[1] - 1, formatoFecha[0]),
          Title: "Invitados:" + calen[i].invitados + ".",
        };
      }
      /* events = [{'Date': new Date(2021, 6, 6), 'Title': 'Invitados', 'Link': function(){showPopUp()}}]; */
  
      caleandar(calendarioAcceso, events, settingsAccesoControl);
    });
    
    //////////////////////////// MODAL CALENDARIO
            let month;
            let month1 = '';
            const months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
            let filtroFecha;
            function showPopUpDash(){
                   $('#modalCalendarioAcceso').modal('show') 
                    $('.cld-day').click(function(){
                            $('#tituloModalCalendarioAcceso').empty();
                            const day = $(this).children(".cld-number").html().split("<")[0];
                            month = $(".today").html().split(',')[0]
                            const year= $(".today").html().split(", ")[1];           
                            $('#tituloModalCalendarioAcceso').append(`
                              ${day} de ${month} del ${year}
                            `)
                            month1 = month.trim();        
                            month1 = months.indexOf(month1);
                            month1 = month1+1
                            month1 = month1.toString();
                            filtroFecha = year+'-'+month1+'-'+day
                            console.log("filtro fecha", filtroFecha)
                            tablaCalendario() 
                    })
            }
    
            function tablaCalendario(){
                console.log("filtro fecha url", url+"getInvitadosFecha/"+filtroFecha)
            tabla = $('#tableCalendarioAcceso').DataTable( {            
            "processing": true,
            "aServerSide": true,
            "bFilter": false ,
            "bLengthChange": false,
            "bPaginate": false,
            "bInfo": false,
            "ordering": false,
            /** Cambio de idioma al Español + "mensajes personalizados" **/
            "language": {
                "zeroRecords": "No se han encontrado datos con referencia a su busqueda",
                "infoEmpty": "No se han encontraron resultados",
                "processing": '<i class="fa fa-spinner fa-spin fa-3x fa-fw"></i>',
            },
            "ajax": {
                /** Obtención de los datos del endPoint **/
                "url": "https://Api1.citoapp.cl/api/administracion/getInvitadosFecha/"+filtroFecha,
                "headers": {
                    "Content-Type": "application/x-www-form-urlencoded",
                    "Authorization": "Bearer " + token
                },
                
                "dataSrc": "data"
            },
            /** Llenado de las columnas **/
            "columns": [
                    {
                        "data": "nombreInvitado"
                    },            
                    {
                        "data": "apellidoInvitado"
                    },
                    {
                        "data": "telefono"
                    },
                    {
                        "data": "email"
                    },
                    {
                        "data": "horaInicio"
                    },
                    {
                        "data": "fechaTermino"
                    },
                    {
                        "data": "horaTermino"
                    },
                    {
                        "data": "residencia"
                    }
                ],
            
            "resonsieve": "true",
            "bDestroy": true,
            "order": [[0, "asc"]]
        });
        }

/** Invitaciones Grupales / Individuales **/

function listInvitaciones() {

    // Consumo del endPoint
     fetch(url+"infoControlAcceso",
     {
        method: 'GET', 
        headers: {
            'Authorization': 'Bearer ' + token
          }
     })
    .then((res) => res.json())
    .then((datos) => {

            $('#tableInvitadosGrup tbody').empty();
            datos.data.invitacionesGrupales.forEach((invitacionesG) => {    
            
            $("#tableInvitadosGrup tbody").append(`
            <tr>
                <td>${invitacionesG.fechaInicio}</td>
                <td>${invitacionesG.fechaTermino}</td>
                <td>${invitacionesG.cantidadInvitados}</td>
                <td>${invitacionesG.casaDpto}</td>
                
            </tr>     
            `)
            })

            $('#tableInvitadosIndiv tbody').empty();
            datos.data.invitacionesIndividuales.forEach((invitacionesI) => {                     
            $("#tableInvitadosIndiv tbody").append(`
            <tr>
                <td>${invitacionesI.fechaInicio}</td>
                <td>${invitacionesI.fechaTermino}</td>
                <td>${invitacionesI.casaDpto}</td>
                
            </tr>     
            `)         
        });
    })
}

/** BUSCADOR **/
const buscadorAcceso = document.getElementById('btnRegistro');
const inputAcceso = document.getElementById('buscadorRegistro');
buscadorAcceso.addEventListener('click', ()=>{
    console.log("FEFE")
    let filtro = inputAcceso.value.trim();
    cargarInvitados(filtro)
})
inputAcceso.addEventListener('keydown', function(e){
    let code = (e.key)
    if(code==='Enter'){
        let filtro = inputAcceso.value.trim();
        cargarInvitados(filtro)
    }
    
})

function cargarInvitados(filtro){
    if(filtro.length > 0  ){
        tabla = $('#tableInvitados').DataTable( {            
            "processing": true,
            "aServerSide": true,
            "bFilter": false ,
            "bLengthChange": false,
            "bPaginate": false,
            "bInfo": false,
            "language": {
                "zeroRecords": "No se han encontrado datos con referencia a su busqueda",
                "infoEmpty": "No se han encontraron resultados",
                "processing": '<i class="fa fa-spinner fa-spin fa-3x fa-fw"></i>',
            },
            "ajax": {
                "url": url+"buscarinvitados/"+filtro,
                "headers": {
                    "Content-Type": "application/x-www-form-urlencoded",
                    "Authorization": "Bearer " + token
                },
                
                "dataSrc": "data"
            },
            "columns": [
                {
                    "data": "nombreInvitado"
                },
                {
                    "data": "apellidoInvitado"
                },  
                {
                    "data": "telefono"
                },
                {
                    "data": "fechaInicio"
                },
                {
                    "data": "horaInicio"
                },
                {
                    "data": "fechaTermino"
                },
                {   
                    "data": "horaTermino"
                }
                ,
                {
                    "data": "tipoInvitacion"
                }                
            ],
      
            
            
            "resonsieve": "true",
            "bDestroy": true,
            "order": [[0, "asc"]]
        });
    }else{
        alert("Debe Ingresar mas de 1 digito")
    }
    
}

/** CAJAS DASHBOARD **/

const connection = new signalR.HubConnectionBuilder()
    .withUrl("https://api1.citoapp.cl/citoapphub",{ accessTokenFactory: () => token })
    .configureLogging(signalR.LogLevel.Information)
    .build();
connection.start();
async function start() {
    try {
        await connection.start();
        console.log("SignalR Connected.");
    } catch (err) {
        console.log(err);
        setTimeout(start, 5000);
    }
};

connection.onclose(async () => {
    await start();
});

// Start the connection.

/* document.getElementById("sendButton").disabled = true; */

connection.on("ReceivedInvitaciones",function(invitacionesT){
    console.log("Invitaciones",invitacionesT)
    console.log(tablaVisita)
    $('#tableReal tbody').empty();
    /* <tr>
     <td class="f_s_12 f_w_400 color_text_6">$564</td>
     <td class="f_s_12 f_w_400 color_text_6">$650</td>
     <td class="f_s_12 f_w_400 text-center"><a href="#" class="text_color_1">20</a></td>
    </tr> */
    invitacionesT.forEach((invitacionesTabla)=>{
        console.log("asd",invitacionesTabla)
        let tr = document.createElement('tr');
        let td = document.createElement('td');
        let td2 = document.createElement('td');
        let td3 = document.createElement('td');
        td.classList.add('f_s_12', 'f_w_400', 'color_text_6');
        td2.classList.add('f_s_12', 'f_w_400', 'color_text_6');
        td3.classList.add('f_s_12', 'f_w_400', 'color_text_6','text-center');
        tr.appendChild(td);
        td.textContent = `${invitacionesTabla.extension}`
        tr.appendChild(td2);
        td2.textContent = `${invitacionesTabla.hora}`
        tr.appendChild(td3);
        td3.textContent = `${invitacionesTabla.cantidadInvitados}`
        tablaVisita.appendChild(tr)
    })
    
})

connection.on("ReceivedEstacionamientos",function(estacionamientosV){
    console.log("Invitaciones",estacionamientosV)

    $('#estacionamientosV').empty();
    estacionamientosV.forEach((estacionamientoFor)=>{
        console.log("asd",estacionamientoFor)
        $('#estacionamientosV').append(`
        <div class="col-lg-6">
            <div class="single_plan d-flex align-items-center justify-content-between">
                <div class="plan_left d-flex align-items-center">
                    <div class="thumb">
                    <img src="img/svgs/iconmonstr-car-3.svg" alt="">
                    </div>
                    <div>
                    <h5>${estacionamientoFor.estacionamiento} - ${estacionamientoFor.extension}</h5>
                    <span>${estacionamientoFor.patente.toUpperCase()}</span>
                    </div>
                </div>
            </div>
        </div>
    `)
        

    })
    
})

connection.on("ReceivedVisitas", function (visitas) {
    console.log("visitas",visitas)
    $('#cuadroVisitas').empty();
    visitas.forEach((visitasDetalle) => {
        console.log(visitas)
        console.log("Detalle",visitasDetalle)        
        let divMayor = document.createElement('div');
        divMayor.classList.add('single_user_pil','d-flex','align-items-center','justify-content-between');

        let divNombre = document.createElement('div');
        divNombre.classList.add('user_pils_thumb','d-flex','align-items-center','col-md-8');

        let divImagen = document.createElement('div');
        divImagen.classList.add('thumb_34','mr_15','mt-0');
        let img = document.createElement('img');
        img.classList.add('img-fluid','radius_50');
        img.setAttribute('src','img/user.png');
        let span = document.createElement('span');
        span.classList.add('f_s_14','f_w_400','text_color_11');
        let spanId = document.createElement('span');
        spanId.style.display = 'none';

        let divResidencia = document.createElement('div');
        divResidencia.classList.add('user_info');

        let divOjo = document.createElement('div');
        divOjo.classList.add('action_btns','d-flex','btnDetalle');
        let aOjo = document.createElement('a');
        aOjo.classList.add('action_btn','btnDetalleVisita');
        aOjo.setAttribute('value',`${visitasDetalle.id}`)
        aOjo.onclick = function() { detalleVisita(this); };
        let iOjo = document.createElement('i');
        iOjo.classList.add('fa','fa-eye','btnD');

        divImagen.appendChild(img);
        divNombre.appendChild(spanId);
        spanId.textContent = `${visitasDetalle.id}`;
        divNombre.appendChild(divImagen);
        divNombre.appendChild(span);
        span.textContent = `${visitasDetalle.nombreVisita}`;
        divMayor.appendChild(divNombre);
        divMayor.appendChild(divResidencia);
        divResidencia.textContent = `${visitasDetalle.residencia}`;
        aOjo.appendChild(iOjo);
        divOjo.appendChild(aOjo);
        divMayor.appendChild(divOjo);
        
        cuadroVisita.appendChild(divMayor);
    });
    
});


function tablaDetalleVisita(){
    /* console.log("filtro fecha url", url+"getInvitadosFecha/"+filtroFecha) */
    tablita = $('#tableDetalleVisita').DataTable( {            
    "processing": true,
    "aServerSide": true,
    "bFilter": false ,
    "bLengthChange": false,
    "bPaginate": false,
    "bInfo": false,
    "ordering": false,
    /** Cambio de idioma al Español + "mensajes personalizados" **/
    "language": {
        "zeroRecords": "No se han encontrado datos con referencia a su busqueda",
        "infoEmpty": "No se han encontraron resultados",
        "processing": '<i class="fa fa-spinner fa-spin fa-3x fa-fw"></i>',
    },
    "ajax": {
        /** Obtención de los datos del endPoint **/
        "url": url+'visitaId/1661',
        "headers": {
            "Content-Type": "application/x-www-form-urlencoded",
            "Authorization": "Bearer " + token
        },
        
        "dataSrc": "data"
    },
    /** Llenado de las columnas **/
    "columns": [
            {
                "data": "idVisita"
            },            
            {
                "data": "rutVisita"
            },
            {
                "data": "nombreCompletoVisita"
            },
            {
                "data": "fechaNacimiento"
            },
            {
                "data": "fechaLlegada"
            },
            {
                "data": "horaLlegada"
            },
            {
                "data": "fechaSalida"
            },
            {
                "data": "horaSalida"
            },
            {
                "data": "tipoDeLlegada"
            },
            {
                "data": "patente"
            },
            {
                "data": "estacionamiento"
            },
            {
                "data": "residencia"
            }
        ],

    "resonsieve": "true",
    "bDestroy": true,
    "order": [[0, "asc"]]
    });
}


function detalleVisita(id){
    $('#modalDetalleVisita').modal('show')
    let idFiltro = id.getAttribute('value');
    tablaDetalleV(idFiltro)
    console.log("ID",id.getAttribute('value'))
}

function tablaDetalleV(idFiltro){
    fetch(url+"visitaId/"+idFiltro,
    {
       method: 'GET', 
       headers: {
           'Authorization': 'Bearer ' + token
         }
    })
   .then((res) => res.json())
   .then((datos) => {
            console.log(datos.data);
           $('#tableDetalleVisita tbody').empty();
           $('#tituloModalDetalleVisita').empty();

           $('#tituloModalDetalleVisita').append(datos.data.nombreCompletoVisita)
           /* Object.keys(obj).map(
            (key) => (obj[key] === null) ? obj[key] = '-' : obj[key]
            ); */
                       
           $("#tableDetalleVisita tbody").append(`
            <tr>
                
                <td>${datos.data.rutVisita}</td>
                <td>${datos.data.nombreCompletoVisita}</td>
                <td>${datos.data.fechaNacimiento}</td>
                <td>${datos.data.fechaLlegada}</td>
                <td>${datos.data.horaLlegada}</td>
              
                <td>${datos.data.tipoDeLlegada}</td>
                <td>${datos.data.patente}</td>
                <td>${datos.data.estacionamiento}</td>
                <td>${datos.data.residencia}</td>
            </tr>     
           `)
           
   })
}



/****************************************** Seccion WEB RTC *******************************************/

var server = 'voice1002.citoapp.io';
var defaultWS = "443";
var defaultWSS = "443";
var ABTOPhone = null;
var btnCall, btnHangUp, btnHold, btnTransfer;
var btnAccept, btnReject;
var btnRegister, btnUnRegister;
var chkbxWithVideo, chkbxDoRecord;
var btnSendMessage, message_text;
var __nt = null;
var callID = -1;
var phoneRing = null;
var phoneRingLoop = false;
var secure = true;

const btnLlamar = document.getElementsByClassName('menu-Llamar');
console.log("BTN LLAMAR", btnLlamar)




window.onload = async function () {
    /* if (secure) {
        document.getElementById('port').value = defaultWSS;
    } else {
        document.getElementById('port').value = defaultWS;
    } */

    //157

    var totalScreen = jQuery(window).height();
    var heightList = totalScreen - 157 - 36;
    $('#menuCall').attr('style', 'height: '+heightList+'px !important');

    $('#btnPrincipal').css('color','#fff');
    $('#btnPrincipal').css('background-color','#0d6efd');

    if (RTCPeerConnection) {
        try {
            await createPhone()
            registerPhone(
                appConfig.user,
                appConfig.pass,
                appConfig.domain,
                appConfig.port,
                true);
            cargarResidenciasSideBar()
        } catch (e) { console.error(e); }
    }    
};

    var totalSeconds = 0;
    var timerId = null;
    var minute = 0;
    var second = 0;
    function startTime() {
        if (!timerId) {
            timerId = setInterval(count, 1000);
            function count() {
                var timer = $('.incall-time');
                minute = Math.floor(totalSeconds / 60);
                second = totalSeconds - (minute * 60);
                timer.html(checkTime(minute) + ":" + checkTime(second));
                totalSeconds++;
            }
        }
    }
    function stopTime() {
        if (timerId) {
            clearTimeout(timerId);
            timerId = null;
        }
    }
    function resetTime() {
        stopTime();
        totalSeconds = 0;
        var timer = $('.incall-time');
        timer.html("00:00");
    }

    window.onbeforeunload = function () {
        freePhone();
    };

    function createPhone() {
        ABTOPhone = new ABTOPhoneUA();

        ABTOPhone.addStunServer("stun:stun.l.google.com:19302");
        ABTOPhone.addStunServer("stun:stun4.l.google.com:19302");

        startLocalMedia();
        ABTOPhone.onConnected = function () {
            console.log("ABTO CONNECTED")
        };

        ABTOPhone.onDisconnected = function() {
            console.log("ABTO DESCONECTADO")
        };

        ABTOPhone.onConnectionError = function (code, message) {
            /* sidebarError(); */

            ABTOPhone.close();
        };

        // Cuando hace la conexion toma el nombre del usuario y lo despliega

       /*  ABTOPhone.onRegistered = function () {
            ////////////////////////////
            showVideo();
            var name = $('.username.me');
            name.text(document.getElementById('UserId').value + " (You)");
            ///////////////////////////

            var selectAccountOwn = $('.select-account')[0];
            var selectAccountTo = $("#call_to")[0];
            if (selectAccountOwn.selectedIndex == 0) {
                selectAccountTo.selectedIndex = 1;
            } else {
                selectAccountTo.selectedIndex = 0;
            }

            btnSendMessage.disabled = false;
        }; */

        /* ABTOPhone.onRegisterError = function (code, message) {
            sidebarError();

            btnSendMessage.disabled = true;
        }; */

        ABTOPhone.onUnregisterError = function(code, message) {};

        ABTOPhone.onNewCall = function (id) { };

        ABTOPhone.onHangUp = function (id) {//cancelled
            ///////////////////////////////
            /* var callFrom = $('#call_to_hidden');
            callFrom.val(""); */
            ///////////////////////////////
            vistaLlamada.style.display = "none";
            console.log("Me colgo")
            callID = -1;
            stopRinger();
            /* stopRinger(); */
            /* showIncomingCall(null); */

            /* btnHold.disabled = true;
            btnTransfer.disabled = true;
            chkbxWithVideo.disabled = false; */
        };

        ABTOPhone.onLocalMediaStarted = function(stream) {
            console.log("on local media started",stream)
            btnMute.addEventListener('click',()=>{
                if(btnMute.classList.contains('button-on')){
                    btnMute.classList.remove('button-on');
                    btnMute.classList.add('button-off');
                    ABTOPhone.mute();
                }else{
                    btnMute.classList.add('button-on');
                    btnMute.classList.remove('button-off');
                    ABTOPhone.unmute();
                }
            })
        };

        ABTOPhone.onLocalMediaStopped = function() {};

        ABTOPhone.onLocalMediaStartFailed = function(error) {};

        ABTOPhone.onRemoteMediaStarted = function(id, stream) {};

        ABTOPhone.onRemoteMediaStopped = function(id) {};

        ABTOPhone.onRingingTransfer = function(id, to) {
            callID = id;
            setRemoteMedia(callID);
        };

        ABTOPhone.onRinging = function(id, statusCode) {};

        ABTOPhone.onInvited = function (id, from) {
            console.log("Invitado", id, from)
            if (callID < 0) {
                incomingCall(id, from);
            } else {
                ABTOPhone.reject(id);
            }
        };

        ABTOPhone.onEstablished = function (id, from) {
            ////////////////////////////
            /* from = from.substring(4, from.length);
            var call = $('.call-form');
            call.hide();
            var callPanel = $('.call-panel');
            callPanel.css('visibility', 'visible');
            var name = $('.username.from .name');
            name.text(from);
            var videoInfo = $('.video-info');
            videoInfo.show();
            var callFrom = $('#call_to_hidden');
            callFrom.val(from); */
            resetTime();
            startTime();
            stopRinger();
            ///////////////////////////

            /* document.getElementById('call_status').textContent = "Call from " + from;

            stopRinger();

            btnHold.disabled = false;
            btnTransfer.disabled = false;
            chkbxWithVideo.disabled = true; */
        };

        ABTOPhone.onEstablishError = function (id, code,status) {//rejected
            ////////////////////////////
           /*  var callFrom = $('#call_to_hidden');
            callFrom.val("");
            var col = $('.col-form');
            col.show();
            var videoInfo = $('.video-info');
            videoInfo.hide();
            var chat = $('.chat');
            chat.html("<div class=\"no-msg\">No messages yet</div>");
            ///////////////////////////

            document.getElementById('call_status').textContent = ""; */

            callID = -1;
            stopRinger();
          /*   stopRinger();
            showIncomingCall(null);
            chkbxWithVideo.disabled = false; */
        };

        ABTOPhone.onHold = function (id, holdON, thisSideInitiated) {
            /* btnHold.disabled = holdON && !thisSideInitiated;*/
            targetHold(!holdON); 
            if (!holdON) {
                startTime();
            }
            else {
                stopTime();
            }
        };

        ABTOPhone.onMessage = function (from, text) {
            addChatSentence(from, text, false);
        };

        ABTOPhone.onCallCleared = function (id) {

            console.log("33")

            vistaLlamada.style.display = "none";
            /* alert("LLAMADA LIMPIADA?") */
            ////////////////////////////
            /* var callFrom = $('#call_to_hidden');
            callFrom.val("");
            var call = $('.call-form');
            call.show();
            var callPanel = $('.call-panel');
            callPanel.css('visibility', 'hidden');
            var videoInfo = $('.video-info');
            videoInfo.hide();
            var chat = $('.chat');
            chat.html("<div class=\"no-msg\">No messages yet</div>");*/
            stopTime(); 
            ///////////////////////////

            /* document.getElementById('call_status').textContent = ""; */

            callID = -1;
            resetTime();
            /* alert("Paso el callId") */
            targetHold(true);
            /* 
            btnHold.disabled = true;
            btnTransfer.disabled = true;
            chkbxWithVideo.disabled = false; */
        };

        ABTOPhone.onRecordReady = function(id, url) { // download recorded audio/video
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = url;
            a.download = ABTOPhone.getInterlocutorsAddress(id) + "_" + getDateTimeStr() + ".webm";
            document.body.appendChild(a);
            a.click();
            setTimeout(function() {
                document.body.removeChild(a);
                window.URL.revokeObjectURL(url);
            }, 100);
        };

        ABTOPhone.onUnregistered = function () {
            btnSendMessage.disabled = true;
        };

        setearBotonesLlamadas()
        setearBotonesMensajes()
        
        //Postible boton de llamada
        /*  btnCall = document.getElementById("btnCall");
        btnCall.onclick = function () {
            if (callID >= 0) return;   
            var to = "1000@voice1002.citoapp.io";
            var le = "102@voice1002.citoapp.io";
            var to = "10000@sip100.citoapp.cl";
           
            document.getElementsByClassName('call-ext-name')[0].textContent = to;

            btnsEntrante.style.display = "none";
            btnsEstablecida.style.display = "block";
            vistaLlamada.style.display = "block";

                    

            callID = ABTOPhone.call(to);
            console.log("LLAMANDO")

            if (callID >= 0) {
                setRemoteMedia(callID);

                 setupRingerOut();
            }
        }; */
        
        btnHangUp = document.getElementById("btnHangUp");
        btnHangUp.onclick = function () {
            vistaLlamada.style.display = "none";
            try {
                ABTOPhone.bye(callID);
            } catch (error) {
                console.log({error})
            } finally {
                if(callID >= 0){
                    callID = -1
                }
            }
            
            stopRinger();
        };
        
        btnHold = document.getElementById("btnHold");
        btnHold.onclick = function () {
            ABTOPhone.hold(callID);
        };
        /*
        btnTransfer = document.getElementById("btnTransfer");
        btnTransfer.onclick = function () {
            var to = $("#transfer_to option:selected").text();
            ABTOPhone.transfer(callID, to);
        };
        */
        btnAccept = document.getElementById("btnAccept");
        btnAccept.onclick = function () {
            setRemoteMedia(callID);

            ABTOPhone.accept(callID);
            btnsEntrante.style.display = "none";
            btnsEstablecida.style.display = "block";
            stopRinger();
            showIncomingCall(null);
            vistaLlamada.style.display = "block";
        };

        btnReject = document.getElementById("btnReject");
        btnReject.onclick = function () {
            ABTOPhone.reject(callID);
            stopRinger();
            showIncomingCall(null);

            callID = -1;
        }; 


        btnRegister = document.getElementById("btnRegister");
        btnRegister.onclick = function () {
            // ------------
            // ------------
            registerPhone(
                document.getElementById('UserId').value,
                document.getElementById('password').value,
                document.getElementById('domain').value,
                document.getElementById('port').value,
                secure);
        };
        btnUnRegister = document.getElementById("btnUnRegister");
        btnUnRegister.onclick = function () {
            ABTOPhone.close();
        };

       /*  message_text = document.getElementById("message_text");
        message_text.onkeyup = function (event) {
            if (event.keyCode === 13) {
                btnSendMessage.click();
            }
        };

        btnSendMessage = document.getElementById("btnSendMessage");
        btnSendMessage.onclick = function () {
            if (ABTOPhone.getIsRegistered()) {
                ////////////////////////
                var callFrom = $('#call_to_hidden');
                var messageTo = callFrom.val();
                ///////////////////////

                var text = message_text.value;

                if (messageTo && text) {
                    ABTOPhone.sendMessage(messageTo, text);
                    message_text.value = '';

                    addChatSentence('me', text, true);
                }
            }
        };
        */
        if ("Notification" in window) {
            if (Notification.permission !== "granted" && Notification.permission !== 'denied') {
                Notification.requestPermission(function (permission) {
                    if (!('permission' in Notification)) {
                        Notification.permission = permission;
                    }
                });
            }
        } 
    }

    function setupRinger(filename) {
        //create the phone ringing audio
        phoneRing = new Audio();
        phoneRingLoop = true;

        phoneRing.src = filename;

        phoneRing.addEventListener('ended', function () {
            if (phoneRingLoop) {
                this.play();
            }
        }, false);

        phoneRing.play();
    }

    function setupRingerIn() {
        setupRinger('sounds/googleH.mp3');
    }

    function setupRingerOut() {
        setupRinger('sounds/ringbacktone.wav');
    }

    function stopRinger() {
        phoneRingLoop = false;

        if (phoneRing != null) {
            phoneRing.pause();
        }
    }
   

    function targetHold(status) {
        /* var icon = $(".nbtnicon.hold");
        var title = $(".nbtntitle.hold");
        var holded = $(".call-panel .time");
        var onhold = $(".onhold"); */
        
        console.log("BTN HOLD",btnHold)
        if (!status) {
            if (btnHold.classList.contains("white-bkg")) {
                btnHold.classList.remove("white-bkg");
                btnHold.classList.add("yellow-bkg");
                /* title.text("unhold");
                holded.addClass("holded");
                holded.html("Call<br />holded");
                onhold.css('visibility', 'visible'); */
            }
            /* btnHold.style.backgroundColor = "#F8B559"; */
        } else {
            btnHold.classList.remove("yellow-bkg");
            btnHold.classList.add("white-bkg");
            /* title.text("hold");
            holded.removeClass("holded");
            holded.html(checkTime(minute) + ":" + checkTime(second));
            onhold.css('visibility', 'hidden'); */
        }
    }

    function freePhone() {
        if (ABTOPhone) {
            ABTOPhone.close();
        }
    }
    function startLocalMedia() {
        if (ABTOPhone) {
                ABTOPhone.startLocalMedia(null, null, null);            
        }
    }
    function setRemoteMedia(id) {
        if (ABTOPhone) {
            ABTOPhone.setRemoteMedia(id, document.getElementById('video_remote'));
        }
    }

    function registerPhone(sipID, sipPW, sipDN, wsPort, secure) {
        ABTOPhone.setSipUserName(sipID);
        ABTOPhone.setSipLogin(sipID);
        ABTOPhone.setSipPassword(sipPW);
        ABTOPhone.setSipDomain(sipDN);
        ABTOPhone.setWSPort(wsPort);
        ABTOPhone.setSecure(secure);
        console.log("CREDENCIALES",sipID," ",sipPW, " ",sipDN, " ",wsPort, " ",secure)
        console.log("ABTOP",ABTOPhone)
        ABTOPhone.initAndRegister();
    }
    function checkTime(i) {
        if (i < 10) {
            i = "0" + i;
        }
        return i;
    }
    function incomingCall(id, from) {
        callID = id;

        setupRingerIn();
        showIncomingCall(from);
    }

    function showIncomingCall(from) {
        if (from) {
            vistaLlamada.style.display = "block";
            btnsEntrante.style.display = "block";
            btnsEstablecida.style.display = "none";
            //from = sip:6002@dominioprueba.citoapp.io
            const extension = from.split("@")[0].split(":")[1];
            const residencia = residencias.find((residencia) => residencia.extension == extension)

            document.getElementsByClassName('call-ext-name')[0].textContent = residencia.familia;
            document.getElementsByClassName('call-ext-account')[0].textContent = residencia.extension;
            
            /* alert(from) */
           /*  document.getElementById('call_status').textContent = 'Incoming call from ' + from + '. Accept?';

            btnCall.disabled = true;
            btnHangUp.disabled = true;
            btnHold.disabled = true;
            btnTransfer.disabled = true;
            btnAccept.disabled = false;
            btnReject.disabled = false; */

            if ("Notification" in window && Notification.permission === "granted") {
                if (__nt && __nt.close) {
                    __nt.close();
                }

                __nt = new Notification('Incoming call', { body: 'Incoming call from ' + from + '.' });
                //__nt.onclose = function () { __nt = null; };
            }
        } else {
           /*  document.getElementById('call_status').textContent = "";

            btnCall.disabled = false;
            btnHangUp.disabled = false;
            btnHold.disabled = false;
            btnTransfer.disabled = false;
            btnAccept.disabled = true;
            btnReject.disabled = true; */
            vistaLlamada.style.display = "none";
            if (__nt && __nt.close) {
                __nt.close();
                __nt = null;
            }
        }
    }
