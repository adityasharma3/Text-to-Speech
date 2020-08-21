//initializing speech synthesis
const synth = window.speechSynthesis;

//DOM Elements
const textForm = document.querySelector('form');
const textInput = document.querySelector('#text-input');
const voiceSelect = document.querySelector('#voice-select');
const rate = document.querySelector('#rate');
const rateValue = document.querySelector('#rate-value');
const pitch = document.querySelector('#pitch');
const pitchValue = document.querySelector('#pitch-value');
const body = document.querySelector('body');

//initializing voices array
let voices = [];

const getVoices = () => {
    voices = synth.getVoices();
    //console.log(voices);

    //looping through voices and create an option for each one
    voices.forEach(voice => {
        //create an option element
        const option = document.createElement('option');
        //fill the option with voice and element
        option.textContent = voice.name + '(' + voice.lang + ')';

        // Set needed option attributes
        option.setAttribute('data-lang', voice.lang);
        option.setAttribute('data-name', voice.name);
        voiceSelect.appendChild(option);
    });
};

getVoices();
if (synth.onvoiceschanged !== undefined) {
    synth.onvoiceschanged = getVoices;
}

//speak
const speak = () => {

    //check if speaking
    if (synth.speaking) {
        console.error('Already speaking!');
        return;
    } 

    if (textInput.value != '') {
        //get speech text
        const speakText = new SpeechSynthesisUtterance(textInput.value);

        //speak end
        speakText.onend = e => {
            console.log('Done Speaking');
        };

        //Speak Error
        speakText.onerror = () => {
            console.error('Something went wrong');
        };

        //Selected Voice 
        const selectedVoice = voiceSelect.selectedOptions[0].getAttribute('data-name');

        //Loop through voices
        voices.forEach(voice => {
            if (voice.name == selectedVoice) {
                speakText.voice = voice;  
            }

        });
        
        //set pitch and rate
        speakText.rate = rate.value;
        speakText.picrh = pitch.value;

        //speak
        synth.speak(speakText);

    }
};

//Event-listners

//text form submit
textForm.submit('submit' , e => {
    e.preventDefault();
    speak();
    textInput.blur();
});

//Rate value change
rate.addEventListener('change' , e => rateValue.textContent = rate.value);

//Pitch value change
pitch.addEventListener('change' , e => pitchValue.textContent = pitch.value);

//Voice select change
voiceSelect.addEventListener('change' , e =>speak());