var audioContext = new AudioContext();
var scriptNode = audioContext.createScriptProcessor(1024, 1, 1);
scriptNode.connect(audioContext.destination);

function sin(time, noteNumber) {
  return Math.sin(time / Hz * Math.PI * 2 * frequencyForNote(noteNumber));
}

function square(time, noteNumber) {
  return Math.sign(sin(time, frequencyForNote(noteNumber)));
}

function saw(time, noteNumber) {
  return ((time / Hz * frequencyForNote(noteNumber)) % 1) * 2 - 1;
}

function triangle(time, noteNumber) {
  return Math.abs(((time / Hz * frequencyForNote(noteNumber)) * 2) % 2 - 1) * 2 - 1;
}

function frequencyForNote(noteNumber) {
  return Math.pow(2, (noteNumber - 69) / 12) * 440;
}

var keys = {
  65: {note: 48 + 12, on: false, instrument: square},
  83: {note: 50 + 12, on: false, instrument: square},
  68: {note: 53 + 12, on: false, instrument: square},
  70: {note: 55 + 12, on: false, instrument: square},
  71: {note: 57 + 12, on: false, instrument: square},
  72: {note: 60 + 12, on: false, instrument: square},
  74: {note: 62 + 12, on: false, instrument: square},
  75: {note: 65 + 12, on: false, instrument: square},
  76: {note: 67 + 12, on: false, instrument: square},

  90: {note: 48 - 12, on: false, instrument: triangle},
  88: {note: 50 - 12, on: false, instrument: triangle},
  67: {note: 53 - 12, on: false, instrument: triangle},
  86: {note: 55 - 12, on: false, instrument: triangle},
  66: {note: 57 - 12, on: false, instrument: triangle},
  78: {note: 60 - 12, on: false, instrument: triangle},
  77: {note: 62 - 12, on: false, instrument: triangle},
  188: {note: 65 - 12, on: false, instrument: triangle},
  190: {note: 67 - 12, on: false, instrument: triangle}
};

window.addEventListener('keydown', function(e) {
  if(e.which in keys) {
    keys[e.which].on = true;
  }
});

window.addEventListener('keyup', function(e) {
  if(e.which in keys) {
    keys[e.which].on = false;
  }
});

var data;
var time = 0;
var Hz = 44100;
var note = 69;
scriptNode.onaudioprocess = function(event) {
  data = event.outputBuffer.getChannelData(0);
  for (var i = 0; i < data.length; i++, time++) {
    data[i] = 0;
    for(var key in keys) {
      if(keys[key].on) {
        data[i] += keys[key].instrument(time, keys[key].note) / 10;
      }
    }
  }
}
