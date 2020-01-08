var SpeechRecognition = window.webkitSpeechRecognition;
var recognition = new SpeechRecognition();
var listening = 'I am Listening...';
var noWork = 'Not listening. \n Press Mic button and say anything.';
var stListen = 'Press Mic off button to stop Listening.';
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
function add(val){
      let request = new XMLHttpRequest();
      request.responseType = 'blob';
      if(val==' ')
        request.open('GET', 'http://localhost:5000/space.png');
      else
        request.open('GET', 'http://localhost:5000/'+val+'.jpg');
	    //request.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
      request.setRequestHeader("Access-Control-Allow-Origin", "*");
      var img = new Image();
	    request.onload = function() {
        var blob = this.response;
        img.height=200;
        img.width=100;
        img.src = window.URL.createObjectURL(blob);
	    };
      request.send();
    return img;
}
$('#getImage').on('click',function(e){
  var text = document.getElementById('textbox').value;
  flag=1;
  for(let index=0; index<text.length; index++){
      var imgs = add(text[index]);
      document.getElementById('body').appendChild(imgs);
  }
});
$('#refresh').on('click',function(e){
  document.location.reload();
});
