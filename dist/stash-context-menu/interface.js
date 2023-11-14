// src/interface.ts
var actionButtonNodes = () => {
  const actionBtnsContainer = document.querySelectorAll('[data-icon="play"]')[0].parentElement.parentElement;
  return {
    play: actionBtnsContainer.childNodes[0],
    edit: actionBtnsContainer.childNodes[1],
    delete: actionBtnsContainer.childNodes[2]
  };
};
var renderOption = (label, sibling, simulatedNode) => {
  const option = document.createElement("a");
  option.id = label + "-option";
  option.classList.add("bg-secondary", "text-white", "dropdown-item", "smacm-option");
  option.onclick = (e) => {
    e.preventDefault();
    simulatedNode.click();
  };
  option.setAttribute("role", "button");
  option.textContent = label;
  sibling.appendChild(option);
};
var openContextMenu = (e, coords = { x: e.clientX, y: e.clientY }) => {
  e.preventDefault();
  let mouseX = e.clientX;
  let mouseY = e.clientY;
  if (coords && coords.x && coords.y) {
    mouseX = coords.x;
    mouseY = coords.y;
  }
  const moreMenu = document.getElementById("more-menu");
  const parent = moreMenu.parentElement;
  const sibling = moreMenu.nextElementSibling;
  if (!parent.classList.contains("show")) {
    moreMenu.click();
  }
  parent.classList.add("context-menu-container");
  parent.style.position = "fixed";
  parent.style.left = mouseX + 5 + "px";
  parent.style.top = mouseY - 10 + "px";
  parent.style.display = "block";
  parent.style.zIndex = "1000";
  const checkedCheckboxes = document.querySelectorAll(".row.justify-content-center input:checked");
  sibling.childNodes.forEach((child) => {
    child.style.order = "2";
  });
  if (checkedCheckboxes.length > 0) {
    !document.getElementById("Play-option") && renderOption("Play", sibling, actionButtonNodes().play);
    !document.getElementById("Edit-option") && renderOption("Edit", sibling, actionButtonNodes().edit);
    !document.getElementById("Delete-option") && renderOption("Delete", sibling, actionButtonNodes().delete);
  } else {
    document.getElementById("Play-option")?.remove();
    document.getElementById("Edit-option")?.remove();
    document.getElementById("Delete-option")?.remove();
  }
};
document.addEventListener("contextmenu", openContextMenu);
document.addEventListener("mousemove", (event) => {
  const mouseX = event.clientX;
  const mouseY = event.clientY;
  window.lastMousePosition = { x: mouseX, y: mouseY };
});
document.addEventListener("keydown", (e) => {
  if (e.ctrlKey && e.key === "." || e.metaKey && e.key === ".") {
    openContextMenu(e, window.lastMousePosition);
  }
});
