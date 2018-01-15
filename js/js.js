//ENTORNO
var g = 1.622;
var dt = 0.016683;
var timer=null;
var timerFuel=null;
//NAVE
var y = 10; // altura inicial y0=10%, debe leerse al iniciar si queremos que tenga alturas diferentes dependiendo del dispositivo
var v = 0;
var c = 100;
var a = g; //la aceleración cambia cuando se enciende el motor de a=g a a=-g (simplificado)
var aterrizado = false;
//MARCADORES
var velocidad = null;
var altura = null;
var combustible = null;
var combustiblemvl = null;
var maxv = null;
var mvl = false;
var nave = null;
//al cargar por completo la página...
window.onload = function(){
	
	velocidad = document.getElementById("velocidad");
	altura = document.getElementById("altura");
	combustible = document.getElementById("panelMovimientoBateria");
	combustiblemvl = document.getElementById("panelMovimientoBateriaMvl");
	nave = document.getElementById("nave");

	
	//definición de eventos
	//BOTONES EVENTOS

	document.getElementById("acercaDe").onclick = function(){
		cambiarPagAbout();
	}
	document.getElementById("mvlReiniciar").onclick = function(){
		resetMvl();
	}
	document.getElementById("botonMvl").onclick = function(){
		document.getElementsByClassName("botonesMvl");
		document.getElementById("botonMvl");
		document.getElementById("botonPlayMvl");
		mostrarBotones();
	}
	document.getElementById("botonPlayMvl").onclick = function(){
		resumeMvl();
	}
	document.getElementsByClassName("botonesMvl")[0].onclick = function(){
		instruccionesMvl();
	}
	document.getElementsByClassName("botonesMvl")[1].onclick = function(){
		resetMvl();
	}
	document.getElementsByClassName("botones")[0].onclick = function(){
		document.getElementById("instrucciones").style.display = "fixed";
		instrucciones();
	}
	document.getElementsByClassName("botones")[1].onclick = function(){
		reset();
	}
	document.getElementsByClassName("botones")[2].onclick = function(){
		pause();
	}
	document.getElementById("botonPlay").onclick = function(){
		resume();
	}
	//encender/apagar el motor al hacer click en la pantalla
	document.getElementById("botonGasMvl").onclick = function (){
 	  if (a==g){
  		motorOn();
 	  } else {
  		motorOff();
 	  }
	}
	//encender/apagar al apretar/soltar espacio
	window.onkeydown=function(e) {
		var espacio;
		if (window.event){
			espacio = window.event.keyCode;
		}
		else if (e){
			espacio = e.which;
		}
		if (espacio==32){
			motorOn();
		}
	}
	window.onkeyup=motorOff;
	//Empezar a mover la nave justo después de cargar la página
	start();
}

//Definición de funciones
function start(){
	//cada intervalo de tiempo mueve la nave
	timer=setInterval(function(){ moverNave(); }, dt*1000);
	if (!aterrizado) document.getElementById("nave").style.display = "block";
}

function stop(){
	clearInterval(timer);
}

function moverNave(){
	if (v > 0){
		maxv = v;
	}else{
		maxv = -v;
	}
	//cambiar velocidad y posicion
	v +=a*dt;
	y +=v*dt;
	//actualizar marcadores
	velocidad.innerHTML=maxv.toFixed(2);
	altura.innerHTML=(72.5 - y).toFixed(2);
	if (v > 5){
		velocidad.style.color = "#FE0101";
	} else {
		velocidad.style.color = "black";
	}
	//mover hasta que top sea un 70% de la pantalla
	if (y<72.5){ 
		nave.style.top = y+"%";
		if (y < 0){
			y = 0.1;
			v = 0;
		}
	} else { 
		aterrizado = true;
		motorOff();
		stop();
		altura.innerHTML=0.00.toFixed(2);
		document.getElementById("final").style.display = "block";
		if (v>5){
			for(var i = 0; i < 2; i++){
				document.getElementsByClassName("finalE")[i].style.display = "none";
				document.getElementsByClassName("finalE")[i+2].style.display = "block";
				document.getElementById("nave").style.display =  "none";
				document.getElementById("naveBlowUp").style.display = "block";
				setTimeout("hideBlowUp()",0800);
			}
		} else {
			for(var i = 2; i < 4; i++){
				document.getElementsByClassName("finalE")[i].style.display = "none";
				document.getElementsByClassName("finalE")[i-2].style.display = "block";
			}
		}
	}
}
function hideBlowUp(){
	document.getElementById("naveBlowUp").style.display = "none";
}
function motorOn(){	
	if(!aterrizado){
		//el motor da aceleración a la nave
		a=-g;
		//mientras el motor esté activado gasta combustible
		if (timerFuel==null){
		document.getElementById("imgNave").src = "img/nave2.gif";
		timerFuel=setInterval(function(){ actualizarFuel(); }, 10);
		}
	} else {
		motorOff();
	}
}
function motorOff(){
	document.getElementById("imgNave").src = "img/nave1.jpg";
	a=g;
	clearInterval(timerFuel);
	timerFuel=null;
}
function actualizarFuel(){
	//Restamos combustible hasta que se agota
	c-=0.1;
	if (c < 0 ){
		c = 0;
		aterrizado = true;
	}
	combustible.style.width = c+"%";
	combustiblemvl.style.height = c+"%";
}
function reset(){
	stop();
	g = 1.622;
	dt = 0.016683;
	timer=null;
	timerFuel=null;
	y = 10; // altura inicial y0=10%, debe leerse al iniciar si queremos que tenga alturas diferentes dependiendo del dispositivo
	v = 0;
	c = 100;
	a = g; //la aceleración cambia cuando se enciende el motor de a=g a a=-g (simplificado)
	maxv = v;
	aterrizado = false;
	document.getElementById("nave").style.top = y+"%";
	document.getElementById("final").style.display = "none";
	document.getElementById("instrucciones").style.display = "none";
	document.getElementById("botonPlay").style.display = "none";
	document.getElementsByClassName("botones")[2].style.display = "inline-block";
	combustible.style.width = c+"%";
	combustiblemvl.style.height = c+"%";
	altura.innerHTML=y.toFixed(2);
	velocidad.innerHTML=maxv.toFixed(2);
	start();
}
function pause(){
	if (!aterrizado){
		stop();
		document.getElementsByClassName("botones")[2].style.display = "none";
		document.getElementById("botonPlay").style.display = "inline-block";
	}
	aterrizado = true;
}
function resume(){
	aterrizado = false;
	if (!aterrizado){
		start();
		document.getElementsByClassName("botones")[2].style.display = "inline-block";
		document.getElementById("botonPlay").style.display = "none";
		document.getElementById("instrucciones").style.display ="none";
	}
}
function instrucciones(){
	stop();
	pause();
	document.getElementById("instrucciones").style.display = "inline-block";
}
function mostrarBotones(){
	if (!aterrizado){
		stop();
		motorOff();
		for(var i = 0; i < 2; i++){
			document.getElementsByClassName("botonesMvl")[i].style.display = "inline-block";
		}
		document.getElementById("botonPlayMvl").style.display = "inline-block";
		aterrizado = true;
	} else {
		/*document.getElementById("instrucciones").style.display = "none";
		start();
		for(var i = 0; i < 2; i++){
			document.getElementsByClassName("botonesMvl")[i].style.display = "none";			
		}
		document.getElementById("botonPlayMvl").style.display = "none";
		aterrizado = false;*/
		resumeMvl();
	}
}
function resetMvl(){
	motorOff();
	stop();
	g = 1.622;
	dt = 0.016683;
	timer=null;
	timerFuel=null;
	y = 10; // altura inicial y0=10%, debe leerse al iniciar si queremos que tenga alturas diferentes dependiendo del dispositivo
	v = 0;
	c = 100;
	a = g; //la aceleración cambia cuando se enciende el motor de a=g a a=-g (simplificado)
	maxv = v;
	aterrizado = false;
	document.getElementById("nave").style.top = y+"%";
	document.getElementById("final").style.display = "none";
	document.getElementById("instrucciones").style.display = "none";
	document.getElementById("botonPlayMvl").style.display = "none";
	combustible.style.width = c+"%";
	combustiblemvl.style.height = c+"%";
	altura.innerHTML=y.toFixed(2);
	velocidad.innerHTML=maxv.toFixed(2);
	for(var i = 0; i < 2; i++){
			document.getElementsByClassName("botonesMvl")[i].style.display = "none";
		}
	aterrizado = false;
	start();
}
function resumeMvl(){
	aterrizado = false;
	if (!aterrizado){
		for(var i = 0; i < 2; i++){
			document.getElementsByClassName("botonesMvl")[i].style.display = "none";			
		}
		document.getElementById("botonPlayMvl").style.display = "none";
		document.getElementById("instrucciones").style.display = "none";
		start();
	}
}
function instruccionesMvl(){
	stop();
	document.getElementById("instrucciones").style.display = "inline-block";
	aterrizado = true;
}
function cambiarPagAbout(){
	location.href="acercaDe.html";
}