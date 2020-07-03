const baseRotation = 90.0;

updateHands();
document.querySelectorAll('.clock.loading')
    .forEach((clock) => clock.classList.remove('loading'))
setInterval(updateHands, 100);

function updateHands() {
    const currentTime = new Date();

    const oneMinuteInSeconds = 60;
    const maxMinutesInSeconds = oneMinuteInSeconds * 60;
    const oneHourInSeconds = oneMinuteInSeconds * 60;
    const maxHoursInSeconds = oneHourInSeconds * 12;

    const currentSeconds = currentTime.getSeconds();
    const currentMinuteInSeconds = currentTime.getMinutes() * oneMinuteInSeconds + currentSeconds;
    const currentHourInSeconds = currentTime.getHours() * oneHourInSeconds + currentMinuteInSeconds;

    const secondHands = document.querySelectorAll('.second-hand');
    const minuteHands = document.querySelectorAll('.minute-hand');
    const hourHands = document.querySelectorAll('.hour-hand');

    secondHands.forEach((secondHand) => updateHand(secondHand, currentSeconds, 60));
    minuteHands.forEach((minuteHand) => updateHand(minuteHand, currentMinuteInSeconds, maxMinutesInSeconds));
    hourHands.forEach((hourHand) => updateHand(hourHand, currentHourInSeconds, maxHoursInSeconds));
}

function updateHand(hand, value, maxValue) {
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
            hand.style.setProperty('--rotation', `${rotation - 360}deg`);
            hand.dataset.locked = false;
            // Here would be a good place to set `hand.style.transition = null`,
            // but doing so triggers an transition animation to play. The transition
            // will be reset to null during the next update
        }, { once: true });
    }

    // This resets the transition value that is set during a rollover
    hand.style.transition = null;

    hand.dataset.value = value;
    hand.style.setProperty('--rotation', `${rotation}deg`);
}