var parser = require('fast-xml-parser');

console.log("Background script working...");
//const local_text = []; //this was inside function but I moved it because I want to use in into another function to send text from background to content script. 

let passSubtitleBackToFront;
let expected_time ;
let local_subtitle;
const local_time = []; 
const local_text = []; 

let current_timestamp;

chrome.runtime.onMessage.addListener(
  async function(request, sender, sendResponse) {
    // console.log(sender.tab ?
    //             "from a content script:" + sender.tab.url :
    //             "from the extension");

    // chrome.tabs.sendMessage(sender.tab.id, {greeting: "hello"}, function(resp) {
    //   console.log(resp);
    // });

    switch (request.command) {
      case "fetch-cc":
        let local_subtitle = await fetch_cc(request.data.video_id);
        console.log(local_subtitle);
        console.log("Hello, this is your text")

        for (let i = 0; i < local_subtitle.length; i++) {
          local_time.push(local_subtitle[i].begin);
          local_text.push(local_subtitle[i].text); 
        }

      case "send-timestamp":
        expected_time = request.data.ts;
        let goal = expected_time; // replace this with the actual time stamp from the front 

        var closet = local_time.reduce(function(prev, curr) {
          return (Math.abs(curr - goal) < Math.abs(prev - goal) ? curr : prev);
        });

        if (closet != current_timestamp) {
          current_timestamp = closet;

          console.log("____________", closet)

          var temp_closet = 0;
          // TODO ( WANT TO get distcnt value of the text by coimparting the  )
         
            var index_text = local_time.indexOf(closet);
            
            //passSubtitleBackToFront[local_text[index_text]]; // = local_text[index_text];
            passSubtitleBackToFront = local_text[index_text];
           // console.log("Testing " + passSubtitleBackToFront);
            //console.log(local_text[index_text]);
            temp_closet = closet;
          
          chrome.tabs.sendMessage(sender.tab.id,
            {
              command: "speak",
              data: {
                line: local_text[index_text]
              }
            },
            function(resp) {
            console.log(resp);
          });
        }
    }

    sendResponse({ok: true});
  }
);


async function fetch_cc(video_id) {
  let p = new Promise(function(resolve, reject){
    chrome.storage.local.get([video_id], function(result){
      resolve(result[video_id]);
    })
  });

  let subtitles = (await p) ?? (await download_cc(video_id));

  return subtitles;
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
