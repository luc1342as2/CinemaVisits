(function () {
  "use strict";

  if (typeof MOVIES === "undefined") {
    console.error("MOVIES data not loaded.");
    return;
  }

  function getQueryParam(name) {
    var params = new URLSearchParams(window.location.search);
    return params.get(name);
  }

  function formatDate(dateStr) {
    var d = new Date(dateStr + "T12:00:00");
    var options = { year: "numeric", month: "long", day: "numeric" };
    return d.toLocaleDateString("en-GB", options);
  }

  var idParam = getQueryParam("id");
  var id = idParam !== null ? parseInt(idParam, 10) : NaN;
  var movie = null;

  if (!Number.isNaN(id)) {
    movie = MOVIES.find(function (m) { return m.id === id; });
  }

  var titleEl = document.getElementById("movie-title");
  var dateEl = document.getElementById("movie-date");
  var genreEl = document.getElementById("movie-genre");
  var releaseEl = document.getElementById("movie-releaseYear");
  var directorEl = document.getElementById("movie-director");
  var runtimeEl = document.getElementById("movie-runtime");
  var actorsEl = document.getElementById("movie-actors");
  var descEl = document.getElementById("movie-description");
  var triviaEl = document.getElementById("movie-trivia");
  var trailerWrap = document.getElementById("trailer-wrap");
  var trailerSection = trailerWrap ? trailerWrap.closest(".movie-trailer-section") : null;
  var trailerIframe = document.getElementById("trailer-iframe");
  var trailerLink = document.getElementById("trailer-link");

  var prevEls = document.querySelectorAll(".movie-nav-prev");
  var nextEls = document.querySelectorAll(".movie-nav-next");

  function updatePrev(show, href) {
    prevEls.forEach(function (el) {
      el.href = href || "#";
      el.style.display = show ? "inline-flex" : "none";
    });
  }
  function updateNext(show, href) {
    nextEls.forEach(function (el) {
      el.href = href || "#";
      el.style.display = show ? "inline-flex" : "none";
    });
  }

  if (movie) {
    if (titleEl) titleEl.textContent = movie.title;
    if (dateEl) dateEl.textContent = "Cinema visit — " + formatDate(movie.date);
    if (genreEl) genreEl.textContent = movie.genre || "—";
    if (releaseEl) releaseEl.textContent = movie.releaseYear || "—";
    if (directorEl) directorEl.textContent = movie.director || "—";
    if (runtimeEl) runtimeEl.textContent = movie.runtime || "—";
    if (actorsEl) actorsEl.textContent = movie.actors || "—";
    if (descEl) descEl.textContent = movie.description;

    if (movie.id > 0) {
      updatePrev(true, "movie.html?id=" + (movie.id - 1));
    } else {
      updatePrev(false);
    }
    if (movie.id < MOVIES.length - 1) {
      updateNext(true, "movie.html?id=" + (movie.id + 1));
    } else {
      updateNext(false);
    }
    if (triviaEl) {
      triviaEl.textContent = movie.trivia || "";
      triviaEl.style.display = movie.trivia ? "block" : "none";
    }
    if (trailerSection && (movie.trailerUrl || movie.trailerId)) {
      trailerSection.style.display = "block";
      if (movie.trailerUrl) {
        if (trailerIframe) trailerIframe.style.display = "none";
        if (trailerLink) {
          trailerLink.href = movie.trailerUrl;
          trailerLink.style.display = "inline-flex";
        }
        if (trailerWrap) trailerWrap.classList.add("movie-trailer-wrap--link");
      } else {
        if (trailerLink) trailerLink.style.display = "none";
        if (trailerWrap) trailerWrap.classList.remove("movie-trailer-wrap--link");
        if (trailerIframe) {
          trailerIframe.style.display = "block";
          trailerIframe.src = "https://www.youtube-nocookie.com/embed/" + movie.trailerId + "?rel=0";
          trailerIframe.setAttribute("title", movie.title + " — Trailer");
        }
      }
    } else if (trailerSection) {
      trailerSection.style.display = "none";
    }
    document.title = movie.title + " — Cinema History";
  } else {
    updatePrev(false);
    updateNext(false);
    if (titleEl) titleEl.textContent = "Movie not found";
    if (dateEl) dateEl.textContent = "";
    if (genreEl) genreEl.textContent = "—";
    if (releaseEl) releaseEl.textContent = "—";
    if (directorEl) directorEl.textContent = "—";
    if (runtimeEl) runtimeEl.textContent = "—";
    if (actorsEl) actorsEl.textContent = "—";
    if (descEl) descEl.textContent = "This cinema visit could not be found. You can return to the timeline.";
    if (triviaEl) triviaEl.style.display = "none";
    if (trailerSection) trailerSection.style.display = "none";
    document.title = "Not found — Cinema History";
  }
})();
