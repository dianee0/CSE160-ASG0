// DrawRectangle.js
function main() {
  // Retrieve <canvas> element                                  <- (1)
  var canvas = document.getElementById('example');
  if (!canvas) {
    console.log('Failed to retrieve the <canvas> element');
    return;
  }

  // Get the rendering context for 2DCG                          <- (2)
  var ctx = canvas.getContext('2d');

  // Draw a black rectangle                                       <- (3)
  ctx.fillStyle = 'rgba(0, 0, 0, 1.0)'; // Set a black color
  ctx.fillRect(0, 0, 400, 400); // Fill a rectangle with the color


}
function handleDrawEvent(){
  // obtain the <canvas> element
  var canvas = document.getElementById('example');
  var ctx = canvas.getContext('2d') 

  // Clear rectangle
  ctx.clearRect(0, 0, 400, 400);
  ctx.fillStyle = 'rgba(0, 0, 0, 1.0)'; // Set a black color
  ctx.fillRect(0, 0, 400, 400); // Fill a rectangle with the color

  // assign x and y values to vector 1
  var v1x = document.getElementById("v1x").value;
  var v1y = document.getElementById("v1y").value;

  // check if the x and y values are valid
  if (isNaN(v1x) || isNaN(v1y)){
    console.log("invalid value.") // values were invalid
  } else {
    var v1 = new Vector3([v1x,v1y, 0]); // create vector1 with the given x and y values, and set z to 0
    drawVector(v1,"red")
  }

  // assign x and y values to vector 2
  var v2x = document.getElementById("v2x").value;
  var v2y = document.getElementById("v2y").value;

  // check if the x and y values are valid
  if (isNaN(v2x) || isNaN(v2y)){
    console.log("invalid value.") // values were invalid
  } else {
    var v2 = new Vector3([v2x,v2y, 0]); // create vector2 with the given x and y values, and set z to 0
    drawVector(v2,"blue")
  }
}

function handleDrawOperationEvent() {
  // obtain the <canvas> element
  var canvas = document.getElementById('example');
  var ctx = canvas.getContext('2d') 

  // Clear rectangle
  ctx.clearRect(0, 0, 400, 400);
  ctx.fillStyle = 'rgba(0, 0, 0, 1.0)'; // Set a black color
  ctx.fillRect(0, 0, 400, 400); // Fill a rectangle with the color

  // assign x and y values to vector 1
  let v1x = document.getElementById("v1x").value;
  let v1y = document.getElementById("v1y").value;
  // assign x and y values to vector 2
  let v2x = document.getElementById("v2x").value;
  let v2y = document.getElementById("v2y").value;

  var v1 = new Vector3([v1x,v1y, 0]); // create vector1 with the given x and y values, and set z to 0
  var v2 = new Vector3([v2x,v2y, 0]); // create vector2 with the given x and y values, and set z to 0

  drawVector(v1,"red")
  drawVector(v2,"blue")

  let operation = document.getElementById("op-dropdown").value;
  let scalar = document.getElementById("scalar").value;

  let v3;
  // console.log(operation[2].value);
    if (operation == "add"){
      v3 = new Vector3(v1.elements).add(v2);
      drawVector(v3, "green");
    } else if (operation == "sub"){
      v3 = new Vector3(v1.elements).sub(v2);
      drawVector(v3, "green");
    } else if (operation == "div"){
      v3 = new Vector3(v1.elements).div(scalar);
      v4 = new Vector3(v2.elements).div(scalar);
      drawVector(v3, "green");
      drawVector(v4, "green");
    } else if (operation == "mult"){
      v3 = new Vector3(v1.elements).mul(scalar);
      v4 = new Vector3(v2.elements).mul(scalar);
      drawVector(v3, "green");
      drawVector(v4, "green");
    } else if (operation == "magnitude"){
      magV1 = new Vector3(v1.elements).magnitude();
      magV2 = new Vector3(v2.elements).magnitude();
      console.log("Magnitude v1: " + magV1)
      console.log("Magnitude v2: " + magV2)
    } else if (operation == "normalize"){
      normV1 = new Vector3(v1.elements).normalize();
      normV2 = new Vector3(v2.elements).normalize();
      drawVector(normV1, "green");
      drawVector(normV2, "green");
    } else if (operation == "angle"){
      angleBetween(v1,v2);
    } else if (operation == "area"){
      areaTriangle(v1,v2);
    }

}

function angleBetween(v1,v2){
  // Compute the dot product for v1 and v2
  let dotProd = Vector3.dot(v1, v2);
  // Obtain the magnitudes for v1 and v2
  let magV1 = v1.magnitude();
  let magV2 = v2.magnitude();
  // solve for the cosine of the angle between v1 and v2
  let cosAngle = dotProd / (magV1 * magV2);
  cosAngle = Math.min(Math.max(cosAngle, -1), 1); // make sure the value is between -1 and 1
  // angle to radians
  let angleRadians = Math.acos(cosAngle);
  // angle to degrees
  let angleDegrees = angleRadians * (180 / Math.PI);
  console.log("Angle: " + angleDegrees);
  return;
}

function areaTriangle(v1,v2){
  let crossProd = Vector3.cross(v1,v2); // calculate the cros prod of v1 & v2
  let a = crossProd.magnitude() / 2; // calculate the area
  console.log("Area: " + a);
  return;
}

function drawVector(v, color){
  var c = document.getElementById("example");
  var ctx = c.getContext("2d");

  ctx.beginPath();
  ctx.moveTo(200,200); // center of canvas
  ctx.lineTo(200 + v.elements[0] * 20, 200 - v.elements[1] * 20);
  ctx.strokeStyle = color;
  ctx.stroke();
  ctx.closePath();
}
