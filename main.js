prediction_1="";
prediction_2="";
Webcam.set({
    width:350,
    height:300,
    image_format:'png',
     png_quality:90
});
camera=document.getElementById("camera");
Webcam.attach('#camera');
function take_snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("SnapShot").innerHTML='<img src="'+data_uri+'"id="capture_image">';
    });
}
console.log("ml5 version:",ml5.version);
classifier= ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/3lJRt8FxI/model.json',modelLoaded);
function modelLoaded(){
 console.log("model Loaded successfully");
}
function speak(){
    var synth=window.speechSynthesis;
    speak_data1="prediction is"+prediction;
    var utterThis=new SpeechSynthesisUtterance(speak_data);
     synth.speak(utterThis);
}
function Predict(){
    img=document.getElementById("capture_image");
    classifier.classify(img,gotResult);
}
function gotResult(error,results){
if(error){
    console.error(error);
}
else{
    console.log(results);
    document.getElementById("result_Gesture_name").innerHTML=results[0].label;
    prediction= results[0].label;
    speak()
    if(results[0].label=="Thumbs Up"){
        document.getElementById("update_Gesture").innerHTML="&#128522;"
    }
    if(results[0].label=="Thumbs Down"){
        document.getElementById("update_Gesture").innerHTML="&#128532;"
    }
    if(results[0].label=="Amazing"){
        document.getElementById("update_Gesture").innerHTML="&#128545;"
    }
}
}