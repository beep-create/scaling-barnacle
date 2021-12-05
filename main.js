
img="";
status="";
objects=[];
song="";


function setup() {
canvas=createCanvas(380,380);
canvas.center();
video=createCapture(VIDEO);
video.hide();
video.size(380,380);


objectDetector=ml5.objectDetector('cocossd', modelLoaded);
document.getElementById("status").innerHTML="status: detecting objects...";

}


function preload() {
song = loadSound("Secret_Police.mp3");


}


function modelLoaded() {

  console.log("model loaded");
  status=true;  

}



function gotResult(error, results) {
if(error) {
    console.log(error);
}
else{ 
console.log(results);
objects=results;
}
 
}





function draw() {
image(video,0,0,380,380);
 if(status != "") {
   r = random(255);
   g = random(255);
   b = random(255);

   objectDetector.detect(video, gotResult);

      for (i = 0; i < objects.length; i++) {

   document.getElementById("status").innerHTML="status: object detected!";
   document.getElementById("number_of_objects").innerHTML="number of objects detected are: " + objects.length;
   fill(r,g,b);
   confidence = floor(objects[i].confidence*100);
   text(objects[i].label + " " + confidence + "%", objects[i].x + 15,  objects[i].y + 15);
   noFill();
   stroke(r,g,b);
   rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
    if(objects[i].label == "person") {
    document.getElementById("number_of_objects").innerHTML="Baby found!";
    song.stop();
    }
   else {
   document.getElementById("number_of_objects").innerHTML="Baby not found..";
   song.play();
   }
   if(objects[i] < 0) {
    document.getElementById("number_of_objects").innerHTML="Baby not found..";
    song.play();
   }


   }
 }
 

}