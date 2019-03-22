var myVectorBox= {
    numberOfVectors: 0,
    index: 0,
    init: function () {
        this.ClearVectorBoxes(this.numberOfVectors);
        var number = document.getElementById("numberOfVectors");
        this.numberOfVectors = number.value;
        this.CreateVectorInputBox(this.numberOfVectors);
    },
    CreateVectorInputBox: function (index) {
        var vectorBox = document.getElementById("vectorBox");
        
        for (var i = 0; i < index; i++){
            var columnBox = document.createElement("div");
            var elementX = document.createElement("input");
            var elementY = document.createElement("input");
            var label = document.createElement("div");
            var magnitude = document.createElement("div");
            var angle = document.createElement("div");
            var labelText = document.createTextNode("Vector" +(i+1)+":");
            var magnitudeText = document.createTextNode("Magnitude:");
            var angleText = document.createTextNode("Angle:");
            var linebreak = document.createElement("br");
            var linebreak2 = document.createElement("br");
            var red = Math.floor(Math.random() * 256);
            var green = Math.floor(Math.random() * 256);
            var blue = Math.floor(Math.random() * 256);
            var colorRGB = "rgb(" + red + "," + green + "," + blue + ")";
            var brightness = this.ColorBrightness(red, green, blue);
            var textColor;
            if (brightness > 123){
                textColor = "black";
            }
            else {
                textColor = "white";
            }
            columnBox.id = "vectorBoxColumn-" + i;
            columnBox.className = "vectorbox-column";
            columnBox.style.background = colorRGB;
            elementX.type = "number";
            elementX.id = "Magnitude-" + i;
            elementX.style = "width:40px";
            elementY.type = "number";
            elementY.id = "Angle-" + i;
            elementY.style = "width:40px";
            label.id = "Label-" + i;
            label.style.color = textColor;
            magnitude.setAttribute("style", "color:" + textColor);
            angle.setAttribute("style", "color:" + textColor);
            label.appendChild(labelText);
            magnitude.appendChild(magnitudeText);
            angle.appendChild(angleText);
            columnBox.appendChild(label);
            columnBox.appendChild(linebreak);
            columnBox.appendChild(magnitude);
            columnBox.appendChild(elementX);
            columnBox.appendChild(linebreak2);
            columnBox.appendChild(angle);
            columnBox.appendChild(elementY);
            vectorBox.appendChild(columnBox);
        }
    },
    CreateResultantBox: function (index, x, y, degree) {
        resultantBox = document.getElementById("ResultantBox");
        if (resultantBox) {
            resultantBox.parentNode.removeChild(resultantBox);
        }
        var vectorBox = document.getElementById("vectorBox");
        var columnBox = document.createElement("div");
        var label = document.createElement("div");
        var magnitude = document.createElement("div");
        var angle = document.createElement("div");
        var magnitudeValue = Math.round(Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2)) * 100000) / 100000;
        var magnitudeText = document.createTextNode("Magnitude: " + magnitudeValue);
        var degreeValue = Math.round(degree * 100000) / 100000;
        var angleText = document.createTextNode("Angle: " + degreeValue);
        var valueX = Math.round(x * 100000) / 100000;
        var valueY = Math.round(y * 100000) / 100000;
        var linebreak = document.createElement("br");
        var linebreak2 = document.createElement("br");
        var labelText = document.createTextNode("Vector" + index + ": (" + valueX + "," + valueY + ")");
        columnBox.id = "ResultantBox";
        columnBox.className = "vectorbox-column";
        columnBox.style.background = "black";
        label.setAttribute("style", "color:white" );
        magnitude.setAttribute("style", "color:white");
        angle.setAttribute("style", "color:white");
        label.appendChild(labelText);
        magnitude.appendChild(magnitudeText);
        angle.appendChild(angleText);
        columnBox.appendChild(label);
        columnBox.appendChild(linebreak);
        columnBox.appendChild(magnitude);
        columnBox.appendChild(linebreak2);
        columnBox.appendChild(angle);
        vectorBox.appendChild(columnBox);
    },
    ClearVectorBoxes: function (number) {
        for (var i = 0; i < number; i++) {
            var vectorBoxColumn = document.getElementById("vectorBoxColumn-" + i);
            vectorBoxColumn.parentNode.removeChild(vectorBoxColumn);
        }
        resultantBox = document.getElementById("ResultantBox");
        if (resultantBox) {
            resultantBox.parentNode.removeChild(resultantBox);
        }
        
    },
    ColorBrightness: function (r, g, b) {
        return (r * 299 + g * 587 + b * 114) / 1000;
    }

};
