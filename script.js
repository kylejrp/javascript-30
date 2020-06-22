document.addEventListener('keypress', hitDrum);

function hitDrum(e) {
    let dataAttribute = `[data-key="${e.key.toLowerCase()}"]`
    let drumElement = document.querySelector(`.key${dataAttribute}`);
    let audioElement = document.querySelector(`audio${dataAttribute}`)

    if (drumElement) {
        // Toggle the visual styles
        drumElement.classList.add('playing');
        setTimeout(() => drumElement.classList.remove('playing'), 50)
    }

    if (audioElement) {
        // Play the audio
        audioElement.currentTime = 0;
        audioElement.play();
    }
}