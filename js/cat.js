document.addEventListener("DOMContentLoaded", function () {
    var canvas,
        ctx;
    
    canvas = document.getElementById('artboard');    
    ctx = canvas.getContext('2d');
    ctx.fillStyle = '#cc3300';
    ctx.fillRect(0,0,200,200);
});