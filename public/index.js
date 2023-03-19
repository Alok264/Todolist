const clock = document.querySelector("#clock");

    // Update the clock every second
    setInterval(function() {
        // Get the current time
        const now = new Date();

        // Format the time to display as HH:MM:SS
        const hours = now.getHours().toString().padStart(2, "0");
        const minutes = now.getMinutes().toString().padStart(2, "0");
        const seconds = now.getSeconds().toString().padStart(2, "0");

        // Set the clock element's text to the formatted time
        clock.innerHTML = `${hours}:${minutes}:${seconds}`;
    }, 1000);