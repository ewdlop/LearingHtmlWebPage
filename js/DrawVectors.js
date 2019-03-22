var myDrawVectorCanvas = document.getElementById("myDrawVectorCanvas");
var myDrawVectorContext = myDrawVectorCanvas.getContext("2d"); 
var inputWidth;
var inputHeight;
var dataX;
var dataY;
var dataXInit;
var dataYInit;
var index;
var number;

function init() {

    number = document.getElementById("numberOfVectors");
    index = 0;
    myDrawVectorContext.clearRect(0, 0, window.screen.availWidth*0.79, window.screen.availHeight*0.79);
    myDrawVectorCanvas.width = window.screen.availWidth * 0.79;
    myDrawVectorCanvas.height = window.screen.availHeight * 0.79;
    dataXInit = 0;
    dataYInit = 0;
    inputWidth = document.getElementById("width");
    inputHeight = document.getElementById("height");
    myDrawVectorContext.fillStyle = "#FFFFFF";
    myDrawVectorContext.fillRect(0, 0, window.screen.availWidth * 0.79, window.screen.availHeight * 0.79);
    myDrawVectorContext.strokeStyle = "#000000";
    myDrawVectorContext.setLineDash([myDrawVectorCanvas.width / 81, myDrawVectorCanvas.width / 81]);
    myDrawVectorContext.beginPath();
    myDrawVectorContext.moveTo(0, myDrawVectorCanvas.height / 2);
    myDrawVectorContext.lineTo(myDrawVectorCanvas.width, myDrawVectorCanvas.height / 2);
    myDrawVectorContext.stroke();
    myDrawVectorContext.beginPath();
    myDrawVectorContext.strokeStyle = "#000000";
    myDrawVectorContext.setLineDash([myDrawVectorCanvas.height / 81, myDrawVectorCanvas.height / 81]);
    myDrawVectorContext.moveTo(myDrawVectorCanvas.width / 2, 0);
    myDrawVectorContext.lineTo(myDrawVectorCanvas.width/2, myDrawVectorCanvas.height);
    myDrawVectorContext.stroke();
    myDrawVectorContext.setLineDash([]);
    //calculateDataY();
    animFrame();
}

function calculateDataY() {
    for (var i = 0; i < dataX.length; i++) {
        dataY[i] = myDrawVectorCanvas.height - 5 * dataX[i];
    }
}

function animFrame() {
    if (index < number.value) {
        requestAnimationFrame(animFrame, myDrawVectorCanvas);
        //drawLinePlot();
        drawVector();
        index += 1;
        //drawDataPoint();
        
    }
    else {
        /*index = 0;
        myDrawVectorContext.clearRect(0, 0, myDrawVectorCanvas.width, myDrawVectorCanvas.height);
        myDrawVectorContext.fillStyle = "#000000";
        myDrawVectorContext.fillRect(0, 0, myDrawVectorCanvas.width, myDrawVectorCanvas.height);
        requestAnimationFrame(animFrame, myDrawVectorCanvas);*/

    }
}    


function drawLinePlot() {
    myDrawVectorContext.strokeStyle = "#FF0000";
    myDrawVectorContext.beginPath();
    myDrawVectorContext.moveTo(dataX[index-1], dataY[index-1]);
    myDrawVectorContext.lineTo(dataX[index], dataY[index]);
    myDrawVectorContext.stroke();
}

function drawDataPoint() {
    var magnitude;
    var angle;
    myDrawVectorContext.fillStyle = "#FFFFFF";
    myDrawVectorContext.fillRect(dataX[index] - 2, dataY[index] - 2, 3, 2);
}
function drawVector() {
    var magnitude;
    var angle;
    var deltaX;
    var deltaY;
    var dataXFinal;
    var dataYFinal;
    magnitude= document.getElementById("Magnitude-"+index);
    angle = document.getElementById("Angle-" + index);
    if (magnitude && magnitude.value) {
        deltaX = magnitude.value * Math.cos(Deg2Rad(angle.value));
        deltaY = magnitude.value * Math.sin(Deg2Rad(angle.value));
        dataXFinal = dataXInit + deltaX;
        dataYFinal = dataYInit + deltaY;
        var direction = DirectionOfVector(deltaX, deltaY);
        var vectorBoxColumn = document.getElementById("vectorBoxColumn-" + index);
        var colorHex = vectorBoxColumn.style.background;
        myDrawVectorContext.lineWidth = 5;
        myDrawVectorContext.strokeStyle = colorHex;
        myDrawVectorContext.beginPath();
        myDrawVectorContext.moveTo(PointXtomyDrawVectorCanvasX(dataXInit), PointYtomyDrawVectorCanvasY(dataYInit));
        myDrawVectorContext.lineTo(PointXtomyDrawVectorCanvasX(dataXFinal), PointYtomyDrawVectorCanvasY(dataYFinal));
        myDrawVectorContext.moveTo(PointXtomyDrawVectorCanvasX(dataXFinal), PointYtomyDrawVectorCanvasY(dataYFinal));
        myDrawVectorContext.lineTo(PointXtomyDrawVectorCanvasX(dataXFinal) + myDrawVectorCanvas.width / 50 * Math.cos(direction + 11 * Math.PI / 12), PointYtomyDrawVectorCanvasY(dataYFinal) - myDrawVectorCanvas.height / 50 * Math.sin(direction + 11 * Math.PI / 12));
        myDrawVectorContext.moveTo(PointXtomyDrawVectorCanvasX(dataXFinal), PointYtomyDrawVectorCanvasY(dataYFinal));
        myDrawVectorContext.lineTo(PointXtomyDrawVectorCanvasX(dataXFinal) + myDrawVectorCanvas.width / 50 * Math.cos(direction - 11 * Math.PI / 12), PointYtomyDrawVectorCanvasY(dataYFinal) - myDrawVectorCanvas.height / 50 * Math.sin(direction - 11 * Math.PI / 12));
        myDrawVectorContext.stroke();
        var labelText = document.getElementById("Label-" + index);
        var valueX = Math.round(deltaX * 100000) / 100000;
        var valueY = Math.round(deltaY * 100000) / 100000;
        labelText.textContent ="Vector"+index+": ("+ valueX + "," + valueY + ")";
        if (index === number.value - 1) {
            myDrawVectorContext.lineWidth = 5;
            myDrawVectorContext.strokeStyle = "#000000";
            myDrawVectorContext.beginPath();
            myDrawVectorContext.moveTo(myDrawVectorCanvas.width / 2, myDrawVectorCanvas.height / 2);
            myDrawVectorContext.lineTo(PointXtomyDrawVectorCanvasX(dataXFinal), PointYtomyDrawVectorCanvasY(dataYFinal));
            var directionFinal = DirectionOfVector(dataXFinal, dataYFinal);
            myDrawVectorContext.moveTo(PointXtomyDrawVectorCanvasX(dataXFinal), PointYtomyDrawVectorCanvasY(dataYFinal));
            myDrawVectorContext.lineTo(PointXtomyDrawVectorCanvasX(dataXFinal) + myDrawVectorCanvas.width / 50 * Math.cos(directionFinal + 11 * Math.PI / 12), PointYtomyDrawVectorCanvasY(dataYFinal) - myDrawVectorCanvas.height / 50 * Math.sin(directionFinal + 11 * Math.PI / 12));
            myDrawVectorContext.moveTo(PointXtomyDrawVectorCanvasX(dataXFinal), PointYtomyDrawVectorCanvasY(dataYFinal));
            myDrawVectorContext.lineTo(PointXtomyDrawVectorCanvasX(dataXFinal) + myDrawVectorCanvas.width / 50 * Math.cos(directionFinal - 11 * Math.PI / 12), PointYtomyDrawVectorCanvasY(dataYFinal) - myDrawVectorCanvas.height / 50 * Math.sin(directionFinal - 11 * Math.PI / 12));
            myDrawVectorContext.stroke();
            myVectorBox.CreateResultantBox(index + 2, dataXFinal, dataYFinal, Rad2Deg(directionFinal));

        }
        dataXInit = dataXFinal;
        dataYInit = dataYFinal;
    }
}

function Deg2Rad(angle) {
    return angle * Math.PI / 180;
}
function Rad2Deg(radian) {
    return radian * 180 / Math.PI;
}

function directionOfVectorFromPoint1toPoint2(x1, x2, y1, y2) {
    return Math.atan2(y2 - y1, x2 - x1);
}
function DirectionOfVector(x,y) {
    return Math.atan2(y,x);
}

function PointXtomyDrawVectorCanvasX(x) {
    return x * myDrawVectorCanvas.width / (2 * inputWidth.value) + myDrawVectorCanvas.width/2;
}

function PointYtomyDrawVectorCanvasY(y) {
    //return -1*y * myDrawVectorCanvas.height / (2 * inputHeight.value)-myDrawVectorCanvas.height / 2 +myDrawVectorCanvas.height;
    return -1 * y * myDrawVectorCanvas.height / (2 * inputWidth.value) - myDrawVectorCanvas.height / 2 + myDrawVectorCanvas.height;
}