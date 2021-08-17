
prediction_1 = ""
Webcam.set({
    width: 360,
    height: 250,
    image_format: 'png',
    png_quality: 90
  });
  camera = document.getElementById("camera");
  Webcam.attach('#camera')
function take_snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = '<img id = "captured_image" src = "'+ data_uri + '">';

    });
}

console.log("ml5 version", ml5.version);
classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/JtC8qB00Q/model.json', modelLoaded);
function modelLoaded(){
    console.log("model loaded");
}
function speak(){
    var synth = window.speechSynthesis;
    speak_data_1 = "the first prediction is " + prediction_1;
    var utterThis = new SpeechSynthesisUtterance(speak_data_1);
    synth.speak(utterThis);

}
function check(){
    img = document.getElementById("captured_image");
classifier.classify(img,gotResult);
}
function gotResult(error,results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        document.getElementById("result_emotion_name").innerHTML = results[0].label;
        prediction_1 = results[0].label;
        speak();
        if(results[0].label == "Victory")
        {
            document.getElementById("update_emoji").innerHTML = "&#9996;";

        }
        if(results[0].label == "Great")
        {
            document.getElementById("update_emoji").innerHTML = "&#128076;";

        }
        if(results[0].label == "Best")
        {
            document.getElementById("update_emoji").innerHTML = "&#128077;";

        }

    }
      
}