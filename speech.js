let synth = window.speechSynthesis;

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        switch (request.command) {
            case "speak": {
                const line = request.data.line;

                console.log("Speak", line);

                var utterance = new SpeechSynthesisUtterance(line);
                synth.speak(utterance);
            }
        }

        sendResponse({ok: true});
    }
);
