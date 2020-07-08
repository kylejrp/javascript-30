const player = document.querySelector(".player");
const video = player.querySelector("video");
const [playButton, skipBackButton, skipForwardButton] = player.querySelectorAll(
  "button.player__button"
);
const [volume, playbackRate] = player.querySelectorAll("input");
const progressBar = player.querySelector(".progress");
const progressBarFilled = player.querySelector(".progress__filled");

playButton.addEventListener("click", () => {
  if (playButton.innerText === "►") {
    playButton.innerText = "❚ ❚";
    video.play();
  } else {
    playButton.innerText = "►";
    video.pause();
  }
});

volume.addEventListener("input", () => {
  video.volume = volume.value;
});

playbackRate.addEventListener("input", () => {
  video.playbackRate = playbackRate.value;
});

skipBackButton.addEventListener("click", () => {
  video.currentTime -= 10.0;
});

skipForwardButton.addEventListener("click", () => {
  video.currentTime += 25.0;
});

video.addEventListener("timeupdate", () => {
  const progress = (video.currentTime / video.duration) * 100.0;

  progressBarFilled.style.setProperty("flex-basis", `${progress}%`);
});

let dragging = false;

const handleMouseMove = (e) => {
  const desiredTimePercentage = e.layerX / progressBar.clientWidth;
  video.currentTime = video.duration * desiredTimePercentage;
};

progressBar.addEventListener("mousedown", (e) => {
  dragging = true;
  handleMouseMove(e);
  progressBar.addEventListener("mousemove", handleMouseMove);
});

progressBar.addEventListener("mouseup", () => {
  dragging = false;
  progressBar.removeEventListener("mousemove", handleMouseMove);
});
