document.addEventListener('DOMContentLoaded', function() {
    var playButton = document.getElementById('play');
    playButton.addEventListener('click', function() {
      
      chrome.tabs.getSelected(null,function(tab){
      alert('Play button clicked');
      });
    }, false);

    var settingsButton = document.getElementById('settings');
    settingsButton.addEventListener('click', function() {

      window.location.href='settings.html';

  }, false);
}, false);