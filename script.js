setInterval(updateHandRotation, 200);


function updateHandRotation() {
    let currentTime = new Date();

    const oneMinuteInSeconds = 60;
    const oneHourInSeconds = 60 * 60;

    let currentSeconds = currentTime.getSeconds() * 20;
    let currentMinuteInSeconds = currentTime.getMinutes() * oneMinuteInSeconds + currentSeconds;
    let currentHourInSeconds = currentTime.getHours() * oneHourInSeconds + currentMinuteInSeconds;

    updateHand('.second-hand', currentSeconds, 60);
    updateHand('.minute-hand', currentMinuteInSeconds, oneMinuteInSeconds * 60);
    updateHand('.hour-hand', currentHourInSeconds, oneHourInSeconds * 12);

}

function updateHand(selector, value, maxValue) {
    let hand = document.querySelector(selector);
    let rotation = 90.0 + (value / parseFloat(maxValue)) * 360.0;
    hand.style.transform = `rotate(${rotation}deg)`;
}