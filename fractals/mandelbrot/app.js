function createMandelbrotSet(){
  var myCanvas = document.createElement("canvas");
  myCanvas.width = 800;
  myCanvas.height = 600;
  // myCanvas.width = window.outerWidth;
  // myCanvas.height = window.outerHeight;

  document.body.appendChild(myCanvas);
  let ctx = myCanvas.getContext("2d");

  function checkIfBelongsToMandelbrotSet(x,y) {
    let realComponent = x;
    let imagComponent = y;
    let maxIterations = 20;

    for (let i = 0; i < maxIterations; i++) {
      let tempRealComponent = realComponent * realComponent - imagComponent * imagComponent + x;
      let tempImagComponent = 2 * realComponent * imagComponent + y;

      realComponent = tempRealComponent;
      imagComponent = tempImagComponent;

      if (realComponent * imagComponent > 2){
        return (i/maxIterations * 100);
      }
    }

    return 0;
  }

  let magnificationFactor = 100;
  let panX = 3.5;
  let panY = 2.5;
  let panSpeed = 100/magnificationFactor;

  let myHue = '24';

  function calculateSet(){
    for (let x = 0; x < myCanvas.width; x++){
      for(let y = 0; y < myCanvas.height; y++){
        let belongsToSet = checkIfBelongsToMandelbrotSet(x/magnificationFactor - panX, y/magnificationFactor - panY);

        if (belongsToSet === 0){
          ctx.fillStyle = '#000';
          ctx.fillRect(x,y,1,1);
        }
        else{
          ctx.fillStyle = 'hsl(' + myHue + ', 100%, ' + belongsToSet + '%)';
          ctx.fillRect(x,y,1,1);
        }
      }
    }

    ctx.fillStyle = "yellow";
    ctx.fillText("Magnification: " + magnificationFactor, 10, 10);
    ctx.fillText("Pan X: " + panX, 10, 20);
    ctx.fillText("Pan Y: " + panY, 10, 30);
  }

  calculateSet();

  document.addEventListener('keydown', (event) => {
    const keyName = event.key;
    console.log(keyName);

    switch (keyName){
      case("ArrowUp"):
        panY += panSpeed;
        break;
      case("ArrowDown"):
        panY -= panSpeed;
        break;
      case("ArrowLeft"):
        panX += panSpeed;
        break;
      case("ArrowRight"):
        panX -= panSpeed;
        break;
      case("PageDown"):
        magnificationFactor -= 500 * (magnificationFactor/1000);
        break;
      case("PageUp"):
        magnificationFactor += 500 * (magnificationFactor/1000);
        break;
    }

    calculateSet();
  })

};

createMandelbrotSet();
