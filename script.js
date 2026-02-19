(function () {
  "use strict";

  if (typeof MOVIES === "undefined") {
    console.error("MOVIES data not loaded.");
    return;
  }

  function formatDate(dateStr) {
    var d = new Date(dateStr + "T12:00:00");
    var options = { year: "numeric", month: "short", day: "numeric" };
    return d.toLocaleDateString("en-GB", options);
  }

  var container = document.getElementById("timeline-dots");
  if (!container) return;

  MOVIES.forEach(function (movie) {
    var item = document.createElement("div");
    item.className = "timeline-item";
    item.setAttribute("data-movie-id", movie.id);

    var dotWrap = document.createElement("div");
    dotWrap.className = "timeline-dot-wrap";

    var dot = document.createElement("span");
    dot.className = "timeline-dot";
    dot.setAttribute("role", "button");
    dot.setAttribute("tabindex", "0");
    dot.setAttribute("aria-label", "Movie: " + movie.title + ", " + formatDate(movie.date));

    var tooltip = document.createElement("span");
    tooltip.className = "timeline-tooltip";
    tooltip.textContent = movie.title;

    var content = document.createElement("div");
    content.className = "timeline-item-content";

    var headerRow = document.createElement("div");
    headerRow.className = "timeline-header-row";

    if (movie.trailerId) {
      var thumb = document.createElement("img");
      thumb.className = "timeline-thumb";
      thumb.src = "https://img.youtube.com/vi/" + movie.trailerId + "/mqdefault.jpg";
      thumb.alt = movie.title + " — trailer thumbnail";
      thumb.setAttribute("loading", "lazy");
      headerRow.appendChild(thumb);
    }

    var timeEl = document.createElement("time");
    timeEl.className = "timeline-date";
    timeEl.setAttribute("datetime", movie.date);
    timeEl.textContent = formatDate(movie.date);
    headerRow.appendChild(timeEl);

    var actions = document.createElement("div");
    actions.className = "timeline-actions";

    var link = document.createElement("a");
    link.href = "movie.html?id=" + encodeURIComponent(movie.id);
    link.className = "timeline-btn";
    link.textContent = "View details";

    actions.appendChild(link);
    content.appendChild(headerRow);
    content.appendChild(actions);
    dotWrap.appendChild(dot);
    dotWrap.appendChild(tooltip);
    item.appendChild(dotWrap);
    item.appendChild(content);
    container.appendChild(item);

    dot.addEventListener("click", function (e) {
      if (e.target === dot || dot.contains(e.target)) {
        window.location.href = link.href;
      }
    });
    dot.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        link.click();
      }
    });
  });
})();
