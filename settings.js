document.addEventListener('DOMContentLoaded', function() {

    var backButton = document.getElementById('back');
    backButton.addEventListener('click', function() {

      window.location.href='popup.html';

    });

    var accentButton = document.getElementById('accent');
    accentButton.addEventListener('click', function() {

      document.getElementById("myDropdown").classList.toggle("show");

    });

    var englishButton = document.getElementById('english');
    englishButton.addEventListener('click', function() {
      accentButton.innerHTML = englishButton.innerHTML;
    });

    var spanishButton = document.getElementById('spanish');
    spanishButton.addEventListener('click', function() {
      accentButton.innerHTML = spanishButton.innerHTML
    });

    var frenchButton = document.getElementById('french');
    frenchButton.addEventListener('click', function() {
      accentButton.innerHTML = frenchButton.innerHTML
    });

    var russianButton = document.getElementById('russian');
    russianButton.addEventListener('click', function() {
      accentButton.innerHTML = russianButton.innerHTML
    });

// Close the dropdown if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.button') && !event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}

}, false);