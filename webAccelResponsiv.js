// bemærk hvis man skal oprette flere canvas og køre ikke-global mode
// https://github.com/processing/p5.js/wiki/p5.js-overview#instantiation--namespace
// https://www.youtube.com/watch?v=Su792jEauZg
// derman kan man oprette instans som objekt, hvori sketchen kører
// Og man kan oprette flere canvas med samme sketch eller
// forskellige sketches i forskellige canvas
// instans mode skal closure på variable - namespacing - vs global mode med globale variable

// tilføj knapper, og tilføj eventlistener til knappen, funktionskald
// 10 spring til siden hurtigt nok - gør baggrunden helt hvid...

let y = 100; let r = 200; g = 180; b = 0;
let x = 150
let ned = true;
let venstre = true;
let rystet = 0;
let flyttet = 0;
let img;
let necoAccelX=5;
let necoAccelY=5;
let test=false;
let acceltest=0;
let gravity=1.5;
let shaking = false;
let halvhoejde =75;
let halvbredde= 45;



function preload() {
    imgNeutral = loadImage('necoNeutral.gif');
    imgDeath = loadImage('necoDeath.gif');
    imgFall = loadImage('necoFall.gif');
    imgFell = loadImage('necoFell.png');
  }

function setup() {
    canvas = createCanvas(300, 550, 'beholder');
    textSize(24);
    // giver canvas border på 2 pixel, 
    // og sørger derefter for at kanten tælles med i width
    canvas.elt.style.border = '5px solid black';
    canvas.elt.style.boxSizing = 'border-box';
    canvas.elt.style.borderRadius = '20px';

    canvas.parent('#beholder');
    // gør canvas-elementet responsivt til skærmbredden
    canvas.elt.style.width = '100%';
    canvas.elt.style.height = '100%';

    //bemærk at noden skal pakkes ud via .elt
    const parentDiv = select('#beholder').elt;
    const p = select('#test1').elt;
    // indsæt canvas i ny position i rækkefølgen af elementer i div'en beholder
    parentDiv.insertBefore(canvas.elt, p);
}

function draw() {
    background(r, g, b);
    strokeWeight(10);
    imageMode(CENTER);

    if(necoAccelX > 0 && necoAccelY > 0) {
        image(imgDeath, x, y, 90,150);
    }
    else if(necoAccelY > 0 && necoAccelX <= 0){
        image(imgFall, x, y, 90,150);
    }
    else{
        image(imgNeutral, x, y,90,150);
    }
    /*changeDirection()*/
    deaccel()
    shake()
    /*updateDirection()*/
    A()
    if (accelerationX > 70) {
        r = random(0, 256);
        g = random(0, 256);
        b = random(0, 256);
        if(rystet%2 == 0)
        rystet++;
    }
text('rystet: ' + str(rystet), 50, height-100);
text('flyttet: ' + str(flyttet),50, height-50);
y=y+necoAccelY+gravity;
x=x+necoAccelX;
}

function deviceMoved(){
    flyttet++;

}

function shake(){
    if (accelerationX>40||test==true){
        if(necoAccelX<=1){
            necoAccelX=1
        }    
        necoAccelX=accelerationX*0.027+necoAccelX;
    }
    if (accelerationY>40||test==true){
        if(necoAccelY<=1){
            necoAccelY=1
            
        }       
        necoAccelY=accelerationY*0.027+necoAccelY;
    }
}

function deaccel(){
    /*deaccel*/
    necoAccelX=necoAccelX-necoAccelX/15
    necoAccelY=necoAccelY-necoAccelY/15
    if(necoAccelX<0.01){
        necoAccelX=0
    }
    if(necoAccelY<0.01){
        necoAccelY=0
    }
}

function changeDirection(){
    if (y+halvhoejde >= 0/*&& ned==false*/)
    y=halvhoejde
    
    if (y+imgDeath.height/2 >= height/*&& ned==true*/)
    y=height+halvhoejde/2;
    ned=!ned
    if (x+imgDeath.width/2 >= width/*&& venstre==true*/)
    /*x=width*/
    venstre=false
    if (x-imgDeath.width/2 <= 0 /*&& venstre==false*/)
    /*x=0*/
    venstre =true
}   
function A(){
if(y>=height-halvhoejde){
    y=height-halvhoejde
    if(accelerationY=true){
        necoAccelY=-necoAccelY
    }
}
if(y-halvhoejde<0){
    y=halvhoejde/2
    if(accelerationY=false){
        necoAccelY=-necoAccelY
    }
}
if(x-halvbredde<=0){
    x=halvbredde
    if(accelerationX=false){
        necoAccelX=-necoAccelX
    }
}
if(x+halvbredde>=width){
    x=width-halvbredde
    if(accelerationX=true){
    necoAccelX=-necoAccelX
    }
}


}
function updateDirection(){
    necoAccelX=-necoAccelX
    necoAccelY=-necoAccelY
}