let playclicked;
let icon = document.getElementById("play").innerHTML;
chrome.tabs.query({active: true, currentWindow: true}, tabs => {
  chrome.tabs.sendMessage( tabs[0].id,
    { 
      command: "checkplay"
    }, 
    function(response) {
      playclicked = response.status;
      if (playclicked === true){
        document.getElementById("play").innerHTML = "&#9612"+"&#9612";
      } else {
        document.getElementById("play").innerHTML = icon;
      }
    });
  });

document.addEventListener('DOMContentLoaded', function() {
    var playButton = document.getElementById('play');
    playButton.addEventListener('click', function() {

      playclicked = !playclicked;

      //change play button icon
      if (playclicked === true){
      document.getElementById("play").innerHTML = "&#9612"+"&#9612";
      } else {
        document.getElementById("play").innerHTML = icon;
      }

      //play functionality
      chrome.tabs.query({active: true, currentWindow: true}, tabs => {
        chrome.tabs.sendMessage( tabs[0].id,
          { 
            command: "play",
            data: { play: playclicked }
          }, 
          function(response) {
            console.log(response.farewell);
          });
        });
      });

    var settingsButton = document.getElementById('settings');
    settingsButton.addEventListener('click', function() {

      window.location.href='settings.html';

  }, false);
}, false);