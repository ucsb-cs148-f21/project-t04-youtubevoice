import SubFetch from "./sub_fetch";

import _ from "underscore";

console.log("Background script working...");

let _sub_fetch = new SubFetch("en");

let _subtitle_map = new Map();
let _tab_video_id_map = new Map();

let _tab_timestamp_map = new Map();

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        const tab_id = sender.tab.id;

        switch (request.command) {
            case "fetch-cc": {
                handle_fetch_cc(tab_id, request.data.video_id)
                    .then(() => sendResponse({ok: true}));
            }
            case "send-timestamp": {
                handle_send_timestamp(tab_id, request.data.ts)
                    .then(sendResponse({ok: true}));
            }
            default: {
                sendResponse({ok: false, reason: "UNKNOWN_COMMAND"});
            }
        }

        return true;
    }
);


async function handle_fetch_cc(tab_id, video_id) {
    console.log("handle_fetch_cc: tab", tab_id, "and video", video_id);

    _tab_video_id_map.set(tab_id, video_id);
    _subtitle_map.set(video_id, await fetch_cc(video_id));
}

async function handle_send_timestamp(tab_id, ts) {
    const video_id = _tab_video_id_map.get(tab_id);
    if (video_id === undefined) { // Impossible, but check anyway.
        console.warn("handle_send_timestamp: send-timestamp cmd received before fetch-cc", tab_id);
        return;
    }

    const subtitle = _subtitle_map.get(video_id);
    if (subtitle === undefined) {
        console.warn("handle_send_timestamp: subtitle still fetching/not exist for", video_id);
        return;
    }

    let closest;
    for (const e of subtitle) {
        if (e.begin < ts) {
            closest = e;
        }
    }
    if (closest === undefined) {
        return
    }

    if (closest.begin != _tab_timestamp_map.get(tab_id)) {
        console.log("handle_send_timestamp: closest", closest);

        _tab_timestamp_map.set(tab_id, closest.begin);
        
        chrome.tabs.sendMessage(tab_id,
        {
            command: "speak",
            data: {
                line: unescape_text(closest.text)
            }
        },
        function(resp) {
            if (!resp?.ok) {
                console.warn("handle_send_timestamp: cmd speak returned", resp);
            }
        });
    }
}

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
    let subtitles = await _sub_fetch.fetch_subtitle(video_id);

    let storg = {};
    storg[video_id] = subtitles;
    chrome.storage.local.set(storg, function() {
        console.log("download_cc: subtitle for video " + video_id + " saved");
    });

    return subtitles;
}


function unescape_text(text) {
    return _.unescape(text).replace("&#39;", "'").replace("\n", " ");
}
