var fretCount;
var tuning;
/*
window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
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
*/

  window.onload = function(){
    document.getElementById("fretSubmit").onclick = function(){
    fretCount = parseInt(document.getElementById("fretct").value, 10);
    console.log(fretCount);
  }

    var dropdowns = document.getElementsByClassName("dropdown");

    for (var dropdown of dropdowns) {
      let header = dropdown.getElementsByClassName("dropbtn")[0];
      let dropdownItems = dropdown.getElementsByClassName("dropdown-content")[0].children;

      for (const dropdownItem of dropdownItems) {
        dropdownItem.onClick = function() {
          if (header.classList.contains("show")) {
            header.classList.remove("show");
          }

          console.log(dropdownItem.textContent);
          tuning = dropdownItem.textContent;
        }
      }
    }
  }