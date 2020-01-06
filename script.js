var SpeechRecognition = window.webkitSpeechRecognition;
  
var recognition = new SpeechRecognition();
var listening = 'I am Listening...';
var noWork = 'Not listening. \n Press Speak button and say anything.';
var stListen = 'Press Stop button to stop Listening.';
var Textbox = document.getElementById('textbox');
var instructions = document.getElementById('instructions');
var bottomInstr = document.getElementById('bottom');
var Content = '';

recognition.continuous = true;

recognition.onresult = function(event) {

  var current = event.resultIndex;

  var transcript = event.results[current][0].transcript;
 
    Content += transcript;
    Textbox.value = Content;
  
};
function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}
recognition.onstart = function() {
  instructions.innerHTML=listening; 
  bottomInstr.innerHTML=stListen;
}

recognition.onspeechend = function() {
  instructions.innerHTML=noWork;
}

recognition.onerror = function(event) {
  if(event.error == 'no-speech') {
    instructions.innerHTML='Try again.';  
  }
}

$('#start-btn').on('click', function(e) {
  if (Content.length) {
    Content += ' ';
    Textbox.value = Content;
  }
  recognition.start();
});
$('#stop-btn').on('click',function(e){
  recognition.stop();
  instructions.innerHTML=noWork;
  bottomInstr.innerHTML='';
})
$('#textbox').on('input', function(e){
  Content = Textbox.value;
});
const map = {
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  lowercase: "abcdefghijklmnopqrstuvwxyz"
};
function add(){
  var text = document.getElementById('textbox').value;
  for(let index=0; index<text.length; index++){
    sleep(300);
    var val = text[index];
    if(val != ' '){
      let request = new XMLHttpRequest();
      request.responseType = 'blob';
      request.open('GET', 'http://localhost:5000/'+val+'.jpg');
	    //request.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
      request.setRequestHeader("Access-Control-Allow-Origin", "*");
	    request.onload = function() {
        var blob = this.response;
        var img = new Image();
        img.height=200;
        img.width=100;
        img.src = window.URL.createObjectURL(blob);
        document.getElementById('body').appendChild(img);
	    };
      request.send();
    }
  }
	
}
$('#getImage').on('click',function(e){
  add();
});
