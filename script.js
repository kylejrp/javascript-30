setInterval(updateHands, 200);

const baseRotation = 90.0;

function updateHands() {
    const currentTime = new Date();

    const oneMinuteInSeconds = 60;
    const maxMinutesInSeconds = oneMinuteInSeconds * 60;
    const oneHourInSeconds = oneMinuteInSeconds * 60;
    const maxHoursInSeconds = oneHourInSeconds * 12;

    const currentSeconds = currentTime.getSeconds();
    const currentMinuteInSeconds = currentTime.getMinutes() * oneMinuteInSeconds + currentSeconds;
    const currentHourInSeconds = currentTime.getHours() * oneHourInSeconds + currentMinuteInSeconds;

    updateHand('.second-hand', currentSeconds, 60);
    updateHand('.minute-hand', currentMinuteInSeconds, maxMinutesInSeconds);
    updateHand('.hour-hand', currentHourInSeconds, maxHoursInSeconds);
}

function updateHand(selector, value, maxValue) {
    const hand = document.querySelector(selector);
    let rotation = (baseRotation + (value / parseFloat(maxValue)) * 360.0);
    hand.style.transform = `rotate(${rotation}deg)`;
}