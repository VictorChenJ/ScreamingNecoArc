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
let test=true;
let acceltest=100;
let gravity=1;
let shaking = false;


function preload() {
    imgNeutral = loadImage('assets/necoNeutral.gif');
    imgDeath = loadImage('assets/necoDeath.gif');
    imgFall = loadImage('assets/necoFall.gif');
    imgFell = loadImage('assets/necoFall.png');
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
    print(necoAccelY)
    background(r, g, b);
    strokeWeight(10);
    imageMode(CENTER);

    if(accelerationX > 0 && accelerationY > 0) {
        image(imgDeath, x, y, 90,150);
    }
    else if(accelerationY > 0 && accelerationX <= 0){
        image(imgFall, x, y, 90,150);
    }
    else{
        image(imgNeutral, x, y,90,150);
    }
    
    deaccel()
    shake()
    if (ned)
        y=y+necoAccelY+gravity;
    else
        y=y-necoAccelY;
    if (venstre)
    x=x+necoAccelX;
    else
    x=x-necoAccelX;
    if (accelerationX > 70) {
        r = random(0, 256);
        g = random(0, 256);
        b = random(0, 256);
        if(rystet%2 == 0)
        ned = !ned;
        rystet++;
    }
text('rystet: ' + str(rystet), 50, height-100);
text('flyttet: ' + str(flyttet),50, height-50);
}

function deviceMoved(){
    flyttet++;

}
function shake(){
    if (accelerationX>40||test==true){
        if(necoAccelX<=1){
            necoAccelX=1
        }    
        necoAccelX=acceltest*0.01+necoAccelX;
    }
    if (accelerationY>40||test==true){
        if(necoAccelY<=1){
            necoAccelY=1
            
        }       
        necoAccelY=acceltest*0.01+necoAccelY;
    }
}
function deaccel(){
    /*deaccel*/
    necoAccelX=necoAccelX-necoAccelX/15
    print(necoAccelX)
    necoAccelY=necoAccelY-necoAccelY/15
    print("deaccel")
    if(necoAccelX<0.01){
        necoAccelX=0
    }
    if(necoAccelY<0.01){
        necoAccelY=0
    }


}

function changeDirection(){
    if (y+img.height/2 >= height || y-img.height/2 <= 0)
    ned = !ned;
    if (y+img.height/2 >= height || y-img.height/2 <= 0)
    ned = !ned;

    if (x+img.width/2 <= 0||venstre)
    venstre = !venstre;
    if (x-img.width/2 <= 0|| venstre)
    venstre = !venstre;
}