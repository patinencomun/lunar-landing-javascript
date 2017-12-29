//ENTORNO
var g = 4.622;
var dt = 0.016683;
var timer=null;
var timerFuel=null;

var pause = false;
var juegoEmpezado = false;

//NAVE
var y = 5; // altura inicial y0=10%, debe leerse al iniciar si queremos que tenga alturas diferentes dependiendo del dispositivo
var v = 0;
var c = 100;
var a = g; //la aceleración cambia cuando se enciende el motor de a=g a a=-g (simplificado)
var vAterrizaje; //velocidad de aterrizaje
var nave=1; //Identificador de los modelos de naves
var motorON=false;
var aterrizado = false; 
var sinCombustible = false; 

//MARCADORES
var velocidad = null;
var altura = null;
var combustible = null;

//al cargar por completo la página...
window.onload = function(){	
	
	
	
	velocidad = document.getElementById("velocidad");
	altura = document.getElementById("altura");
	combustible = document.getElementById("fuel");
		
	//botón MENU
	document.getElementById("showm").onclick = function (){
		if (juegoEmpezado && aterrizado == false){
			if (pause){
				reanudarJuego();
			}else{
				pausarJuego();
			}
		}
	}
	
	//botón VOLVER AL JUEGO del menú
	document.getElementById("hidem").onclick = function (){
		reanudarJuego();
	}
	
	//botón CAMBIAR DE NAVE
	//siempre se puede cambiar de nave menos cuando se ha aterrizado
	document.getElementById('cambiarNave').onclick = function() {
		if (aterrizado == false){
			cambiarNave();
		}
	}	
	
	//MOTOR
	//botón POWER (encender/apagar el motor)
	document.getElementById('power').onclick = function () {
		botonPower ();
	}	
	//teclado
	document.onkeydown = function (e){ //tecla ESPACIO 
		if (e.keyCode==32){
			teclaEspacioPulsada ();
		}
	}	
	document.onkeyup = motorOff;

	//EMPEZAR EL JUEGO
	document.getElementById('facil').onclick = function (){
		nivelFacil();
	}
	
	document.getElementById('dificil').onclick = function (){
		nivelDificil();
	}
	
}

//Definición de funciones

function nivelFacil (){
	document.getElementById('dificultad').style.display='none';
	juegoEmpezado = true;
	start();
}

function nivelDificil (){
	document.getElementById('dificultad').style.display='none';
	v=15;
	c=60;
	combustible.style.width="60%";
	juegoEmpezado = true;
	start();
}

function botonPower (){	
	//Enciende el motor si ha empezado el juego y no hemos aterrizado, y si hay combustible
	if (juegoEmpezado == true && pause == false && aterrizado == false && sinCombustible == false){
		if (a == g){
			motorOn();			
		}else {
			motorOff();
		}
	} 	
}

function pausarJuego(){
	document.getElementsByClassName("menu")[0].style.display = "block";
	stop();
	pause = true;
}

function reanudarJuego(){
	pause = false;
	document.getElementsByClassName("menu")[0].style.display = "none";
	start();
}

function teclaEspacioPulsada (){
	//El motor se enciende si ha empezado el juego y no hemos aterrizado, y si hay combustible	
	if (juegoEmpezado == true && pause == false && aterrizado == false && sinCombustible == false){
  		motorOn();
 	}
}

function cambiarNave(){
	if (nave<2){ //De momento sólo hay 2 modelos de nave
		nave++;
	}else{
		nave=1;
	}
	
	if (motorON){
		if (nave==1){
			document.getElementById('n').src='img/coheteFuego.png';
		}else{
			document.getElementById('n').src='img/cohete2Fuego.png';
		}
	}else{
		if (nave==1){
			document.getElementById('n').src='img/cohete.png';
		}else{
			document.getElementById('n').src='img/cohete2.png';
		}
	}
}

function start(){
	//cada intervalo de tiempo mueve la nave
	timer=setInterval(function(){ moverNave(); }, dt*1000);
}

function stop(){
	
	clearInterval(timer);
	
	//Al haber aterrizado la velocidad y altura se ponen a 0
	if (aterrizado){ //Sólo si ya hemos aterrizado, no cuando se despliega el menú
		velocidad.innerHTML=0;
		altura.innerHTML=0;
	}
}

function moverNave(){
	//cambiar velocidad y posicion
	v +=a*dt;
	y +=v*dt;
	//actualizar marcadores
	if (v<0) {  //si la velocidad es negativa pasarla a positiva en el marcador		
		velocidad.innerHTML=(-v).toFixed(1);
	}else{ 
		velocidad.innerHTML=v.toFixed(1);
	}
	altura.innerHTML=(70-y).toFixed(1);
	
	//mover hasta que top sea un 70% de la pantalla
	
	if (y<=0){ 	
		document.getElementById("nave").style.top = "0%";
		v=-v; //Evita que la nave se salga de la pantalla, rebotando...
	} else if(y<70&&y>=0) { 
		document.getElementById("nave").style.top = y+"%";
	} else { //NAVE ATERRIZADA
		aterrizado = true;
		clearInterval(timerFuel); //Deja de actualizar el marcador de combustible 
		if (nave==1){
			document.getElementById("n").src = "img/cohete.png"
		}else{
			document.getElementById("n").src = "img/cohete2.png"
		}
		document.getElementById('power').src = 'img/powerOFF.png'
		stop();
		finalJuego();
	}	
}

function motorOn(){	
	//Cambio el boton de POWER
	document.getElementById('power').src = 'img/powerON.png'
	
	//el motor da aceleración a la nave	
	if (aterrizado == false && c>0){ //Al acelerar sale fuego de la nave, pero sólo si queda combustible y no hemos aterrizado
		a=-g;
		motorON=true;
		if (nave==1){
			document.getElementById("n").src = "img/coheteFuego.png"
			//motorON=true;
		}else{
			document.getElementById("n").src = "img/cohete2Fuego.png"
			//motorON=true;
		}
	}else{ 
		motorOff();
	}
	
	//mientras el motor esté activado gasta combustible 
	if (aterrizado == false && timerFuel==null)
	timerFuel=setInterval(function(){ actualizarFuel(); }, 10);	
}

function motorOff(){
	a=g;
	clearInterval(timerFuel);
	timerFuel=null;
	motorON = false;
	//Cambio la imagen de la nave: sin fuego
	if (aterrizado == false) {
		if (nave==1){
			document.getElementById("n").src = "img/cohete.png"
		}else{
			document.getElementById("n").src = "img/cohete2.png"
		}
	}
	//Cambio el boton de POWER
	document.getElementById('power').src = 'img/powerOFF.png'
}

function actualizarFuel(){
	//Restamos combustible hasta que se agota
	
	if (c < 0 ) {
		sinCombustible = true;
		motorOff();
	}	
	if (pause == false) {
		c-=0.1;
		combustible.style.width=c+"%";
	}
}

function finalJuego(){
	if (v>5){
		document.getElementById('final2').style.display='block';
		document.getElementsByClassName('velFinal')[1].innerHTML=v.toFixed(1);
		if (nave==1){
			document.getElementById("n").src = "img/astronauta3.png"
		}else{
			document.getElementById("n").src = "img/astronauta2.png"
		}
	}else{
		document.getElementById('final1').style.display='block';
		document.getElementsByClassName('velFinal')[0].innerHTML=v.toFixed(1);
		document.getElementById('n').src = 'img/astronauta.png';
	}
}