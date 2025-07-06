import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyD5Dizm7ZH2JAKwCjzw6Xu8updGXY1aIQQ",
  authDomain: "bourbonquiz.firebaseapp.com",
  projectId: "bourbonquiz",
  storageBucket: "bourbonquiz.appspot.com",
  messagingSenderId: "931420990292",
  appId: "1:931420990292:web:fcd5770cc85381cc4e76c1"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// === TOGGLE CUSTOM NAME FIELD ===
const nameDropdown = document.getElementById("selectedName");
const customWrapper = document.getElementById("customNameWrapper");

nameDropdown.addEventListener("change", () => {
  if (nameDropdown.value === "custom") {
    customWrapper.style.display = "block";
  } else {
    customWrapper.style.display = "none";
  }
});

// === TOGGLE TASTING NOTES VISIBILITY ===
document.querySelectorAll(".toggle-notes").forEach((button) => {
  button.addEventListener("click", () => {
    const fieldset = button.closest("fieldset");
    const notesDiv = fieldset.querySelector(".tasting-notes-float");

    notesDiv.classList.toggle("visible");
    const isVisible = notesDiv.classList.contains("visible");
    button.textContent = isVisible ? "Hide Notes" : "Show Notes";
  });
});


// === SUBMIT HANDLING WITH DUPLICATE CHECK AND FIREBASE ===
const form = document.getElementById("bourbonForm");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  // Check for duplicate glass selections
  const selected = {};
  const groups = ["michters", "heigold", "uncleNearest", "oldForester"];
  groups.forEach((group) => {
    const checked = document.querySelector(`input[name='${group}']:checked`);
    if (checked) {
      selected[group] = checked.value;
    }
  });

  const values = Object.values(selected);
  const unique = new Set(values);
  if (unique.size < values.length) {
    const confirmProceed = confirm(
      "You’ve assigned the same glass to more than one bourbon.\nAre you sure you want to submit?"
    );
    if (!confirmProceed) return;
  }

  // Collect form data
  const formData = new FormData(form);
  const name = formData.get("selectedName") === "custom"
    ? formData.get("customName")
    : formData.get("selectedName");
  const michters = formData.get("michters");
  const heigold = formData.get("heigold");
  const uncleNearest = formData.get("uncleNearest");
  const oldForester = formData.get("oldForester");

  try {
    console.log("Submitting to Firestore...");
  await addDoc(collection(db, "quizResponses"), {
      name,
      michters,
      heigold,
      uncleNearest,
      oldForester,
      timestamp: serverTimestamp()
    });

    console.log("✅ Submission succeeded, showing confirmation.");
  form.style.display = "none";
    document.getElementById("confirmationContainer").style.display = "block";
  } catch (error) {
    alert("Something went wrong. Try again later.");
    console.error("Firebase submission error:", error);
  }
});
