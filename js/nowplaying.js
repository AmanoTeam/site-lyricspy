function secondsToPrettyTime(seconds) {
  return new Date(seconds * 1000).toISOString().substring(11, 19).replace(/^00:/, "");
}

function mixColors(color1, color2, ratio) {
  var r1 = parseInt(color1.substring(1, 3), 16);
  var g1 = parseInt(color1.substring(3, 5), 16);
  var b1 = parseInt(color1.substring(5, 7), 16);
  var r2 = parseInt(color2.substring(1, 3), 16);
  var g2 = parseInt(color2.substring(3, 5), 16);
  var b2 = parseInt(color2.substring(5, 7), 16);
  var r = Math.round((r2 - r1) * ratio + r1);
  var g = Math.round((g2 - g1) * ratio + g1);
  var b = Math.round((b2 - b1) * ratio + b1);
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
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
else {
  let coverDivBg = document.getElementById("bg-image");
  coverDivBg.style.filter = "blur(0px)";
}

let trackDiv = document.getElementById("trackname");
trackDiv.innerText = track;

let artistDiv = document.getElementById("artistname");
artistDiv.innerText = artist;

let timeNowTd = document.getElementById("time-now");
timeNowTd.innerText = secondsToPrettyTime(timeNow);

let timeTotalTd = document.getElementById("time-total");
timeTotalTd.innerText = secondsToPrettyTime(timeTotal);

let detailsTop = document.getElementById("details-top");
let detailsBottom = document.getElementById("details-bottom");

let maxPercent;

if (timeTotal) {
  let progressBar = document.getElementById("inner-progress");

  maxPercent = 0.6;

  let percent = (timeNow * 100) / timeTotal;

  progressBar.style.width = percent * 0.54 + "vw";
}
else {
  maxPercent = 0.8;

  document.getElementById("progress-total").style.display = "none";
  document.getElementById("timing-div").style.display = "none";

  // Reset details-top and details-bottom style to default, making it centered.
  detailsTop.style.position = "initial";
  detailsTop.style.top = "initial";

  detailsBottom.style.position = "initial";
  detailsBottom.style.bottom = "initial";
}

if (currentTheme === "light") {
  document.body.className = "light-mode";
}
else {
  document.body.className = "dark-mode";
}


let topStyle = document.defaultView.getComputedStyle(detailsTop);
let artistStyle = document.defaultView.getComputedStyle(artistDiv);

let trackNameFont = 15;  // 15vw
let artistNameFont = 6;  // 6vw

// Reducing font size until stuff gets in place.
// artist font size is always reduced less than track name font size.
window.addEventListener("load", () => {
  while (parseInt(topStyle.height, 10) + parseInt(artistStyle.height, 10) > (window.outerWidth * 0.33) * maxPercent) {  // 60% or 80% of cover art size (33% of screen width)
    trackNameFont *= 0.995;
    artistNameFont *= 0.9985;

    trackDiv.style.fontSize = trackNameFont + "vw";
    artistDiv.style.fontSize = artistNameFont + "vw";
  }
});

Vibrant.from(cover).getPalette().then((palette) => {
  let baseColorPrimary;
  let baseColorSecondary;
  let color;

  if (currentTheme === "light") {
    baseColorPrimary = "#000000";
    baseColorSecondary = "#ffffff";
    color = palette.LightVibrant.getHex();
  }
  else {
    baseColorPrimary = "#ffffff";
    baseColorSecondary = "#000000";
    color = palette.DarkVibrant.getHex();
  }

  document.documentElement.style
    .setProperty("--bg-filter", color + "80");
  document.documentElement.style
    .setProperty("--color-primary", mixColors(baseColorPrimary, color, 0.2));
  document.documentElement.style
    .setProperty("--color-progress", mixColors(baseColorPrimary, color, 0.2) + "4d");
  document.documentElement.style
    .setProperty("--color-secondary", mixColors(baseColorSecondary, color, 0.2));
});
