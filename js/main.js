$(document).ready(function (e) {
    $('#slider').dechadouSlider({
        container: '.slider',       // Set the main class of the slides container
        jsonFile: 'images.json',    // Set the location of the json file
        navClass: '.controls',      // Set the main class of the controls container
        timerBarClass: 'timer-bar', // Set the main class of the timer-bar if enabled
        enableTimerBar: true,       // enable timebar, only visible if autoplay = true
        autoplay : true,            // AutoPlay
        stopOnHover: true,          // AutoPlay stop on hover
        delay: 5000,                // Delay for AutoPlay in miliseconds
        time: 500,                  // Speed of the transition
        esponsive: true,            // If True, it will use the Tablet Image when the screen is below 1024px
        captions: true              // Enable or disable captions
    });
});
