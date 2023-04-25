

    /* PLIVO SDK */

const btnPlivo = document.getElementById('btnPlivo');
/* const btnLoginPlivo = document.getElementById('btnLoginPlivo');  */

var callStorage = {}, timer = "00:00:00";
function date(){
	return (new Date()).toISOString().substring(0, 10)+" "+Date().split(" ")[4];
}

$('.hangup').click(function(){
	console.info('Hangup');
	if(plivoBrowserSdk.client.callSession){
		plivoBrowserSdk.client.hangup();
	}else{
		callOff();
	}
});

btnPlivo.addEventListener('click',()=>{
    initPhone();
})


function onWebrtcNotSupported() {
	console.warn('no webRTC support');
	alert('Webrtc is not supported in this broswer, Please use latest version of chrome/firefox/opera/IE Edge');
}

function onLogin(){
	console.info('Logged in');
}
function onLoginFailed(reason){
	console.info('onLoginFailed ',reason);
}

String.prototype.calltimer = function () {
    var sec_num = parseInt(this, 10);
    var hours   = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);
    if (hours   < 10) {hours   = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    return hours+':'+minutes+':'+seconds;
}

function onIncomingCall(callerName, extraHeaders){
	console.info(callerName, extraHeaders);
	callStorage.startTime = date();
	callStorage.mode = 'in';
	callStorage.num = callerName;
	$('#boundType').html('Incomming :');
	$('#callNum').html(callerName);
	$('#callDuration').html('00:00:00');
	$('.callinfo').show();
	$('.callScreen').show();
	$('.inboundBeforeAnswer').show();
	$('#makecall').hide();
}
function onIncomingCallCanceled(){
	console.info('onIncomingCallCanceled');
	callOff();
}

function onCallFailed(reason){
	console.info('onCallFailed',reason);
	callOff();
}

function onCallAnswered(){
	console.info('onCallAnswered');
	timer = 0;
	window.calltimer = setInterval(function(){
		timer = timer +1;
		$('.incall-time').html(timer.toString().calltimer());
	},1000);
}

function onCallTerminated(){
	console.info('onCallTerminated');
	callOff();
}
function onCalling(){	
	console.info('onCalling');
}
function callOff(){
	vistaLlamada.style.display = "none";
	window.calltimer? clearInterval(window.calltimer) : false;
	callStorage.dur = timer.toString().calltimer();
	if(timer == "00:00:00" && callStorage.mode == "in"){
		callStorage.mode = "missed";
	}
	callStorage={}; // reset callStorage
	timer = "00:00:00"; //reset the timer
}

function onIncomingCall(callerName, extraHeaders){
	console.info(callerName, extraHeaders);
	callStorage.startTime = date();
	callStorage.mode = 'in';
	callStorage.num = callerName;

    //document.getElementsByClassName('call-ext-name')[0].textContent = callerName;
    vistaLlamada.style.display = "block";
    btnsEntrante.style.display = "block";
    btnsEstablecida.style.display = "none";
	console.info('Callernameasd', callerName)
	$('.incall-time').html('00:00:00');
}

function onMediaPermission(evt){
	console.info('onMediaPermission',evt);
	if(evt.error){
		customAlert('Media permission error',evt.error);
	}
}

function login(username, password) {
    if(username && password){	
        plivoBrowserSdk.client.login(username, password);
    }else{
        console.error('username/password missing!')
    }
}

$('#btnCallPlivo').click(function(e){
	var to = "elias205381993365534180", 
		extraHeaders;
	// Prevent click on makecall disabled button	
	/* var callEnabled = $('#makecall').attr('class').match('disabled'); */
	if(!to || !plivoBrowserSdk){return};
	plivoBrowserSdk.client.call(to,extraHeaders);	
	console.info('Click make call : ',to);
	callStorage.mode = "out";
	callStorage.startTime = date();
	callStorage.num = to;
	btnsEntrante.style.display = "none";
            btnsEstablecida.style.display = "block";
            vistaLlamada.style.display = "block";
	$('.incall-time').html('00:00:00');
});

$('#btnAccept').click(function(){
	alert("accepted")
	console.info('Call accept clicked');
    btnsEntrante.style.display = "none";
    btnsEstablecida.style.display = "block";
	plivoBrowserSdk.client.answer();
});
$('#btnReject').click(function(){
	console.info('callReject');
	plivoBrowserSdk.client.reject();
});

$('#btnHangUp').click(function(){
	console.info('Hangup');
	if(plivoBrowserSdk.client.callSession){
		plivoBrowserSdk.client.hangup();
	}else{
		callOff();
	}
});

btnMute.addEventListener('click',()=>{
    if(btnMute.classList.contains('button-on')){
        btnMute.classList.remove('button-on');
        btnMute.classList.add('button-off');
        plivoBrowserSdk.client.mute();
    }else{
        btnMute.classList.add('button-on');
        btnMute.classList.remove('button-off');
        plivoBrowserSdk.client.unmute();
    }
})

$('#btnLoginPlivo').click(function(e){
	var userName = "conserjeria7585159674114441355431"
	var password = "Social1650way"
	login(userName, password);
});

var plivoBrowserSdk; // this will be retrived from settings in UI

function initPhone(username, password){
	/* var options = refreshSettings();*/
	plivoBrowserSdk = new window.Plivo(); 
	/* plivoBrowserSdk.client.on('onWebrtcNotSupported', onWebrtcNotSupported); */
	plivoBrowserSdk.client.on('onLogin', onLogin);
	/* plivoBrowserSdk.client.on('onLogout', onLogout); */
	plivoBrowserSdk.client.on('onLoginFailed', onLoginFailed);
	/* plivoBrowserSdk.client.on('onCallRemoteRinging', onCallRemoteRinging); */
	plivoBrowserSdk.client.on('onIncomingCallCanceled', onIncomingCallCanceled);
	plivoBrowserSdk.client.on('onCallFailed', onCallFailed);
	plivoBrowserSdk.client.on('onCallAnswered', onCallAnswered);
	plivoBrowserSdk.client.on('onCallTerminated', onCallTerminated);
	plivoBrowserSdk.client.on('onCalling', onCalling);
	plivoBrowserSdk.client.on('onIncomingCall', onIncomingCall);
	plivoBrowserSdk.client.on('onMediaPermission', onMediaPermission);
	/* plivoBrowserSdk.client.on('mediaMetrics',mediaMetrics); */
	plivoBrowserSdk.client.setRingTone(true);
	plivoBrowserSdk.client.setRingToneBack(true);
	/** Handle browser issues
	* Sound devices won't work in firefox
	*/
	/* checkBrowserComplaince(plivoBrowserSdk.client);	 */
	/* updateAudioDevices(); */
	console.log('initPhone ready!')
}
