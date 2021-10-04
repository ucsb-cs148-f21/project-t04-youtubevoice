console.log("Initing youtube script...");

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
    }, function(response) {
    console.log(response);
  }
);

YoutubeController.init = function() {
    console.log(window.location.href);

    window.addEventListener('DOMContentLoaded', function () {

        // chrome.runtime.sendMessage(
        //     {
        //       command: "fetch-cc",
        //       data: {
        //         video_id: new URL(window.location.href).searchParams.get("v"),
        //       }
        //     }, function(response) {
        //     console.log(response);
        //   }
        // );
    });

    this.observer = new MutationObserver(function(mutationList) {
        for (var i = 0, l = mutationList.length; i < l; i++) {
            var mutation = mutationList[i];

            if (mutation.type === 'childList') {
                for (var j = 0, k = mutation.addedNodes.length; j < k; j++) {
                    var node = mutation.addedNodes[j],
                        name = node.nodeName,
                        id = node.id;

                    if (id === 'movie_player') {
                        if (!YoutubeController.player_initialized) {
                            YoutubeController.movie_player = node;
                            YoutubeController.player_initialized = true;
                            YoutubeController.onPlayerReady();
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

    console.log("Initialized.");
}

YoutubeController.getCurrentTime = function() {
    return this.movie_player?.getCurrentTime();
}

YoutubeController.onPlayerReady = function() {
    var videotime = null;

    function updateTime() {
        let oldTime = videotime;
        videotime = this.movie_player?.getCurrentTime();
        if(videotime !== oldTime) {
          YoutubeController.onTimeUpdated(videotime);
        }
      }
      timeupdater = setInterval(updateTime, 500);
}

YoutubeController.onTimeUpdated = function(ts) {
    console.log(ts);
}
