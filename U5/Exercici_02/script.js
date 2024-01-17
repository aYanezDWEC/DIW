let canvas;
let context;

var sales = [{ product: "Basketballs",
               units: 320
            }, 
            { product: "Baseballs",
              units: 125
            }, 
            { product: "Footballs",
              units: 300
            }];


console.log(sales[2].units);


canvas = document.getElementById('basic-shapes-canvas');
context = canvas.getContext('2d');


context.beginPath();

//Líne vertical de la gráfica
context.moveTo(150, 10);
context.lineTo(150, 400)
context.stroke();

//Línea horizontal de la gráfica
context.moveTo(150, 400);
context.lineTo(550, 400);
context.stroke();

//Flecha de la línea vertical
context.moveTo(150, 10);
context.lineTo(140, 20);
context.stroke();

context.moveTo(150, 10);
context.lineTo(160, 20);
context.stroke();


//Flecha de la línea horzontal
context.moveTo(550, 400);
context.lineTo(540, 390);
context.stroke();

context.moveTo(550, 400);
context.lineTo(540, 410);
context.stroke();

//Text
context.font = "bold 20px Arial";
context.fillText("Units", 40, 240);

context.font = "bold 20px Arial";
context.fillText("Product", 290, 480);

context.font = "bold 20px Arial";
context.fillText(sales[0].product, 160, 420);

context.font = "bold 20px Arial";
context.fillText(sales[1].product, 300, 420);

context.font = "bold 20px Arial";
context.fillText(sales[2].product, 420, 420);

//Gradients
const grd1 = context.createLinearGradient(170, 240, 290, 240);
grd1.addColorStop(0, "orange");
grd1.addColorStop(1, "white");

// Fill with gradient
context.fillStyle = grd1;
context.fillRect(170, 400, 90, -(sales[0].units));



// Gradients
const grd2 = context.createLinearGradient(300, 240, 420, 240); // Corregido
grd2.addColorStop(0, "blue");
grd2.addColorStop(1, "white");

// Fill with gradient
context.fillStyle = grd2;
context.fillRect(300, 400, 90, -(sales[1].units));

// Gradients
const grd3 = context.createLinearGradient(430, 240, 550, 240); // Corregido
grd3.addColorStop(0, "red");
grd3.addColorStop(1, "white");

// Fill with gradient
context.fillStyle = grd3;
context.fillRect(430, 400, 90, -(sales[2].units));


// Good practice
context.restore();



