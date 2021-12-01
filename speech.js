let voice;
let rate;
let pitch;
var synth = window.speechSynthesis;

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
                console.log("voice:",voice);
                var utterThis = new SpeechSynthesisUtterance(request.data.line);
                utterThis.voice =  synth.getVoices()[voice];
                utterThis.pitch = pitch;
                utterThis.rate = rate;
                synth.speak(utterThis);
            }
        }

        sendResponse({ok: true});
    }
);