let canvas;
let context;

canvas = document.getElementById('basic-shapes-canvas');
context = canvas.getContext('2d');

// Always save context and restore at the end
context.save();

/* The fillRect() method draws a black rectangle with a top-left corner at position (0,0). 
The rectangle is 100 pixel wide and 100 pixels high.*/
context.fillRect(0, 0, 100, 100);

// A 150x100 empty rectangle in (150,10)
context.strokeRect(150, 10, 150, 100);

// We translate the drawing position
context.translate(220, 40);
context.rotate(45);

// We can use colours (fill or stroke)
context.fillStyle = "green";
context.strokeStyle = "blue";

// We can specify a specific line width
context.lineWidth = 20;

// Painting
context.fillRect(100, 100, 150, 150);
context.strokeRect(100, 100, 150, 150);
context.rotate(-45);

// Good practice
context.restore();