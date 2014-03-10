DeChadou Slider
==============

FullScreen slider with responsive images fallback

This fullscreen slider will allow you to include a full gallery with responsive fallback, navigation controls and captions.
Also there are some options for enabling AutoPlay (With / Without TimeBar), Pause on Hover, etc.

<h1>Demo</h1>
http://dechadou.github.io/dechadouSlider/demo.html

<h1>How to Use</h1>

Add the CSS and JS files into your project
```sh
<link rel="stylesheet" href="css/dechadou.slider.css">
<script src="js/dechadou.slider.js"></script>
```

Add on your HTML
```sh
<section id="slider"></section>
```

Add on your page
```
<script>
$(document).ready(function (e) {
    $('#slider').dechadouSlider();
})
</script>
```
</pre>


<strong>Modify your images.json file to load your images and captions</strong>

-----------------------------------------------------------

<h1>Options:</h1>
<pre>
$('#slider').dechadouSlider({
        container: '.slider',       // Set the main class of the slides container (Default: '.slider')
        jsonFile: 'images.json',    // Set the location of the json file (Default: 'images.json')
        navClass: '.controls',      // Set the main class of the controls container (Default: '.controls')
        timerBarClass: 'timer-bar', // Set the main class of the timer-bar if enabled (Default: 'timer-bar')
        enableTimerBar: true,       // enable timebar, only visible if autoplay = true (Default: 'true')
        autoplay : true,            // AutoPlay (Default: 'true')
        stopOnHover: true,          // AutoPlay stop on hover (Default: 'true')
        delay: 5000,                // Delay for AutoPlay in miliseconds (Default: '5000')
        time: 500,                  // Speed of the transition (Default: '500')
        esponsive: true,            // If True, it will use the Tablet Image when the screen is below 1024px (Default: 'true')
        captions: true              // Enable or disable captions (Default: 'true')
});
</pre>

