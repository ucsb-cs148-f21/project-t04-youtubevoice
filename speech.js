let synth = window.speechSynthesis;

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        switch (request.command) {
            case "speak": {
                const line = request.data.line;

                let newword = "bleep";
                if (document.getElementById('old').value != "") {
                    let oldword = document.getElementById('old').value;
                    if (document.getElementById('new').value != "") {
                        newword = document.getElementById('new').value;
                    }

                    if (line.includes(oldword)){
                        line.replace(oldword, newword);
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
