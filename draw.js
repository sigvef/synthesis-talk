var canvas = document.getElementById('display');
canvas.width = 1024;
canvas.height = 128;
var ctx = canvas.getContext('2d');
setInterval(function() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.save();
  ctx.translate(0, canvas.height / 2);
  ctx.scale(1, -1);
  ctx.beginPath();
  ctx.strokeStyle = 'blue';
  ctx.moveTo(0, 0);
  ctx.lineTo(canvas.width, 0);
  ctx.stroke();
  ctx.strokeStyle = 'black';
  ctx.beginPath();
  if(window.data) {
    ctx.moveTo(0, data[0] * canvas.height / 2);
    for(var i = 1; i < data.length; i += 1) {
      var sample = data[i];
      ctx.lineTo(i, sample * canvas.height / 2);
    }
  }
  ctx.stroke();
  ctx.restore();
}, 100);
