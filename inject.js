function injectScript(string) {
    var script = document.createElement('script');
    script.textContent = string;

    document.documentElement.appendChild(script);

    script.remove();
}

import {YoutubeController} from "./youtube-script.js";

var textContent = 'var YoutubeController={';

for (var key in YoutubeController) {
    var value = YoutubeController[key];

    if (typeof value === 'object') {
        value = JSON.stringify(value);
    }

    textContent += key + ': ' + value + ',';
}

textContent += '};YoutubeController.init();';

injectScript(textContent);

