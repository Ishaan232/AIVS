function setup(){
    canvas=createCanvas(480,380);
canvas.center();
video.hide();
}

function preload(){
    video=createVideo("video.mp4")
}

function start(){
    anoyc=ml5.objectDetector('cocossd',OD);
    document.getElementById("status").innerHTML="Status:Detecting objects";
}

object=[];
status1="";

function OD(){
    console.log("Model is loaded");
    status1=true;
    video.loop();
    video.speed(1);
    video.volume(0);
}

function afn(error,result){
if(error){
    console.log(error);
    }
    else{
        console.log(result);
        object=result;
    }
}

function draw(){
    image(video,0,0,480,380);
    if(status1 != ""){
        anoyc.detect(video,afn);
        for(var i=0;i<object.length;i++){
            document.getElementById("status").innerHTML="Status:Object detected";
            document.getElementById("aioyc").innerHTML="Number of objects detected are:"+object.length;
            fill("red")
            noFill("red")
            stroke("red")
            avn=floor(object[i].confidence*100);
            text(object[i].label+" "+avn+"%",object[i].x+15,object[i].y+15);
            rect(object[i].x,object[i].y,object[i].width,object[i].height);
        }
    }
}
