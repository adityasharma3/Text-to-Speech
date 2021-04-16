//creating an istance of api
var speech = new SpeechSynthesisUtterance();
var synth = window.speechSynthesis;

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
    // var voice = document.getElementById('voiceSelect').value;
    var vc = document.getElementById('voiceSelect').value;
    var volume = 10;
    var rate = 1;
    var pitch = 1;

    //updating the voice chosen by user
    document.getElementById('voiceSelect').addEventListener("change" , function(){
        var input = document.getElementById("voiceSelect").value;
        vc = input;
        // console.log("voice = " + input);
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

    //finally getting the api to pronounce the input given by user.
    document.getElementById('submit-btn').addEventListener("click" , function() {
        console.log(speech.lang , speech.volume , speech.rate , speech.pitch);
        var sentence_to_speak = document.getElementById('sentence').value;
        console.log(sentence_to_speak);

        var speak_this = new SpeechSynthesisUtterance(sentence_to_speak);

        var voiceSelect = document.getElementById('voiceSelect');
        var voice = window.speechSynthesis.getVoices();

        if (voiceSelect.value) {
		    speak_this.voice = speechSynthesis.getVoices().filter(function(voice) { return voice.name == voiceSelect.value; })[0];
	    }

        speak_this.volume = volume;
        speak_this.rate = rate;
        speak_this.pitch = pitch;
        synth.speak(speak_this);
    });
}

main();
