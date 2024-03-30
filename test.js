var fretCount;
var tuning;

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

  window.onload = function(){
    document.getElementById("fretSubmit").onclick = function(){
    fretCount = parseInt(document.getElementById("fretct").value, 10);
    }

    var dropdowns = document.getElementsByClassName("dropdown-content");

    for (var dropdown of dropdowns) {
      for (var dropdownItem of dropdown.children) {
        dropd
      }
    }
  }