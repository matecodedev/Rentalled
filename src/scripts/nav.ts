const focusableSelector = [
  "a[href]",
  "button:not([disabled])",
  "textarea:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "[tabindex]:not([tabindex='-1'])"
].join(",");

const getFocusableItems = (root: HTMLElement) =>
  Array.from(root.querySelectorAll<HTMLElement>(focusableSelector)).filter(
    (item) => !item.hasAttribute("disabled") && item.getAttribute("aria-hidden") !== "true"
  );

document.querySelectorAll<HTMLElement>("[data-nav-root]").forEach((root) => {
  const toggle = root.querySelector<HTMLButtonElement>("[data-menu-toggle]");
  const panel = root.querySelector<HTMLElement>("[data-menu-panel]");
  const label = root.querySelector<HTMLElement>("[data-menu-label]");

  if (!toggle || !panel || !label) return;

  root.dataset.navReady = "true";

  const setOpen = (open: boolean) => {
    const nextLabel = open ? toggle.dataset.closeLabel ?? "Close" : toggle.dataset.openLabel ?? "Menu";

    root.dataset.menuOpen = String(open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", nextLabel);
    label.textContent = nextLabel;

    if (open) {
      const firstPanelItem = panel.querySelector<HTMLElement>(focusableSelector);
      firstPanelItem?.focus();
    }
  };

  toggle.addEventListener("click", () => setOpen(root.dataset.menuOpen !== "true"));

  panel.querySelectorAll<HTMLAnchorElement>("a[href]").forEach((link) => {
    link.addEventListener("click", () => setOpen(false));
  });

  root.addEventListener("keydown", (event) => {
    if (root.dataset.menuOpen !== "true") return;

    if (event.key === "Escape") {
      event.preventDefault();
      setOpen(false);
      toggle.focus();
      return;
    }

    if (event.key !== "Tab") return;

    const focusableItems = getFocusableItems(root);
    const firstItem = focusableItems[0];
    const lastItem = focusableItems[focusableItems.length - 1];

    if (!firstItem || !lastItem) return;

    if (event.shiftKey && document.activeElement === firstItem) {
      event.preventDefault();
      lastItem.focus();
    } else if (!event.shiftKey && document.activeElement === lastItem) {
      event.preventDefault();
      firstItem.focus();
    }
  });
});
