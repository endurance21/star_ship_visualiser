var audioloader =  new AudioLoader();
const audio = audioloader.load('song5.mp3');
//const button = new createDOMElement("button", "button", "click to play ");   
audio.play();
// document.body.
var container = new createDOMElement("div",'container');
var audioContext = new AudioContext();
var  analyser = audioContext.createAnalyser();                                   ///////////ANAYLYSER WILL RETRIEV DATA WE WANT 
var source = audioContext.createMediaElementSource(audio);
source.disconnect();
source.connect(analyser);                                                     
analyser.connect(audioContext.destination);

const color = ["#0392cf", "#7bc043","#fdf498","#f37736","#ee4035"] ;
var canvas =  new createDOMElement("canvas","canvas");
var canvas2 =  new createDOMElement("canvas", "canvas2");
container.appendChild(canvas);
container.appendChild(canvas2);
container.style = "position:relative;";
var ctx3 = canvas2.getContext('2d');
ctx3.shadowColor = "white";
ctx3.shadowBlur = 1000;  
canvas.style = "border: 2px solid red;";
canvas.width = innerWidth;
canvas.height = innerHeight;
canvas2.width = innerWidth;
canvas2.height = innerHeight;
canvas.style = " background-color:black ;" ;
// canvas2.style = " background-color:black ;" ;
const omega = 0.04;
var Radius = 3200;
var center = { x:innerWidth/2 , y:innerHeight/2} ;
var mouse = { x: 0 , y:0 , Velocity:{ x: 0.000001, y:0.000001}};
const  c1 = canvas.getContext('2d');
const  c2 = canvas.getContext('2d');
const grd1 = c1.createLinearGradient(0, 0, innerWidth + 200, 0);


class Circle {
    constructor(x,y,radius,xVelocity,yVelocity,ips){
        this.x = x;
        this.radius = radius;
        this.y = y ; 
        this.Velocity = { x:xVelocity, y:yVelocity } ;
        this.radian = ips;      
    }   
 
} 

Circle.prototype.update = function(){
     this.radian+=omega;
     if(this.x +this.radius > innerWidth || this.x < this.radius )
       this.Velocity.x = - this.Velocity.x ;
     else {}
    if(this.y +this.radius > innerHeight || this.y <this.radius)
       this.Velocity.y = - this.Velocity.y ;  
     else{}

   let radius = Math.sin(this.radian)*Radius/4 ; 
    this.x = center.x + radius*Math.cos(this.radian/10) ;
    this.y = center.y + radius*Math.sin(this.radian/3);
    this.draw();      
 }

Circle.prototype.draw = function (){
     c2.arc(this.x, this.y, this.radius, 0, Math.PI*2,0); 
     c2.lineTo(this.x,this.y);    
 }
 Circle.prototype.update2 =  function(){
     if(this.y >= innerHeight)
     this.y = 0.1 ;
     this.y+=this.Velocity.y;
     console.log("working");
     this.draw2();
     
 }
 
Circle.prototype.draw2 = function(){
    ctx3.arc(this.x,this.y,this.radius,0,Math.PI*2);
    ctx3.fillStyle = "white" ;
    ctx3.fill();
    ctx3.beginPath();
    

}
var circlearray = [];

circlearray[1] = new Circle(innerWidth/2, innerHeight/2 - 320 , 10, 2, 3, 0 ) ;
circlearray[2] = new Circle(innerWidth/2 + 280, innerHeight/2  + 210 ,10 ,-2,7 ,Math.PI/2);
circlearray[3] = new Circle(innerWidth/2- 260, innerHeight/2 + 210 , 10 ,9,-4,Math.PI*3/2);
circlearray[4] = new Circle(200 , 400 , 10 , 0 ,0 ,Math.PI);
circlearray[5] = new Circle(200 , 400 , 10 , 0 ,0 ,0);
circlearray[6] = new Circle(200 , 400 , 10 , 0 ,0 ,0);
circlearray[7] = new Circle(200 , 400 , 10 , 0 ,0 ,Math.PI/30);
 for(let i = 5 ; i< 100 ; i++)
 {  let radius = Math.random()*5 ;
    let x = Math.random()*innerWidth ;
    let y = Math.random()*innerHeight ;
    circlearray.push( new Circle(x,y,radius,0,6,0));
  
 }
 var j =0 ;
 var count = 0;
 function renderer1(){

    var fftdata = new Uint8Array(analyser.frequencyBinCount);                 //makes array of size analyser.frequencyBinCount....
    analyser.getByteFrequencyData(fftdata);
    Radius = fftdata[100]*40 - 800;
   
    
    
    if(count==40){
       count  = 0;
       j++ ;
        if(j>=5)
           j = 0;
    }
    count ++ ;
    c1.shadowColor = color[j];
    c1.shadowBlur = 800;  
    grd1.addColorStop(0, color[j]);
    grd1.addColorStop(1, color[j]);
    c1.fillStyle = grd1;
     c2.clearRect(0, 0 ,innerWidth,innerHeight);
     c1.beginPath();
    requestAnimationFrame(renderer1);
    for(var i = 1 ; i< 6; i++)
    circlearray[i].update();
    c2.fill();
    c2.beginPath(); 
    ctx3.clearRect(0,0,innerWidth,innerHeight);
    for(let i = 9 ; i<100 ; i++)
    circlearray[i].update2();
 }

 renderer1();

 window.onmousedown = function() {
     center.x = event.pageX;
     center.y = event.pageY;
 } ;



 
  
      
