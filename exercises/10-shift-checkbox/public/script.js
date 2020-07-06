const items = document.querySelectorAll("input[type=checkbox]");

let shiftActive = false;

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

items.forEach((item, index) =>
  item.addEventListener("change", () => handleItemClick(item, index))
);

let activeIndex;

function handleItemClick(item, index) {
  console.log(item, index);

  if (!shiftActive) {
    if (activeIndex === undefined) {
      activeIndex = index;
    }
    return;
  }

  const lowerIndex = Math.min(activeIndex, index);
  const upperIndex = Math.max(activeIndex, index);

  for (let i = lowerIndex; i < upperIndex; i++) {
    items[i].checked = true;
  }
}
