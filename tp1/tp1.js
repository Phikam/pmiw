//Gualtieri Evelyn comision 1
let logo;
let tituloAlpha=0;//titulo de inicio

let luffy = [];//personaje
let velXl=2;
let posXl, posYl;

let zoro = [];
let posXz;
let posYzoro
let velXz=2;
let spriteZo = 0;

let mar, barco, cielo,sol;//imagenes de fondo y barco
let posXm, posXb, posYm;
let velM, velB;

contadorU=0;
contadorL=0;

estado=0;//
sprite=0;

let botonX = 325; //boton de reinicio
let botonY = 520;
let botonAncho = 150;
let botonAlto = 50;



function preload(){//carga recursos 
  
  cielo=loadImage("data/cielo.PNG");//
  sol=loadImage("data/sol.PNG");
  mar=loadImage("data/mar.PNG");
  barco=loadImage("data/sunny.PNG");
  
  logo=loadImage("data/logo.PNG");
  
  for(let i=0; i<6; i++){ //for anidado
  luffy[i] = loadImage("data/"+ i +".PNG");
  }
   for(let i=0; i<8; i++){
  zoro[i] = loadImage("data/zoro_"+ i +".PNG");
  }
}  
function setup() {
createCanvas(800,600);
imageMode(CENTER,CENTER);

reiniciarTodo();//restaura a su valor inicial 
}

function reiniciarTodo(){//estado y sprite

posXm=width/2;
posY=height/2;
posXb=-150;
tituloAlpha=0;


posXl=width +150;
  posYl=height - 150;
  velXl=1.5;
  
  posYzoro = posYl + 30;
  posXz = width + 150;
  velXz=1.3;

velM=1.5;
velB=1;

sprite = 0;
spriteZo=0;

estado=0;



}


function draw() {//posiciones, estados
  background(0);
  image(cielo,width/2,height/2,width,height);
  
  image(sol,width/2,height/2,width,height);
  
  posXm+=velM;
  if(posXm>=width+width/2){
    posXm=width/2
  }
  image(mar,posXm, posY, width, height);
   image(mar,posXm-width, posY,width, height);
   
   if (estado===0){
      posXb+=velB;
      if(posXb > width/2 - 100){
       if(tituloAlpha < 255){
         tituloAlpha += 5;
       }else{
         estado = 1;
       }
      }
   }
   else if (estado ===1){
     
     sprite = actuFrame(sprite,5,6);
     if(posXl> -150){
       posXl -= velXl;
     }
     
     spriteZo = actuFrame(spriteZo,7,6);
     if (posXz > -150){
       posXz -= velXz;
     }
     
     if(verFinCorrer(posXl,posXz)){
       estado = 2;
     }
   }
   else if (estado === 2 ) {
     
    dibujarBotonReiniciar();
   }
     
  push();
  
  tint(255,tituloAlpha);//fade
  
  image(logo,width/2, height/2, 450, 350);
  
  pop();
 
  image(barco,posXb,300,350,300);
  
  if(estado===1){
     image(luffy[sprite], posXl, posYl, 120,120);
      image(zoro[spriteZo], posXz, posYzoro, 120,120);
     
          }
     }
     
     function actuFrame(actFrame, medFrame, velAnim){//animacion de personajes
       if(frameCount % velAnim===0){
         actFrame++;
         if(actFrame > medFrame){
           actFrame = 0;
         }
       }
       
       return actFrame; 
     }
     
     function verFinCorrer(posP1, posP2){//cuando termian de correr los personajes aparece el boton de reinicio
       if (posP1 <= -150 && posP2 <=-150){
         return true;
       }else{
         return false;
       }
}




function dibujarBotonReiniciar() {
  if(posXl <= - 150){
    push();
    rectMode(CORNER);
    fill(150,0,0);
    stroke(255);
    strokeWeight(2);
    rect(botonX,botonY,botonAncho,botonAlto,10);
    
    fill(255);
    noStroke();
    textSize(18);
    textAlign(CENTER,CENTER);
    text("Reinicar", botonX + botonAncho/2, botonY + botonAlto/2);
    pop();
  }
}

function mousePressed(){//click en el boton para restaurar valor
  if(estado===2){
    if(mouseX >= botonX && mouseX <= botonX+ botonAncho && mouseY >= botonY && mouseY<=botonY +botonAlto){
      reiniciarTodo();
    }
  }
}
