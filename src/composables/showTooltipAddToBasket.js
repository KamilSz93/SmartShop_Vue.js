export const onAddItemTooltip = function (e) {
  const addBtn = e.target;

  const span = document.createElement("span");

  span.innerText = "Dodano do koszyka";
  span.style.padding = ".5rem";
  span.style.width = "16rem";
  span.style.height = "3rem";
  span.style.borderRadius = ".5rem";
  span.style.boxShadow = "0px 0px 9px -2px rgba(66, 68, 90, 1)";
  span.style.backgroundColor = "#d1d5db";
  span.style.top = `${e.layerY}px`;
  span.style.left = `${e.layerX}px`;
  span.style.fontSize = "1.5rem";
  span.style.position = "absolute";
  span.style.zIndex = "20";

  addBtn.before(span);

  setTimeout(() => {
    span.remove();
  }, 500);
};