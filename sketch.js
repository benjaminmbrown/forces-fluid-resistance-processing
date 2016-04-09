var movers=[];
var liquid;
var noiseScale = 0.01;

function setup() {

  createCanvas(640, 360);

   text("click mouse to reset", 10,250);
  reset();//creates movers
  liquid = new Liquid(0, height/2, width, height/2, 0.1);
  

 
}

function mousePressed() {
  reset();
}

// Restart all the Mover objects randomly
function reset() {
  for (var i = 0; i < 9; i++) {
    movers[i] = new Mover(random(0.5, 3), 40+i*70, 0);
  }
}

function draw() {
  background(127);
  liquid.display();
  //noise() takes  params value, valRangeMin, valRangeMax, desiredRangeMin,desiredRangeMax
  var wind = createVector(0.01, 0);


  for (var i = 0; i < movers.length; i++) {

    //check to see if the mover is in liquid
    if(liquid.contains(movers[i])){
      //calculate drag
      var dragForce = liquid.calculateDrag(movers[i]);
      movers[i].applyForce(dragForce);
    }


    //move gravity into here so we can apply mass of each object to it
    var gravity = createVector(0, 0.1*movers[i].mass);


    //FRICTION
    var frictionCoefficient = 0.01; //higher coefficient = more friction / slower surface
    var normal = 1;//normal force 
    var frictionMag = frictionCoefficient * normal; // magnitude of friction
    var friction = movers[i].velocity.copy();//make a copy b/c we don't want to change the directions
    friction.mult(-1);// friction force acts opposite vector of it's velocity
    friction.normalize();
    friction.mult(frictionMag);
    //END FRICTION

    

     movers[i].applyForce(wind);
     movers[i].applyForce(gravity);
     movers[i].applyForce(friction);
     movers[i].update();
     movers[i].display();
     movers[i].checkEdges();

  }
  

noiseScale+=0.001;


}


