var c2 = document.getElementById("myCanvas2");
var ctx = c2.getContext("2d");
ctx.fillStyle="#000000";
ctx.fillRect(0, 0, 1000, 1000);
var Direction = [0,1,2,3];
var oppsiteDirection = [2,3,0,1];
var beginX=500;
var beginY=500;
var finalX=0;
var finalY=0;
var n=0;
var stepX=20;
var stepY=20;
var deltaX=0;
var delatY=0;
var finaldeltaX=0;
var finaldeltaY=0;
var alldeltaX=[0];
var alldeltaY=[0];

var walkedXsize=Math.floor(1000/stepX);
var walkedYsize=Math.floor(1000/stepY);


function createMatrix(w,h){
		var walkedmatrix=[];
		while(h--){
		
		walkedmatrix.push(new Array(w).fill(0));
		}
	return walkedmatrix;
	
	}

var walked=createMatrix(walkedXsize,walkedYsize);
var Directionslice=Direction.slice();
var walkedDirection=[];
function setup(){
	outerloop:
	for (var i = 0; i <500; i++) {
		
		var randomdirectionInt=Directionslice[Math.floor(Math.random() * Directionslice.length)];  
		
		finaldeltaX+=Math.cos(Math.PI*randomdirectionInt/2);
		finaldeltaY+=Math.sin(Math.PI*randomdirectionInt/2);
		
		finaldeltaX=Math.round(finaldeltaX);
		finaldeltaY=Math.round(finaldeltaY);
		var j=0;
		while(j<alldeltaX.length)
		{
			if((finaldeltaX===alldeltaX[j])&&(finaldeltaY===alldeltaY[j])){
			finaldeltaX=deltaX;
			finaldeltaY=deltaY;
			var index2=Directionslice.indexOf(randomdirectionInt);
			Directionslice.splice(index2,1)		
			
			console.log(Directionslice);
			if(Directionslice.length==0)
			{
				j=alldeltaX.length;
				
				i=500;
				break outerloop;
				}
			
			randomdirectionInt=Directionslice[Math.floor(Math.random() * Directionslice.length)];
			finaldeltaX+=Math.cos(Math.PI*randomdirectionInt/2);
			finaldeltaY+=Math.sin(Math.PI*randomdirectionInt/2);
			finaldeltaX=Math.round(finaldeltaX);
			finaldeltaY=Math.round(finaldeltaY);
			j=0;
			}
			j++;
		}
		walkedDirection.push(randomdirectionInt);
		alldeltaX.push(finaldeltaX);
		alldeltaY.push(finaldeltaY);
		//console.log(walkedDirection[i]);
		//console.log("x:"+finaldeltaX);
		//console.log("y:"+finaldeltaY);
		Directionslice=oppsiteDirection.slice();
		var index=Direction.indexOf(randomdirectionInt);
		Directionslice.splice(index,1)		
		deltaX=finaldeltaX;
		deltaY=finaldeltaY;
	}
}


function drawline(beginX,beginY,finalX,finalY){

ctx.beginPath();
ctx.moveTo(beginX, beginY);
ctx.lineTo(finalX, finalY);
ctx.strokeStyle = '#ff0000';
ctx.stroke();
}




function update3(){
		finalX=beginX+stepX*Math.cos(Math.PI*walkedDirection[n]/2);
		finalY=beginY-stepY*Math.sin(Math.PI*walkedDirection[n]/2);
		drawline(beginX,beginY,finalX,finalY);
		beginX=finalX;
		beginY=finalY;
		if(n<walkedDirection.length-1){
			n++;
			requestAnimationFrame(update3);
		}

}


function init2(){
setup();
requestAnimationFrame(update3);
}

function clearline() {
    var c2 = document.getElementById("myCanvas2");
    var ctx = c2.getContext("2d");
    ctx.clearRect(0, 0, 1000, 1000);
	ctx.fillStyle="#000000";
	ctx.fillRect(0, 0, 1000, 1000);
	var elem = document.getElementById("drawline");
	if(elem)
    elem.parentNode.removeChild(elem);
	Direction = [0,1,2,3];
	oppsiteDirection = [2,3,0,1];
	beginX=500;
	beginY=500;
	finalX=0;
	finalY=0;
	n=0;
	deltaX=0;
	delatY=0;
	finaldeltaX=0;
	finaldeltaY=0;
	alldeltaX=[0];
	alldeltaY=[0];
	walked=createMatrix(walkedXsize,walkedYsize);
	Directionslice=Direction.slice();
	walkedDirection=[];
	init2();
}

