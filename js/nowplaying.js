function secondsToPrettyTime(seconds) {
  return new Date(seconds * 1000).toISOString().substr(11, 8).replace(/^00:/, "");
}

function getLinesCount(div, cs) {
  return Math.floor(div.offsetHeight / Math.floor(parseFloat(cs.marginBottom, 10) + parseFloat(cs.fontSize, 10)));
}

let loc = window.location.href;
let params = new URL(loc).searchParams;

let cover = params.get("cover");
let track = params.get("track");
let artist = params.get("artist");
let currentTheme = params.get("theme");
let blurredBg = parseInt(params.get("blurbg"), 10) || 0;
let timeNow = parseInt(params.get("timenow"), 10) || 0;
let timeTotal = parseInt(params.get("timetotal"), 10) || 0;

let coverDiv = document.getElementById("coverart");
coverDiv.src = cover;

if (blurredBg) {
  let coverDivBg = document.getElementById("bg-image");
  coverDivBg.style.backgroundImage = "url('" + cover + "')";
}

let trackDiv = document.getElementById("trackname");
trackDiv.innerText = track;

let artistDiv = document.getElementById("artistname");
artistDiv.innerText = artist;

let timeNowTd = document.getElementById("time-now");
timeNowTd.innerText = secondsToPrettyTime(timeNow);

let timeTotalTd = document.getElementById("time-total");
timeTotalTd.innerText = secondsToPrettyTime(timeTotal);

if (timeTotal) {
  let progressBar = document.getElementById("inner-progress");

  // In case time-now is bigger than time-total to avoid overflows.
  if (timeNow > timeTotal) {
    progressBar.style.width = "54vw";
  }
  else {
    let percent = (timeNow * 100) / timeTotal;

    progressBar.style.width = percent * 0.54 + "vw";
  }
}
else {
  let details = document.getElementById("details-bottom");

  details.style.visibility = "hidden";
}

if (currentTheme === "light") {
  document.body.className = "light-mode";
}
else {
  document.body.className = "dark-mode";
}

let computedStyle = document.defaultView.getComputedStyle(trackDiv);
let computedStyle2 = document.defaultView.getComputedStyle(artistDiv);


window.onload = function() {
  while (getLinesCount(trackDiv, computedStyle) >= 2) {
    let trackNewVal = parseFloat(computedStyle.fontSize) * 0.99;
    trackDiv.style.fontSize = trackNewVal + "px";

    let artistNewVal = parseFloat(computedStyle2.fontSize) * 0.9975;
    artistDiv.style.fontSize = artistNewVal + "px";
  }
};
