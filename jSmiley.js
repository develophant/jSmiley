(function( $ ) {

  var methods = {
    happiness : function( happiness ) {
    	
    	if(happiness === undefined) {
    		return this.data("jSmiley").happiness;
    	}
    	else {
	    	return this.each(function(){
	      		var $this = $(this);

				function styleFromColor(color) {
					return 'rgba(' + Math.round(color.r * 255) + ', ' + Math.round(color.g * 255) + ", " + Math.round(color.b * 255) + ", " + Math.round(color.a * 255) + ")";
				}

		    	var canvas = $this.find("canvas").get(0);
		    	canvas.width = $this.width();
		    	canvas.height = $this.height();
		    	var context = canvas.getContext("2d");
		    	var radius = Math.min(canvas.width, canvas.height) * 0.48;
		    	var centerX = canvas.width/2;
		    	var centerY = canvas.height/2;

		    	var f = happiness;

				context.clearRect(0, 0, canvas.width, canvas.height);

				var color = {r: 1-0.4*Math.max(f, 0), g:1+0.4*Math.min(f, 0), b:0, a:1}
			    context.beginPath();
			    context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
			    context.fillStyle = styleFromColor(color);
			    context.fill();
			    context.lineWidth = 0.15 * Math.pow(radius, 0.8);
			    context.strokeStyle = styleFromColor({r: color.r * 0.5, g: color.g * 0.5, b: color.b * 0.5, a:1});
			    context.stroke();

			    var eyeScaleX = 0.7;
			    context.beginPath();
				context.scale(eyeScaleX, 1);
			    context.arc((centerX - radius * 0.34) / eyeScaleX, centerY - radius * 0.35, 0.17 * radius, 0, 2 * Math.PI, false);
			    context.arc((centerX + radius * 0.34) / eyeScaleX, centerY - radius * 0.35, 0.17 * radius, 0, 2 * Math.PI, false);
			    context.fillStyle = styleFromColor({r: 0, g:0, b:0, a:1});
			    context.fill();


			    context.beginPath();
				context.scale(1/eyeScaleX,1);
			    var smileHeight = 0.5;
			    var smileWidth = 0.5 + 0.1 * Math.abs(f) * (f < 0 ? 0.5 : 1);
			    var p1 = {x:centerX - radius * smileWidth, y:centerY + radius * 0.4 - radius * smileHeight * 0.4 * f};
			    var p2 = {x:centerX + radius * smileWidth, y:centerY + radius * 0.4 - radius * smileHeight * 0.4 * f};
			    context.moveTo(p1.x, p1.y);
			    context.bezierCurveTo(p1.x + smileWidth * radius * 0.3,
			    						p1.y + f * radius * smileHeight,
			    						p2.x - smileWidth * radius * 0.3,
			    						p2.y + f * radius * smileHeight,
			    						p2.x, p2.y);
			    context.lineWidth = 0.15 * Math.pow(radius, 0.8);;
			    // line color
			    context.strokeStyle = 'black';
			    context.stroke();
			  	$this.data("jSmiley", {happiness: happiness});
	    	});
		}
	},

    init : function (options) {
	  	var settings = $.extend( {'happiness' : 0}, options);

    	return this.each(function(){
      		var $this = $(this);

		  	var canvas = document.createElement("canvas");
		  	$this.data("jSmiley", {happiness: settings.happiness});
		  	$this.append(canvas);
	  		$this.jSmiley('happiness', settings.happiness);

	  		$this.resize(function() {
	  			$this.jSmiley('happiness', settings.happiness);
	  		})
    	});
    },

    destroy: function(options) {
		return $(this).each(function() {
			$(this).removeData('jSmiley');
		});
	}
  };

  $.fn.jSmiley = function(method) {
    // Method calling logic
    if ( methods[method] ) {
      return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
    } else if ( typeof method === 'object' || ! method ) {
      return methods.init.apply( this, arguments );
    } else {
      $.error( 'Method ' +  method + ' does not exist on jQuery.jSmiley' );
    }
    return this;
  };
})( jQuery );