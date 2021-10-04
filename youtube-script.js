console.log("Initing youtube script...");

export var YoutubeController = {
    movie_player: {},
};

YoutubeController.init = function() {
    console.log(window.location.href);

    window.addEventListener('DOMContentLoaded', function () {

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
                        YoutubeController.movie_player = node;
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
