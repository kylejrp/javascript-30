document.addEventListener('keypress', hitDrumOnKeyPress);

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.frame').forEach(frame => {
        frame.addEventListener('click', hitDrumOnClick)
    })
})


function hitDrumOnKeyPress(e) {
    hitDrum(e.key.toLowerCase());
}

function hitDrumOnClick(e) {
    hitDrum(e.currentTarget.dataset.key.toLowerCase());
}

function hitDrum(key) {
    let dataAttribute = `[data-key="${key}"]`;
    let drumElements = document.querySelectorAll(`.frame${dataAttribute}`);
    let audioElement = document.querySelector(`audio${dataAttribute}`);
    if (drumElements) {
        drumElements.forEach(drumElement => {
            // Toggle the visual styles
            drumElement.classList.add('playing');
            setTimeout(() => drumElement.classList.remove('playing'), 50);
        });
    }
    if (audioElement) {
        // Play the audio
        audioElement.currentTime = 0;
        audioElement.play();
    }
}
