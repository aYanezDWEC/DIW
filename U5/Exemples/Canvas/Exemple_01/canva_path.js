//It receives an identifier of the canvas element and loads the canvas
//Returns the canvas context or FALSE if it could not be obtained.
function loadCanvasContext(idCanvas){
    var element = document.getElementById(idCanvas);
    if(element && element.getContext){
       var context = element.getContext('2d');
       if(context){
          return context;
       }
    }
    return false;
  }
  
  window.onload = function(){
   
    var ctx = loadCanvasContext('canvas-path');
    if(ctx){
      ctx.beginPath();
      ctx.moveTo(1,1);
      for (i=1; i<300; i+=5) {
        if((i%2)!=0){
          ctx.lineTo(i+5,i);
        }else{
          ctx.lineTo(i,i+5);
        }
      }
      ctx.lineTo(1,i);
      ctx.closePath();
      ctx.stroke();
    }
  }