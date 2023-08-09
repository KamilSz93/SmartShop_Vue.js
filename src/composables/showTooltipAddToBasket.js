import { useCartStore } from "../stores/cart";

export const addItem = function (e, id) {
  const addBtn = e.target;

  console.log(e.layerX);
  const span = document.createElement("span");

  span.innerText = "Dodano do koszyka";

  span.style.cssText = `
    padding: .5rem;
    width: 16rem;
    height: 3rem;
    border-radius: .5rem;
    boxShadow: 0px 0px 9px -2px rgba(66, 68, 90, 1);
    background-color: #d1d5db;
    top: ${e.layerY}px;
    left: ${e.layerX}px;
    font-size: 1.5rem ;
    position: absolute;
    z-index :20;
  `;

  addBtn.before(span);
  const store = useCartStore();
  store.addCartItemStore(id);

  setTimeout(() => {
    span.remove();
  }, 500);
};
