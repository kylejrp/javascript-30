document.addEventListener('keypress', hitDrum);

function hitDrum(e) {
    let dataAttribute = `[data-key="${e.key.toLowerCase()}"]`
    let drumElements = document.querySelectorAll(`.key${dataAttribute}, .frame${dataAttribute}`);
    let audioElement = document.querySelector(`audio${dataAttribute}`)

    if (drumElements) {
        drumElements.forEach(drumElement => {
            // Toggle the visual styles
            drumElement.classList.add('playing');
            setTimeout(() => drumElement.classList.remove('playing'), 50)
        })
    }

    if (audioElement) {
        // Play the audio
        audioElement.currentTime = 0;
        audioElement.play();
    }
}