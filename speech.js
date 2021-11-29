let voice;
let rate;
let pitch;

let voices = synth.getVoices().sort(function (a, b) {
  const aname = a.name.toUpperCase(), bname = b.name.toUpperCase();
  if ( aname < bname ) return -1;
  else if ( aname == bname ) return 0;
  else return +1;
});

chrome.storage.local.get(["voice", "pitch", "rate"], function(result){
  voice = result.voice;
  rate = result.rate;
  pitch = result.pitch;
});

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        switch (request.command) {
            case "speak": {
                chrome.storage.local.get(["voice", "pitch", "rate"], function(result){
                  voice = result.voice;
                  rate = result.rate;
                  pitch = result.pitch;
                });
               
                console.log("Speak", request.data.line);
                console.log("voice:", voice)
                var utterThis = new SpeechSynthesisUtterance(request.data.line);
                utterThis.voice = voice;
                utterThis.pitch = pitch;
                utterThis.rate = rate;
                synth.speak(utterThis);
            }
        }

        sendResponse({ok: true});
    }
);