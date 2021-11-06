import _, {map} from "underscore";

let synth = window.speechSynthesis;

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        switch (request.command) {
            case "speak":
                var strip_string = _.unescape(request.data.line).replace("&#39;", "");
                var utterance = new SpeechSynthesisUtterance(strip_string);
                synth.speak(utterance);
                console.log("Speak", strip_string);
        }

        sendResponse({ok: true});
    }
);
