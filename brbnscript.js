// === TOGGLE CUSTOM NAME FIELD ===
function toggleCustomName(selectElement) {
  const customWrapper = document.getElementById("customNameWrapper");
  if (selectElement.value === "custom") {
    customWrapper.style.display = "block";
  } else {
    customWrapper.style.display = "none";
  }
}

// === TOGGLE TASTING NOTES VISIBILITY ===
function toggleNotes(button) {
  const fieldset = button.closest("fieldset");
  const notesDiv = fieldset.querySelector(".tasting-notes-float");

  if (!notesDiv) return;

  const isVisible = notesDiv.style.display === "block";
  notesDiv.style.display = isVisible ? "none" : "block";
  button.textContent = isVisible ? "Show Notes" : "Hide Notes";
}

// === OPTIONAL: PARALLAX SCROLL EFFECT (currently disabled) ===
// If you'd like to re-enable it, just uncomment below:

// function isMobileDevice() {
//   return window.innerWidth < 768;
// }

// if (!isMobileDevice()) {
//   window.addEventListener("scroll", () => {
//     const speed = 0.35;
//     const scrolled = window.scrollY;
//     const image = document.getElementById("bottlePhoto");
//     if (image) {
//       image.style.transform = `translateY(${scrolled * speed}px)`;
//     }
//   });
// }

// === SUBMIT WARNING FOR DUPLICATE GLASS SELECTIONS ===
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("bourbonForm");

  form.addEventListener("submit", (event) => {
    const selected = {};
    const groups = ["michters", "heigold", "uncleNearest", "oldForester"];

    // Collect selected values
    groups.forEach((group) => {
      const checked = document.querySelector(`input[name='${group}']:checked`);
      if (checked) {
        selected[group] = checked.value;
      }
    });

    const values = Object.values(selected);
    const unique = new Set(values);

    // Show warning if any duplicate glass is selected
    if (unique.size < values.length) {
      const confirmProceed = confirm(
        "You’ve assigned the same glass to more than one bourbon.\nAre you sure you want to submit?"
      );
      if (!confirmProceed) {
        event.preventDefault(); // cancel submission
      }
    }
  });
});
