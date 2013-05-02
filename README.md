jSmiley
=======

A simple jQuery plugin (html5) for generating happy, neutral and sad smileys.

### Example
`````html
<html>
	<head>
		<script src="http://code.jquery.com/jquery-1.9.1.min.js"></script>
		<script src="jSmiley.js"></script>
		<script>
			$(function () {
				var smiley = $("#smiley");
				smiley.width(400);
				smiley.height(400);

				// Intialize the smiley, the happiness parameter goes from -1 (sad) to 1 (happy).
				smiley.jSmiley({happiness:1});

				// You can get the current happiness of the smiley
				console.log("happiness: " + smiley.jSmiley("happiness"));

				// Make the smiley sad
				smiley.jSmiley("happiness", -1);
			});
		</script>
	</head>
	<body>
		<div id="smiley"></div>
	</body>
</html>
`````