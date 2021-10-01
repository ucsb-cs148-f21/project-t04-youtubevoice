
// Initialize butotn with users's prefered color
let changeColor = document.getElementById("changeColor");

chrome.storage.sync.get("color", ({ color }) => {
  changeColor.style.backgroundColor = color;
});

// When the button is clicked, inject setPageBackgroundColor into current page
changeColor.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: setPageBackgroundColor,
  });
});

// The body of this function will be execuetd as a content script inside the
// current page
function setPageBackgroundColor() {
  chrome.storage.sync.get("color", ({ color }) => {
    document.body.style.backgroundColor = color;
  });

  var Orig = 0; // Original to compare if a skip happens

  function incrementSeconds() {

    var timestamp = document.querySelector(".ytp-time-current");
    var timeArr = (timestamp.textContent).split(':'); // split it at the colons

    if ((+timeArr[0]) * 60 + (+timeArr[1]) != Orig) {
      Orig = (+timeArr[0]) * 60 + (+timeArr[1]);
      timeSeconds = Orig;
    }

    timeSeconds += 1;
    console.log(timeSeconds);

  }

  var r_interval = setInterval(incrementSeconds, 1000); // function 'incrementSeconds' will now run every 1 second


  // console.log(timeSeconds);

  // clearInterval(r_interval); // clears the timer and stops 'incrementSeconds' running every second
}
