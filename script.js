const baseRotation = 90.0;

setInterval(updateHands, 100);
updateHands();

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

    if (hand.dataset.locked === 'true') {
        return;
    }

    let rotation = (baseRotation + (value / parseFloat(maxValue)) * 360.0);
    const previousValue = hand.dataset.value;

    if (previousValue > value) {
        // To prevent animating counter clockwise, 
        // we instead find an equivalent angle that would animate clockwise
        rotation += 360;

        // After it finishes animating clockwise, we lock the hand
        // until we're able to clean up the rollover.
        hand.dataset.locked = 'true';
        hand.addEventListener('transitionend', () => {
            hand.style.transition = 'none';
            hand.style.transform = `rotate(${rotation - 360}deg)`;
            hand.dataset.locked = false;
            // Here would be a good place to set `hand.style.transition = null`,
            // but doing so triggers an transition animation to play. The transition
            // will be reset to null during the next update
        }, { once: true });
    }

    // This resets the transition value that is set during a rollover
    hand.style.transition = null;

    hand.dataset.value = value;
    hand.style.transform = `rotate(${rotation}deg)`;
}