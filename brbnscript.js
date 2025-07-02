function toggleCustomName(selectElement) {
  const customWrapper = document.getElementById("customNameWrapper");
  if (selectElement.value === "custom") {
    customWrapper.style.display = "block";
  } else {
    customWrapper.style.display = "none";
  }
}
window.addEventListener("scroll", () => {
  const speed = 0.5; // Lower = faster scroll relative to page
  const scrolled = window.scrollY;
  const image = document.getElementById("bottlePhoto");
  if (image) {
    image.style.transform = `translateY(${scrolled * speed}px)`;
  }
});
function isMobileDevice() {
  return window.innerWidth < 768; // Treat anything under 768px as mobile
}

if (!isMobileDevice()) {
  window.addEventListener("scroll", () => {
    const speed = 0.35;
    const scrolled = window.scrollY;
    const image = document.getElementById("bottlePhoto");
    if (image) {
      image.style.transform = `translateY(${scrolled * speed}px)`;
    }
  });
}
function toggleNotes(button) {
  const fieldset = button.closest("fieldset");
  const notesDiv = fieldset.querySelector(".tasting-notes-float");

  if (!notesDiv) return;

  const isVisible = notesDiv.style.display === "block";
  notesDiv.style.display = isVisible ? "none" : "block";
  button.textContent = isVisible ? "Show Notes" : "Hide Notes";
}
