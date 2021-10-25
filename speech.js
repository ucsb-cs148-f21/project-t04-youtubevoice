synth = window.speechSynthesis;


chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        switch (request.command) {
            case "speak":
                var utterance = new SpeechSynthesisUtterance( request.data.line);
                speechSynthesis.speak(utterance);
                console.log("Speak", request.data.line);
        }

        sendResponse({ok: true});
    }
);
