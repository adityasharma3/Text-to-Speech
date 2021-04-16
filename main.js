//creating an istance of api
var speech = new SpeechSynthesisUtterance();
var synth = window.speechSynthesis;

//english language is being selected.
speech.lang = "en";

console.log(speech);

function populateVoiceList() {
  if(typeof speechSynthesis === 'undefined') {
    return;
  }

  var voices = speechSynthesis.getVoices();

  for(var i = 0; i < voices.length; i++) {
    var option = document.createElement('option');
    option.textContent = voices[i].name + ' (' + voices[i].lang + ')';

    if(voices[i].default) {
      option.textContent += ' -- DEFAULT';
    }

    option.setAttribute('data-lang', voices[i].lang);
    option.setAttribute('data-name', voices[i].name);
    document.getElementById("voiceSelect").appendChild(option);
  }
}

populateVoiceList();
if (typeof speechSynthesis !== 'undefined' && speechSynthesis.onvoiceschanged !== undefined) {
  speechSynthesis.onvoiceschanged = populateVoiceList;
}


function main() {
    var voice = '';
    var volume = 10;
    var rate = 1;
    var pitch = 1;

    //updating the voice chosen by user
    document.getElementById('voiceSelect').addEventListener("change" , function(){
        var input = document.getElementById("voiceSelect").value;
        voice = input;
        console.log("voice = " + input);
    });

    //updating the volume upto the user's requirements
    document.getElementById('volume').addEventListener("change" , function(){
        var input = document.getElementById('volume').value;
        volume = input;
        console.log("volume  = "+ input);

    });

    //updating the rate of speech on user input.
    document.getElementById('rate').addEventListener("change" , function() {
        var input = document.getElementById('rate').value;
        rate = input;
        console.log("rate = " + input);
    });


    //updating the pitch of speech based upon user input.
    document.getElementById('pitch').addEventListener("change", function() {
        var input = document.getElementById('pitch').value;
        pitch = input;
        console.log("pitch = " + input);
    });

    //
    document.getElementById('submit-btn').addEventListener("click" , function() {
        console.log(speech.lang , speech.volume , speech.rate , speech.pitch);
        var sentence_to_speak = document.getElementById('sentence').value;
        console.log(sentence_to_speak);

        speech.voice = voice;
        speech.volume = volume;
        speech.rate = rate;
        speech.pitch = pitch;

        console.log(speech.voice ,speech.lang , speech.volume , speech.rate , speech.pitch);


        var speak_this = new SpeechSynthesisUtterance(sentence_to_speak);
        synth.speak(speak_this);
    });
}

main();