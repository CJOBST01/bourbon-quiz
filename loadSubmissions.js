import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  orderBy,
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyD5Dizm7ZH2JAKwCjzw6Xu8updGXY1aIQQ",
  authDomain: "bourbonquiz.firebaseapp.com",
  projectId: "bourbonquiz",
  storageBucket: "bourbonquiz.appspot.com",
  messagingSenderId: "931420990292",
  appId: "1:931420990292:web:fcd5770cc85381cc4e76c1",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// 12-hour cutoff in milliseconds
const twelveHoursAgo = Date.now() - 12 * 60 * 60 * 1000;

const q = query(collection(db, "quizResponses"), orderBy("timestamp", "desc"));
const snapshot = await getDocs(q);

const list = document.getElementById("responseList");

snapshot.forEach((doc) => {
  const data = doc.data();
  const timestamp = data.timestamp?.toMillis?.() || data.timestamp;

  if (timestamp && timestamp >= twelveHoursAgo) {
    const li = document.createElement("li");
    li.innerHTML = `
      <strong>${data.name || "Anonymous"}</strong><br>
      <em>Michter's:</em> ${data.michters}<br>
      <em>Heigold:</em> ${data.heigold}<br>
      <em>Uncle Nearest:</em> ${data.uncleNearest}<br>
      <em>Old Forester:</em> ${data.oldForester}
    `;
    list.appendChild(li);
  }
});
if (list.children.length === 0) {
  list.innerHTML = `<li>No submissions in the last 12 hours.</li>`;
}
