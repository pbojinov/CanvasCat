window.CanvasCat = {};

CanvasCat.App = function() {

    var canvas,
	    ctx,
        mousePos,
	    centerLeftEyeX,
	    centerLeftEyeY,
	    centerRightEyeX,
	    centerRightEyeY,
	    radiusEye,
	    boxSizeX,
	    boxSizeY,
	    centerOffsetEye;
    
    function initialize() {

	    canvas = document.getElementById('artboard');    
	    ctx = canvas.getContext('2d');

	    //eyes position
	    centerLeftEyeX = 15;
	    centerLeftEyeY = 40;
	    centerRightEyeX = 60;
	    centerRightEyeY = 40;
	    radiusEye = 5;
	    boxSizeX = 25;
	    boxSizeY = 25,
	    centerOffsetEye = Math.floor(boxSizeX/2);
	
		//drawCatHead();
		setupEvents();
    }

	function drawCatHead() {
        
		//head
	    ctx.fillStyle = "rgb(200,0,0)";
	    ctx.fillRect (0, 20, 100, 100); //(x, y, width, height)

	    //left ear
	    ctx.fillStyle = "rgb(200,0,0)";
	    ctx.fillRect (15, 5, 20, 30); 

	    //right ear
	    ctx.fillStyle = "rgb(200,0,0)";
	    ctx.fillRect (60, 5, 20, 30); 

	    //left eye
	    ctx.fillStyle = "rgba(0, 0, 200, 0.5)";
	    ctx.fillRect (centerLeftEyeX, centerLeftEyeY, boxSizeX, boxSizeY);

	    //right eye
	    ctx.fillStyle = "rgba(0, 0, 200, 0.5)";
	    ctx.fillRect (centerRightEyeX, centerRightEyeY, boxSizeX, boxSizeY);

	    //mouth
	    ctx.fillStyle = "rgba(0, 0, 200, 0.5)";
	    ctx.fillRect (15, 90, 70, 5);

	    //left eyeball
	    ctx.beginPath();
	    ctx.arc(centerLeftEyeX + centerOffsetEye, centerLeftEyeY + centerOffsetEye, radiusEye, 0, 2 * Math.PI, false);
	    ctx.fillStyle = 'green';
	    ctx.fill();

	    //right eyeball
	    ctx.beginPath();
	    ctx.arc(centerRightEyeX + centerOffsetEye, centerRightEyeY + centerOffsetEye, radiusEye, 0, 2 * Math.PI, false);
	    ctx.fillStyle = 'green';
	    ctx.fill();
	}

	function setupEvents() {
        
		document.addEventListener('mousemove', handleMouseMovement);
        
        /**
         * Paul Irish on RequestAnimFrame
         * 
         * http://www.paulirish.com/2011/requestanimationframe-for-smart-animating/
         */
        // shim layer with setTimeout fallback
        window.requestAnimFrame = (function(){
            return  window.requestAnimationFrame       ||
                    window.webkitRequestAnimationFrame ||
                    window.mozRequestAnimationFrame    ||
                    function (callback){
                        window.setTimeout(callback, 1000 / 60);
                    };
        })();
        
        (function animationloop(){
            requestAnimFrame(animationloop);
            CanvasCat.App.getMousePosition();
        })();
	}
	
	function handleMouseMovement(event) {
        event = event || window.event; // IE-ism
        mousePos = {
            x: event.clientX,
            y: event.clientY
        };
        console.log(mousePos);
	}
    
    function getMousePosition() {
        var pos = mousePos;
        if (!pos) {
            // We haven't seen any movement yet
        }
        else {
            // Use pos.x and pox.y
            
            var contraintX = Math.ceil((pos.x)),
                contraintY = Math.ceil((pos.y));
                
            console.log(contraintX, contraintY);
                
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            drawCatHead();
            
            //left eyeball
    	    ctx.beginPath();
    	    ctx.arc((centerLeftEyeX) + (contraintX) , (centerLeftEyeY) + contraintY, radiusEye, 0, 2 * Math.PI, false);
    	    ctx.fillStyle = 'green';
    	    ctx.fill();

        }
    }
    
    return {
        initialize : initialize,
        getMousePosition : getMousePosition
    }
}();

document.addEventListener("DOMContentLoaded", CanvasCat.App.initialize());


