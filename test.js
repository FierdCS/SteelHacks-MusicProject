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

  let mediaRecorder;
  let recordedChunks = [];
  
  const startRecording = () => {
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(stream => {
        mediaRecorder = new MediaRecorder(stream);
  
        mediaRecorder.ondataavailable = event => {
          if (event.data.size > 0) {
            recordedChunks.push(event.data);
          }
        };
  
        mediaRecorder.onstop = () => {
          saveRecording();
        };
  
        mediaRecorder.start();
        document.getElementById('startRecording').disabled = true;
        document.getElementById('stopRecording').disabled = false;
      })
      .catch(err => {
        console.error('Error accessing microphone:', err);
      });
  };
  
  const stopRecording = () => {
    mediaRecorder.stop();
    document.getElementById('startRecording').disabled = false;
    document.getElementById('stopRecording').disabled = true;
  };
  
  const saveRecording = () => {
    const blob = new Blob(recordedChunks, { type: 'audio/aac' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'recorded.mp4';
    document.body.appendChild(a);
    a.click();
    URL.revokeObjectURL(url);
  };
  
  document.getElementById('startRecording').addEventListener('click', startRecording);
  document.getElementById('stopRecording').addEventListener('click', stopRecording);