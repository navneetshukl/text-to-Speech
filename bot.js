/*const utterance = new SpeechSynthesisUtterance();

function playText(text) {
  if (speechSynthesis.paused && speechSynthesis.speaking) {
    return speechSynthesis.resume();
  }
  if (speechSynthesis.speaking) return;
  utterance.text = text;
  utterance.rate = 1;
  speechSynthesis.speak(utterance);
}

playText("Hi How are you");*/


const say = require('say');

function playText(text) {
  say.speak(text);
}

playText("Hi How are you");
