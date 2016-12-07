var canvas = document.getElementById("canvas");
var ctx =  canvas.getContext('2d');
var circulos = [];
var qus = [];
var qds = [];

function aletorio(min, max){
	return Math.floor((Math.random() * (max - min)) + min);
}

function iniciar(){
	for(i=0; i<10; i++){
		qus.push(new QuarkArriba(aletorio(0,canvas.width),aletorio(0,canvas.height),5,'#0F0', aletorio(-5,5), aletorio(-5,5)));
		qds.push(new QuarkArriba(aletorio(0,canvas.width),aletorio(0,canvas.height),5,'yellow', aletorio(-5,5), aletorio(-5,5)));
	}

	setInterval(fisicas, 1000/12);	
}

function fisicas(){
	ctx.fillStyle = "black";
	ctx.fillRect(0,0,canvas.width,canvas.height);
	
	for(i=0; i<qus.length; i++){
		qus[i].pintar(ctx);
		qus[i].mover();

		if(qus[i].limites(canvas)){
			qus.splice(i,1);
			qus.push(new QuarkArriba(aletorio(0,canvas.width),aletorio(0,canvas.height),5,'#0F0', aletorio(-5,5), aletorio(-5,5)));
		}
	}
	for(i=0; i<qds.length; i++){
		qds[i].pintar(ctx);
		qds[i].mover();

		if(qds[i].limites(canvas)){
			qds.splice(i,1);
			qds.push(new QuarkAbajo(aletorio(0,canvas.width),aletorio(0,canvas.height),5,'yellow', aletorio(-5,5), aletorio(-5,5)));
		}
	}
}

//Definicion de clases
var Circulo = function (x, y, radio, color, desx, desy){
	this.x = x;
	this.y = y;
	this.radio = radio;
	this.color = color;
	this.desx = desx;
	this.desy = desy;
}

Circulo.prototype.pintar = function(ctx){
	ctx.beginPath();
	ctx.fillStyle = this.color;
	ctx.arc(this.x, this.y, this.radio, 0, 2 * Math.PI, false);
	ctx.stroke();
	ctx.fill();
};

Circulo.prototype.mover = function(){
	this.x += this.desx;
	this.y += this.desy;
};

Circulo.prototype.limites = function(canvas){
	var eliminar = false;
	if(this.x < 0){ eliminar = true;}
	else if(this.x > canvas.width){ eliminar = true; }
	else if(this.y < 0){ eliminar = true; }
	else if(this.y > canvas.height){ eliminar = true; }

	return eliminar;
};


function QuarkArriba(x, y, radio, color, desx, desy) {
	 Circulo.call(this, x, y, radio, color, desx, desy);
}

QuarkArriba.prototype = Object.create(Circulo.prototype);
QuarkArriba.prototype.constructor = QuarkArriba;

function QuarkAbajo(x, y, radio, color, desx, desy) {
	 Circulo.call(this, x, y, radio, color, desx, desy);
}

QuarkAbajo.prototype = Object.create(Circulo.prototype);
QuarkAbajo.prototype.constructor = QuarkAbajo;

var Paricula = function(){
}

iniciar();






