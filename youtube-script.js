// Global variable for the controller
export var YoutubeController = {
    movie_player: {}, // youtube HTML5 player
    player_initialized: false,
};

chrome.runtime.sendMessage(
    {
      command: "fetch-cc", 
      data: {
        video_id: new URL(window.location.href).searchParams.get("v"),
      }
    }, function(resp) {
        if (!resp?.ok) {
            console.warn("youtube-script.js: cmd fetch-cc returned", resp);
        }
    }
);

YoutubeController.init = function() {
    window.addEventListener("DOMContentLoaded", function () {
    });

    let this2 = this; // Magic?
    this.observer = new MutationObserver(function(mutationList) {
        for (var i = 0, l = mutationList.length; i < l; i++) {
            var mutation = mutationList[i];

            if (mutation.type === "childList") {
                for (var j = 0, k = mutation.addedNodes.length; j < k; j++) {
                    var node = mutation.addedNodes[j],
                        name = node.nodeName,
                        id = node.id;

                    if (id === "movie_player") {
                        if (!this2.player_initialized) {
                            this2.movie_player = node;
                            this2.player_initialized = true;
                            this2.onPlayerReady();
                        }
                    }
                }
            }
        }
    });

    this.observer.observe(document, {
        attributes: false,
        childList: true,
        subtree: true
    });

    console.log("youtube-script.js: Initialized.");
}

// Get's the time
YoutubeController.getCurrentTime = function() {
    return this.movie_player?.getCurrentTime();
}

// When player playing then timestamp is fetched
YoutubeController.onPlayerReady = function() {
    var videotime = null;

    let this2 = this;
    function updateTime() {
        let oldTime = videotime;
        videotime = this.movie_player?.getCurrentTime();
        if (videotime !== oldTime) {
            this2.onTimeUpdated(videotime);
        }
    }
    timeupdater = setInterval(updateTime, 500);
}


document.addEventListener("TimeUpdated", function (event) {
    chrome.runtime.sendMessage(
        {
            command: "send-timestamp", 
            data: {
                ts: event.detail,
            }
        }, function(resp) {
            if (!resp.ok) {
                console.log("youtube-script.js: cmd send-timestamp returned", resp);
            }
        }
    );
});

// Executes on timestamp update
YoutubeController.onTimeUpdated = function(ts) {
    document.dispatchEvent(
        new CustomEvent(
            "TimeUpdated",
            {"detail": ts}
        )
    );
}
