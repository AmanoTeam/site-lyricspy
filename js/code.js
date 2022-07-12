let loc = window.location.href;
let url = new URL(loc);
let code = url.searchParams.get("code");

let codePre = document.getElementById("code");

if (code === null) {
  window.location.href = "..";
} else {
  codePre.innerText = "/spoti " + code;
}

document.getElementById("copy-btn").addEventListener("click", () => {
  navigator.clipboard.writeText(codePre.innerText);

  let copied = document.getElementById("copied");
  copied.innerText = "Copied to clipboard!";
  setTimeout(() => { copied.innerText = ""; }, 2000);
});
