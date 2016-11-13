<!DOCTYPE html>
<html>

	<head>
		<meta charset="utf-8" />
		<title>Santa</title>
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<meta name="mobile-web-app-capable" content="yes">
		<meta name="apple-mobile-web-app-capable" content="yes">
		<script type="text/javascript" src="js/gamecontroller.min.js"></script>
		<script type="text/javascript" src="js/phaser.min.js"></script>
		<script type="text/javascript" src="js/Boot.js"></script>
		<script type="text/javascript" src="js/Preload.js"></script>
		<script type="text/javascript" src="js/Game.js"></script>

		<style>
		  body {
		    padding: 0px;
		    margin: 0px;
			background:#000000;
		  }
		  canvas {
			display : block;
			margin : 0 auto;
}
		  </style>
	</head>

	<body>  
	<h1 id="fb-welcome"></h1>
	<script>
  window.fbAsyncInit = function() {
    FB.init({
      appId      : '771202332950008',
      xfbml      : true,
      version    : 'v2.2'
    });

    // ADD ADDITIONAL FACEBOOK CODE HERE
	
	
	// Place following code after FB.init call.

function onLogin(response) {
  if (response.status == 'connected') {
    FB.api('/me?fields=first_name', function(data) {
      var welcomeBlock = document.getElementById('fb-welcome');
      welcomeBlock.innerHTML = 'Hello, ' + data.first_name + '!';
    });
  }
}

FB.getLoginStatus(function(response) {
  // Check login status on load, and if the user is
  // already logged in, go directly to the welcome message.
  if (response.status == 'connected') {
    onLogin(response);
  } else {
    // Otherwise, show Login dialog first.
    FB.login(function(response) {
      onLogin(response);
    }, {scope: 'user_friends, email'});
  }
});
	
	
	
	
  };

  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "//connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));
</script>
		<!-- include the main game file -->
		<script src="js/main.js"></script>
	</body>
</html>
