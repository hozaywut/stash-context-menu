type Coords = {
  x: number;
  y: number;
};

type ActionButtonNodes = {
  play: HTMLElement;
  edit: HTMLElement;
  delete: HTMLElement;
};

const actionButtonNodes = (): ActionButtonNodes => {
  const actionBtnsContainer = document.getElementById(
    "action-buttons-container"
  );

  if (!actionBtnsContainer) {
    throw new Error("Action buttons container not found");
  }

  return {
    play: actionBtnsContainer.children[0] as HTMLElement,
    edit: actionBtnsContainer.children[1] as HTMLElement,
    delete: actionBtnsContainer.children[2] as HTMLElement,
  };
};

const renderOption = (
  label: string,
  sibling: HTMLElement,
  simulatedNode: HTMLElement
) => {
  const option = document.createElement("a");
  option.id = `${label.toLowerCase()}-option`;
  option.classList.add(
    "bg-secondary",
    "text-white",
    "dropdown-item",
    "smacm-option"
  );
  option.onclick = (e) => {
    e.preventDefault();
    simulatedNode.click();
  };
  option.setAttribute("role", "button");
  option.textContent = label;
  sibling.appendChild(option);
};

const openContextMenu = (
  e: MouseEvent,
  coords: Coords = { x: e.clientX, y: e.clientY }
) => {
  e.preventDefault();

  const mouseX = coords.x;
  const mouseY = coords.y;
  const moreMenu = document.getElementById("more-menu");

  if (!moreMenu) {
    throw new Error("More menu not found");
  }

  const parent = moreMenu.parentElement;

  if (parent && !parent.classList.contains("show")) {
    moreMenu.click();
  }

  if (parent) {
    parent.classList.add("context-menu-container");
    parent.style.position = "fixed";
    parent.style.left = mouseX + 5 + "px";
    parent.style.top = mouseY - 10 + "px";
    parent.style.display = "block";
    parent.style.zIndex = "1000";
  }

  const checkedCheckboxes = document.querySelectorAll(
    ".row.justify-content-center input:checked"
  );

  const sibling = moreMenu.nextElementSibling as HTMLElement;

  sibling.childNodes.forEach((child) => {
    if (child instanceof HTMLElement) {
      child.style.order = "2";
    }
  });

  if (checkedCheckboxes.length > 0) {
    !document.getElementById("play-option") &&
      renderOption("Play", sibling, actionButtonNodes().play);
    !document.getElementById("edit-option") &&
      renderOption("Edit", sibling, actionButtonNodes().edit);
    !document.getElementById("delete-option") &&
      renderOption("Delete", sibling, actionButtonNodes().delete);
  } else {
    document.getElementById("play-option")?.remove();
    document.getElementById("edit-option")?.remove();
    document.getElementById("delete-option")?.remove();
  }
};

const handleRightClick = (e: MouseEvent) => openContextMenu(e);

document.addEventListener("contextmenu", openContextMenu);

document.addEventListener("mousemove", (event) => {
  const mouseX = event.clientX;
  const mouseY = event.clientY;
  window.lastMousePosition = { x: mouseX, y: mouseY };
});

document.addEventListener("keydown", (e) => {
  if ((e.ctrlKey && e.key === ".") || (e.metaKey && e.key === ".")) {
    openContextMenu(e, window.lastMousePosition);
  }
});
