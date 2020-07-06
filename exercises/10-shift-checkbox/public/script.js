const items = document.querySelectorAll(".item");
const checkboxes = document.querySelectorAll("input[type='checkbox']");

let shiftActive;

addEventListener("keydown", (e) => {
  if (e.key === "Shift") {
    shiftActive = true;
  }
});

addEventListener("keyup", (e) => {
  if (e.key === "Shift") {
    shiftActive = false;
  }
});

items.forEach((item, index) => {
  item.addEventListener("click", (e) => {
    handleRange(index);
  });
});

let activeIndex;

function handleRange(index) {
  if (!shiftActive || activeIndex === undefined) {
    activeIndex = index;
    return;
  }

  const lowerIndex = Math.min(activeIndex, index);
  const upperIndex = Math.max(activeIndex, index);

  for (let i = lowerIndex; i <= upperIndex; i++) {
    checkboxes[i].checked = true;
  }
}
