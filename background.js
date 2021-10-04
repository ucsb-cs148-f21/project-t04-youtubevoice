import {parser} from 'fast-xml-parser';

console.log("Background script working...");

chrome.runtime.onMessage.addListener(
  async function(request, sender, sendResponse) {
    console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension");

    switch (request.command) {
      case "fetch-cc":
        await fetch_cc(request.data.video_id);
    }

    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {command: "talk", data: {
        content: "hello world!"
      }
    }, function(response) {
        console.log(response.farewell);
      });
    });

    sendResponse({farewell: "goodbye"});
  }
);

async function fetch_cc(video_id) {
  let p = new Promise(function(resolve, reject){
    chrome.storage.local.get([video_id], function(result){
      resolve(result[video_id]);
    })
  });

  let subtitles = (await p) ?? (await download_cc(video_id));

  console.log(subtitles);
}


async function download_cc(video_id) {
  let options = {
    attributeNamePrefix : "_",
    attrNodeName: "attr", //default is 'false'
    textNodeName : "node_text",
    ignoreAttributes : false,
    ignoreNameSpace : false,
    allowBooleanAttributes : false,
    parseNodeValue : true,
    parseAttributeValue : false,
    trimValues: true,
    cdataTagName: "__cdata", //default is 'false'
    cdataPositionChar: "\\c",
    parseTrueNumberOnly: false,
    numParseOptions:{
      hex: true,
      leadingZeros: true,
      //skipLike: /\+[0-9]{10}/
    },
    arrayMode: false, //"strict"fault is a=>a
    stopNodes: ["parse-me-as-string"]
};

  let subtitles_raw = await fetch('https://video.google.com/timedtext?lang=en&v='+video_id)
  .then(response => response.text())
  .then(data => parser.parse(data, options))
  .then(data => data?.transcript?.text);

  let subtitles = subtitles_raw.map(subtitle => ({
    text: subtitle.node_text,
    begin: subtitle.attr._start,
    duration: subtitle.attr._dur,
  }));
  console.log(subtitles);

  let storg = {};
  storg[video_id] = subtitles;
  chrome.storage.local.set(storg, function() {
    console.log("Subtitle for video " + video_id + " saved");
  });
}
