var loc = window.location.href;
var url = new URL(loc);
var code = url.searchParams.get("code");

var obj = document.getElementById("code");
var objcopy = document.getElementById("codecopy");

if (code === null) {
  window.location.href = "..";
} else {
  obj.innerText = "/spoti " + code;
  objcopy.value = "/spoti " + code;
}

function copyToClipboard() {
  objcopy.select();
  objcopy.setSelectionRange(0, 9999);

  document.execCommand("copy");
  var copied = document.getElementById("copied");
  copied.innerText = "Copied to clipboard!";
  setTimeout(function(){ copied.innerText = ""; }, 2000);
  document.getSelection().removeAllRanges();
}
