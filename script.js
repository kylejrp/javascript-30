setInterval(updateHandRotation, 200);


function updateHandRotation() {
    let currentTime = new Date();

    updateHand('.second-hand', currentTime.getSeconds(), 60);
    updateHand('.minute-hand', currentTime.getMinutes(), 60);
    updateHand('.hour-hand', currentTime.getHours(), 60);

}

function updateHand(selector, value, maxValue) {
    let hand = document.querySelector(selector);
    let rotation = 90.0 + (value / parseFloat(maxValue)) * 360.0;
    hand.style.transform = `rotate(${rotation}deg)`;
}