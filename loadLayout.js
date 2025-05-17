// loadLayout.js
async function loadHTML(id, file) {
  const res = await fetch(file);
  const html = await res.text();
  document.getElementById(id).innerHTML = html;
}

document.addEventListener("DOMContentLoaded", () => {
  loadHTML("header", "header.html").then(() =>
    loadHTML("footer", "footer.html")
  );
});
