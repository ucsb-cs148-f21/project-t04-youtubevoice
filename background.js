import SubFetch from "./sub_fetch";

console.log("Background script working...");
//const local_text = []; //this was inside function but I moved it because I want to use in into another function to send text from background to content script. 

let sub_fetch = new SubFetch("en");

let passSubtitleBackToFront;
let expected_time ;
let local_subtitle;
const local_time = []; 
const local_text = []; 

let current_timestamp;

chrome.runtime.onMessage.addListener(
  async function(request, sender, sendResponse) {
    switch (request.command) {
      case "fetch-cc":
        let local_subtitle = await fetch_cc(request.data.video_id);

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
              console.log("background.js: cmd speak returned", resp);
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
  let subtitles = await sub_fetch.fetch_subtitle(video_id);
  console.log("download_cc: ", subtitles[0]);

  let storg = {};
  storg[video_id] = subtitles;
  chrome.storage.local.set(storg, function() {
    console.log("download_cc: subtitle for video " + video_id + " saved");
  });

  return subtitles;
}
