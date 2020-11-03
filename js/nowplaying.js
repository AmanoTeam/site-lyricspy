function secondsToPrettyTime(seconds) {
  return new Date(seconds * 1000).toISOString().substr(11, 8).replace(/^00:/, "");
}

let loc = window.location.href;
let params = new URL(loc).searchParams;

let cover = params.get("cover");
let track = params.get("track");
let artist = params.get("artist");
let current_theme = params.get("theme");
let time_now = parseInt(params.get("timenow"));
let time_total = parseInt(params.get("timetotal"));

let cover_div = document.getElementById("coverart");
cover_div.src = cover;

let coverbg_div = document.getElementById("bg-image");
coverbg_div.style.backgroundImage = "url('" + cover + "')"

let track_div = document.getElementById("trackname");
track_div.innerText = track;

let artist_div = document.getElementById("artistname");
artist_div.innerText = artist;

let time_now_td = document.getElementById("time-now");
time_now_td.innerText = secondsToPrettyTime(time_now);

let time_total_td = document.getElementById("time-total");
time_total_td.innerText = secondsToPrettyTime(time_total);

if (time_now && time_total) {
  let progress_bar = document.getElementById("inner-progress");

  // In case time-now is bigger than time-total to avoid overflows.
  if (time_now > time_total) {
    progress_bar.style.width = "54vw";
  }
  else {
    let percent = (time_now * 100) / time_total;

    progress_bar.style.width = percent * 0.54 + "vw";
  }
}

if (current_theme === "light") {
  document.body.className = "light-mode";
}
else {
  document.body.className = "dark-mode"
}