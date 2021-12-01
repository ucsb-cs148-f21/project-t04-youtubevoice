var synth = window.speechSynthesis;

var inputForm = document.querySelector('form');
var voiceSelect = document.querySelector('select');

var pitch = document.querySelector('#pitch');
var pitchValue = document.querySelector('.pitch-value');
var rate = document.querySelector('#rate');
var rateValue = document.querySelector('.rate-value');

var voices = [];

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



function popup() {
  console.log(voiceSelect.selectedIndex);
  console.log(pitch.valueAsNumber);
  console.log(rate.valueAsNumber);

  let storg = {};
  storg["voice"] = voiceSelect.selectedIndex;
  storg["pitch"] = pitch.valueAsNumber;
  storg["rate"] = rate.valueAsNumber;
  chrome.storage.local.set(storg, function() {
    console.log("popup(): ", storg);
});
}


document.addEventListener("DOMContentLoaded", function() {
  console.log("DOM loaded");
  document.getElementById("play").addEventListener("click", function() {
    popup();
  });
});




