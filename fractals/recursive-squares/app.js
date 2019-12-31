var mc = document.getElementById("mc");
var c = mc.getContext("2d");
var f = Math.sqrt(2);

mc.width = window.outerWidth;
mc.height = window.outerHeight;


function hor(x,y,len){
  if(len < 1) return;

  c.beginPath();
  c.moveTo(x - len/2, y);
  c.lineTo(x + len/2, y);
  c.stroke();

  setTimeout(function() {
    ver(x - len/2, y, len/f);
    ver(x + len/2, y, len/f);
  }, 10);
}

function ver(x,y,len){
  if (len < 1) return;

  c.beginPath();
  c.moveTo(x, y - len/2);
  c.lineTo(x, y + len/2);
  c.stroke();

  setTimeout(function(){
    hor(x,y - len/2, len/f);
    hor(x,y + len/2, len/f);
  }, 10);
}

hor(mc.width/2,mc.height/2,1000);
