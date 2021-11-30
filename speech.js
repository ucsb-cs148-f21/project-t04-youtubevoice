let synth = window.speechSynthesis;

let old_txt = [];
let new_txt = [];
let censor = false;
let censored = ["[ __ ]", "fuck", "shit", "bitch", "ass", 
"cunt", "dick", "motherfucker", "slut", "prick", "asshole"]

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        switch (request.command) {
            case "update": {
                if (request.data.old !== "") {
                    old_txt.push(request.data.old);
                    new_txt.push(request.data.new);
                    alert("Update successful!")
                } else if (request.data.new !== "") {
                    alert("Update failed: please enter a word to censor.")
                } else {
                    alert("Update successful!")
                }
                censor = request.data.cen;
            }
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
                
                console.log("Speak", line);

                var utterance = new SpeechSynthesisUtterance(line);
                synth.speak(utterance);
            }
        }

        sendResponse({ok: true});
    }
);