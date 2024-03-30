var capo = 0;
var fretCount = 22;
var tuning = "Standard";
let bestNote = [0,2]
let notelist = [];

let E = [];
let A = [];
let D = [];
let G = [];
let B = [];
let e = [];

let stringlist = ["e", "B", "G", "D", ""]

let Enote = [];

let tunings = ["Standard", "Eb", "DropC", "Dstand"] 
let Standard = [164.81, 220, 293.66, 392, 493.88, 659.29]; //EADGBE
let Eb = [155.56, 207.65, 277.18, 369.99, 466.16, 622.25]; //EbAbDbGbBbEb
let DropC = [130.81, 196, 261.63, 349.23, 440, 589.33]; //CGCFAD
let DStand = [146.83, 196, 261.63, 349.23, 440, 589.33]; //DGCFAD
let DropD = [146.83, 220, 293.66, 392, 493.88, 659.29];//DADGBE
window.onload = function(){ //inputs globals
    document.getElementById("fretSubmit").onclick = function(){
    fretCount = parseInt(document.getElementById("fretct").value, 10);//set fretcount
    console.log(fretCount);
    setup();
    }//change if requested

    document.getElementById("capoSubmit").onclick = function(){
    capo = parseInt(document.getElementById("capo").value, 10);//set where capo is
    console.log(capo);
    setup();//change if requested
    }



    var dropdowns = document.getElementsByClassName("dropdown");

    for (let dropdown of dropdowns) {
      let header = dropdown.getElementsByClassName("dropbtn")[0];
      let dropdownItems = dropdown.getElementsByClassName("dropdown-content")[0].children;

      for (let dropdownItem of dropdownItems) {
        dropdownItem.onclick = function() {
          if (header.classList.contains("show")) {
            header.classList.remove("show");
          }

          console.log(dropdownItem.textContent);
          tuning = dropdownItem.textContent;//get tuning from user if unspecified assume standard
          setup();//change if requested
        }
      }
    }
  }

function setup()
{
  console.log("print"); //get correct tuning array
  var tuneArr;
  if(tuning === "Standard")
    tuneArr = Standard;
  else if(tuning === "Eb")
    tuneArr = Eb;
  else if(tuning === "Drop C")
    tuneArr = DropD;
  else if(tuning === "D Standard")
    tuneArr = DStand;
  else if(tuning === "Drop D")
    tuneArr = DropD;
  for(let i = 0; i < fretCount; i++)  //set up all notes on guitar
  {
    E[i] = tuneArr[0] * Math.pow(2,(i/12));
    A[i] = tuneArr[1] * Math.pow(2,(i/12));
    D[i] = tuneArr[2] * Math.pow(2,(i/12));
    G[i] = tuneArr[3] * Math.pow(2,(i/12));
    B[i] = tuneArr[4] * Math.pow(2,(i/12));
    e[i] = tuneArr[5] * Math.pow(2,(i/12));
  }
  for(let b = 0; b < fretCount; b++)
    console.log(D[b]);
  
  getNotes(415.3);
}

function getNotes(freq)
{
  let Cordinates = [];
  if(freq >= E[capo] && freq <= E[fretCount - 1]) //check if note is in frequency of string
  {
    console.log("E start");
    Cordinates.push(binary(E, capo, fretCount - 1, freq));//binary search to find respective note
    Cordinates.push(0); 
    console.log("E stop");
  }
  if(freq >= A[capo] && freq <= A[fretCount - 1])
  {
    Cordinates.push(binary(A, capo, fretCount -1, freq));
    Cordinates.push(1);
  }
  if(freq >= D[capo] && freq <= D[fretCount - 1])
  {
    Cordinates.push(binary(D, capo, fretCount -1, freq));
    Cordinates.push(2);
  }
  if(freq >= G[capo] && freq <= G[fretCount - 1])
  {
    Cordinates.push(binary(G, capo, fretCount -1, freq));
    Cordinates.push(3);
  }
  if(freq >= B[capo] && freq <= B[fretCount - 1])
  {
    Cordinates.push(binary(B, capo, fretCount -1, freq));
    Cordinates.push(4);
  }
  if(freq >= e[capo] && freq <= e[fretCount - 1])
  {
    Cordinates.push(binary(e, capo, fretCount -1, freq));
    Cordinates.push(5);
  }
  console.log(Cordinates)
  bestChoice(Cordinates);
}

function bestChoice(arr)
{
  let x = arr.filter((element,index) => {return index % 2 === 0;
  })
  console.log(x);
  if(bestNote.length == 0) //if we do not have previous note set note to one closest to open string
  {
    var lowest = 0;
    for(var i = 1; i < x.length; i++)
    {
      if(x[i] < x[lowest]) lowest = i;
    }
    bestNote.push(x[lowest]);
    bestNote.push(lowest);
    console.log(bestNote);
    noteList.push([x[lowest], lowest]);
  }
  else
  {
    let dist = [] 
    for(var i = 0; i < x.length; i++)//if we have previous note
    {
      dist.push(Math.sqrt(Math.pow((x[i] - bestNote[0]),2) + Math.pow((i-bestNote[1]),2))); //use distance formula (value is x index is y) to find closes note
    }
    lowest = 0;
    for(var i = 1; i < dist.length; i++)
    {
      if(dist[i] < dist[lowest]) lowest = i; //find smallest element from distance formula
    }
    console.log("before" + bestNote);
    bestNote[0] = x[lowest];
    bestNote[1] = lowest;
    console.log("after" + bestNote);
    noteList.push([x[lowest], lowest]);
  }
  
}

function binary(arr, l, r, x)
{
  while (l < r) {
      let m =  l + (r - l) / 2;
      m = Math.floor(m);
      // Check if x is present at mid
      console.log("freq" + x);
      console.log("array val " +  arr[m] + "checkval" + m);
      if (arr[m] == x)
          return m;

      // If x greater, ignore left half
      if (arr[m] < x)
          l = m + 1;

      // If x is smaller, ignore right half
      else
          r = m - 1;
  }

  // If we reach here, then element was
  // not present
  if(l - 1 - capo < 0)
  {
    if(Math.abs(arr[l + 1] -x) > Math.abs(arr[l] - x))
      return l - capo;
    return l + 1 - capo;
  }

  if(l + 1 - capo >= arr.length)
  {
    if(Math.abs(arr[l - 1] -x) > Math.abs(arr[l] - x))
      return l - capo;
    return l - 1 - capo;
  }

  //console.log("l+1: " + arr[l+1] + "l" + arr[l] + "l-1" + arr[l-1]);
  if(Math.abs(arr[l - 1] - x) > Math.abs(arr[l] - x) && Math.abs(arr[l + 1] - x) > Math.abs(arr[l] - x))
  {
    //console.log("return l: " + arr[l] + "index: " + l);
    return l - capo;
  }
  else if(Math.abs(arr[l - 1] - x) > Math.abs(arr[l + 1] - x) && Math.abs(arr[l] - x) > Math.abs(arr[l + 1] - x))
  {
  //console.log("return l-1] + "index: " + l+1);
    return l + 1 - capo;
  }
  else{
    return l - 1 - capo;
  }
}

function displaytab(){
  let html = '<p>'
  let counter = 0;
  // notelist : 2d array of notes inputted in order

  // Generates the long string to output
  for(let b = 0; b < 6; b++)
  {
    
    for(let i = 0; i < 62; i++)//20 notes each line
    {
      if(i%3 == 0)
      {
        if (notelist[counter][1] == b)
        {
          html += notelist[counter][0];
        }
        counter++;  
      }
      else // Adds a hyphen for every single part that does not hold a note
      {
        html += "-";
      }
    }
    counter = 0;
    html += "<br />" 
  }

  html += "</p>"
  // Output the longer string in format


}

  let mediaRecorder;
  let recordedChunks = [];
  
  function startRecording() {
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(function(stream) {
        mediaRecorder = new MediaRecorder(stream);
  
        mediaRecorder.ondataavailable = function(event) {
          if (event.data.size > 0) {
            recordedChunks.push(event.data);
          }
        };
  
        mediaRecorder.onstop = function() {
          saveRecording();
        };
  
        mediaRecorder.start();
        document.getElementById('startRecording').disabled = true;
        document.getElementById('stopRecording').disabled = false;
      })
      .catch(function(err) {
        console.error('Error accessing microphone:', err);
      });
  }
  
  function stopRecording() {
    mediaRecorder.stop();
    document.getElementById('startRecording').disabled = false;
    document.getElementById('stopRecording').disabled = true;
  }
  
  function saveRecording() {
    const blob = new Blob(recordedChunks, { type: 'audio/aac' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'recorded.mp4';
    document.body.appendChild(a);
    a.click();
    URL.revokeObjectURL(url);
  }
  
  document.getElementById('startRecording').addEventListener('click', startRecording);
  document.getElementById('stopRecording').addEventListener('click', stopRecording);