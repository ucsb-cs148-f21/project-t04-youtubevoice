var synth = window.speechSynthesis;

var inputForm = document.querySelector('form');
var voiceSelect = document.querySelector('select');

var pitch = document.querySelector('#pitch');
var pitchValue = document.querySelector('.pitch-value');
var rate = document.querySelector('#rate');
var rateValue = document.querySelector('.rate-value');

var voices = [];

//fill the html dropdown with voice options
function populateVoiceList() {
  voices = synth.getVoices().sort(function (a, b) {
      const aname = a.name.toUpperCase(), bname = b.name.toUpperCase();
      if ( aname < bname ) return -1;
      else if ( aname == bname ) return 0;
      else return +1;
  });
  var selectedIndex = voiceSelect.selectedIndex < 0 ? 0 : voiceSelect.selectedIndex;
  voiceSelect.innerHTML = '';
  for(let i = 0; i < voices.length ; i++) {
    var option = document.createElement('option');
    option.textContent = voices[i].name + ' (' + voices[i].lang + ')';
    
    if(voices[i].default) {
      option.textContent += ' -- DEFAULT';
    }

    option.setAttribute('data-lang', voices[i].lang);
    option.setAttribute('data-name', voices[i].name);
    voiceSelect.appendChild(option);
  }
  voiceSelect.selectedIndex = selectedIndex;
}

populateVoiceList();

if (speechSynthesis.onvoiceschanged !== undefined) {
  speechSynthesis.onvoiceschanged = populateVoiceList;
}

pitch.onchange = function() {
  pitchValue.textContent = pitch.value;
}

rate.onchange = function() {
  rateValue.textContent = rate.value;
}

document.addEventListener('DOMContentLoaded', function() {

    console.log("DOM loaded");

    //update button for pitch, accent, and speed
    var updateV = document.getElementById("updateV");
    updateV.addEventListener("click", function() { 
      chrome.tabs.query({active: true, currentWindow: true}, tabs => {
        chrome.tabs.sendMessage( tabs[0].id,
          { command: "voice",
            data: { 
              voice: voiceSelect.selectedIndex,
              pitch: pitch.valueAsNumber, 
              rate: rate.valueAsNumber
          }, 
          function(response) {
            console.log(response.farewell);
          }
        });
      });
    });

    //functionality for speech censoring
    var updateC = document.getElementById('updateC');
    var old_txt = document.getElementById('old').value;
    var new_txt = document.getElementById('new').value;
    var censorBox = document.getElementById('censor');
    var censor = document.getElementById('censor').checked;
    censorBox.addEventListener('click', function() {
      censor = !censor
    });

    //update button for censoring
    updateC.addEventListener('click', function() {
      old_txt = document.getElementById('old').value;
      new_txt = document.getElementById('new').value;
      chrome.tabs.query({active: true, currentWindow: true}, tabs => {
      chrome.tabs.sendMessage( tabs[0].id,
        { command: "censor", 
          data: { old: old_txt , new: new_txt, cen: censor}
        }, 
        function(response) {
          console.log(response.farewell);
        });
      });
    });

    //back button
    var backButton = document.getElementById('back');
    backButton.addEventListener('click', function() {

      window.location.href='popup.html';

    });

});