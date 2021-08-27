function secondsToPrettyTime(seconds) {
  return new Date(seconds * 1000).toISOString().substr(11, 8).replace(/^00:/, "");
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

let detailsTop = document.getElementById("details-top");

let maxPercent;

if (timeTotal) {
  let progressBar = document.getElementById("inner-progress");

  maxPercent = 0.65;

  // In case time-now is bigger than time-total to avoid overflows.
  if (timeNow >= timeTotal) {
    progressBar.style.width = "inherit";
  }
  else {
    let percent = (timeNow * 100) / timeTotal;

    progressBar.style.width = "calc(" + percent * 0.54 + "vw - 12px)";
  }
}
else {
  let details = document.getElementById("details-bottom");

  maxPercent = 0.85;

  details.style.visibility = "hidden";

  // Reset details-top style to default, making it centered.
  detailsTop.style.position = "initial";
  detailsTop.style.top = "initial";
}

if (currentTheme === "light") {
  document.body.className = "light-mode";
}
else {
  document.body.className = "dark-mode";
}

let topStyle = document.defaultView.getComputedStyle(detailsTop);
let trackStyle = document.defaultView.getComputedStyle(trackDiv);
let artistStyle = document.defaultView.getComputedStyle(artistDiv);


window.onload = function() {
  while (parseInt(topStyle.height, 10) > (screen.width * 0.33) * maxPercent) {  // 65% or 85% of cover art size (33% of screen width)
    let trackNewVal = parseFloat(trackStyle.fontSize) * 0.995;
    trackDiv.style.fontSize = trackNewVal + "px";

    let artistNewVal = parseFloat(artistStyle.fontSize) * 0.99885;
    artistDiv.style.fontSize = artistNewVal + "px";
  }

  if (blurredBg) {
    Vibrant.from(cover).getPalette().then(function(palette) {
      let color;

      if (currentTheme === "light") {
        color = palette.LightVibrant.getRgb();
      }
      else {
        color = palette.DarkVibrant.getRgb();
      }

      document.documentElement.style
        .setProperty("--bg-filter", "rgb(" + color[0] + "," + color[1] + "," + color[2] + ", 0.6)");
    });
  }
};
