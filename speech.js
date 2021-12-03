//Default values
let play = false;
let old_txt = [];
let new_txt = [];
let censor = false;
let censored = ["[ __ ]", "fuck", "shit", "bitch", "ass", 
"cunt", "dick", "slut", "prick"]
let voice = 0;
let rate = 1;
let pitch = 1;
var synth = window.speechSynthesis;

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        switch (request.command) {

            //play button
            case "play": {
                play = request.data.play;
                break;
            }

            //check if playing
            case "checkplay": {
                sendResponse({status: play});
                break;
            }

            //censorship settings update
            case "censor": {
                if (request.data.old !== "") {
                    old_txt.push(request.data.old);
                    new_txt.push(request.data.new);
                    alert("Update successful!")
                } else if (request.data.new !== "") {
                    alert("Update failed: please enter a word to censor.")
                } else {
                    alert ("Update successful!")
                }
                censor = request.data.cen;
                break;
            }

            //voice settings update
            case "voice": {
                voice = request.data.voice;
                rate = request.data.rate;
                pitch = request.data.pitch;
                alert("Update successful!")
                break;
            }

            //speech synthesis
            case "speak": {
                let line = request.data.line;
                if (censor === true){
                    for (let i = 0; i < censored.length; i++) {
                        if (line.includes(censored[i])){
                            line = line.replace(censored[i], "bleep");
                        }
                    } 
                }  
                for (let i = 0; i < old_txt.length; i++) {
                    if (line.includes(old_txt[i])){
                        if (new_txt[i] !== ""){
                            line = line.replace(old_txt[i], new_txt[i]);
                        } else {
                                line = line.replace(old_txt[i], "bleep");
                        }
                    
                    }
                }
                
                if (play == true){
                    console.log("Speak", line);
                    var utterThis = new SpeechSynthesisUtterance(line);
                    utterThis.voice = synth.getVoices()[voice];
                    utterThis.pitch = pitch;
                    utterThis.rate = rate;
                    synth.speak(utterThis);
                }
            }
        }
        sendResponse({ok: true});
    }
);