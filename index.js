// -------- RESPONSIVE TOP NAVIGATION MENU --------
// responsive top navigation menu Reference: https://www.w3schools.com/howto/howto_js_topnav_responsive.asp
function toggleMobileMenu() {
  var x = document.querySelector(".topnav");
  if (!x.classList.contains("responsive")) {
    x.classList.add("responsive");
  } else {
    x.classList.remove("responsive");
  }
}

// Add event listener when DOM content is loaded
document.addEventListener('DOMContentLoaded', function() {
  const menuButton = document.getElementById('menuToggle');
  menuButton.addEventListener('click', toggleMobileMenu);
});

// ----------------

