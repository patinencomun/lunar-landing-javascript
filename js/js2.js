var audioElement = document.createElement('audio');

window.onload = function(){
	audioElement.setAttribute('src', 'sound/8-bit-Arcade4.mp3');
	audioElement.setAttribute('autoplay', 'autoplay');
	audioElement.setAttribute('loop', 'loop');
	
	document.getElementById('musicOn').onclick = function(){
		musicOff();
	};
	document.getElementById('musicOff').onclick = function(){
		musicOn();
	};
}

function musicOn(){
	audioElement.play();
	document.getElementById('musicOff').style.display = 'none';
	document.getElementById('musicOn').style.display = 'block';
}

function musicOff(){
	audioElement.pause();
	document.getElementById('musicOn').style.display = 'none';
	document.getElementById('musicOff').style.display = 'block';
}
